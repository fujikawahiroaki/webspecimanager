import textwrap
import os
from pathlib import Path
from my_utils.japanese_textwrap import fw_wrap
from collections import deque
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import portrait
from reportlab.platypus import Table, TableStyle, PageBreak
from reportlab.lib.units import mm
from reportlab.lib import colors
from box import Box


class LabelCanvas:
    """
    ラベル印刷用PDFを生成
    """

    def __init__(self, label_dict_list, filename):
        # 出力ファイル名
        self.pdf_name = filename
        # ハガキサイズに設定
        self.page_width = 100*mm
        self.page_height = 148*mm
        self.page_size = portrait((self.page_width, self.page_height))
        # 上下左右の余白
        self.margin_width = 10*mm
        self.margin_height = 11*mm
        # ラベルのサイズ
        self.label_width = 16*mm
        self.label_height = 10.5*mm
        # 1ページあたりのラベル列数
        self.page_col = 5
        # 1ページあたりのラベル行数
        self.page_row = 12
        # キャンバス生成
        self.pdf_canvas = canvas.Canvas(self.pdf_name, pagesize=self.page_size)
        # 1行の字数(半角)
        self.one_line_limit = 29
        # フォント設定
        self.base_dir = Path(__file__).parent
        self.font_file = os.path.join(self.base_dir, 'fonts/migmix-1m-regular.ttf')
        self.font_size = 3.0
        pdfmetrics.registerFont(TTFont('migmix', self.font_file))
        self.pdf_canvas.setFont('migmix', self.font_size)
        # ラベルデータのキュー
        self.label_que = deque(label_dict_list)

    def _make_table(self, label_data):
        """
        テーブルを作成
        """
        table = Table(label_data, self.label_width, self.label_height)
        table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'migmix', self.font_size),
            ('BOX', (0, 0), (-1, -1), 0.1, colors.black),
            ('INNERGRID', (0, 0), (-1, -1), 0.1, colors.black),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0.0*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 0.3*mm),
            ('TOPPADDING', (0, 0), (-1, -1), 0.0*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0.3*mm)
        ]))
        table.wrapOn(self.pdf_canvas, self.margin_width, self.margin_height)
        table.drawOn(self.pdf_canvas, self.margin_width, self.margin_height)
        self.pdf_canvas.showPage()

    def _gen_data_label(self, label_dict):
        """
        データラベル用文字列を生成
        """
        label_data = Box(label_dict)
        # 国号+島名
        country_and_island = label_data.country + ': ' + label_data.island
        # 地名
        place_name_list = [label_data.state_provice, label_data.county,
                           label_data.municipality]
        # null要素を排除
        place_name_list = [s for s in place_name_list if s != '']
        place_name = textwrap.fill(', '.join(place_name_list),
                                   self.one_line_limit)
        # 地名スペース行分使い切るまで改行
        while place_name.count('\n') < 3:
            place_name += '\n'
        # GPS座標 dddd形式
        latitude = str(label_data.latitude) + 'N '  # 緯度
        longitude = str(label_data.longitude) + 'E '  # 経度
        coordinate = latitude + ' ' + longitude
        # 標高
        elv = str(label_data.maximum_elevation) + 'm'
        coordinate_and_elv = coordinate + elv
        # 日付と採集者
        year = str(label_data.year)
        month = str(label_data.month)
        day = str(label_data.day)
        if year == 0:
            year = 'Y:?'
        if month == 0:
            month = 'M:?'
        if day == 0:
            day = 'D:?'
        # 採集月が明確な場合ローマ数字に変換
        roman_num_dict = {'1': 'I', '2': 'II', '3': 'III',
                          '4': 'IV', '5': 'V', '6': 'VI',
                          '7': 'VII', '8': 'VIII', '9': 'IX',
                          '10': 'X', '11': 'XI', '12': 'XII'}
        if month.isdecimal():
            month = roman_num_dict[month]
        collecter = label_data.collecter
        if collecter == '':
            collecter = 'leg: Unknown'
        date_and_collecter = ' '.join([day, month, year]) + ', ' + collecter
        # 日本語地名
        japanese_place_name = label_data.japanese_place_name
        # 各項目を連結
        return '\n'.join([country_and_island, place_name,
                          coordinate_and_elv, date_and_collecter,
                          japanese_place_name])

    def _gen_coll_label(self, label_dict):
        """
        コレクションラベル用文字列を生成
        """
        label_data = Box(label_dict)
        collection_name = textwrap.fill(label_data.collection_name,
                                        self.one_line_limit)
        while collection_name.count('\n') < 7:
            collection_name += '\n'
        return collection_name + label_data.institution_code +\
            ': ' + str(label_data.collection_code).rjust(6, '0')

    def _gen_det_label(self, label_dict):
        """
        同定ラベル用文字列生成
        """
        label_data = Box(label_dict)
        # 性別表記を略記から読みやすい形式に変換
        sex = ''
        if label_data.sex == 'U':
            sex = 'Sex: Unidentified'
        elif label_data.sex == 'M':
            sex = '♂'
        elif label_data.sex == 'F':
            sex = '♀'
        elif label_data.sex == 'H':
            sex = 'Hermaphrodite'
        elif label_data.sex == 'T':
            sex = 'Transition'
        elif label_data.sex == 'I':
            sex = 'Indeterminate'
        # 記載者と記載年
        author_and_descyear = label_data.scientific_name_author +\
            ', ' + str(label_data.name_publishedin_year)
        if label_data.scientific_name_author == '':
            author_and_descyear = ''
        # 和名は長い場合2行にまたがれるようにする
        japanese_name = textwrap.fill(label_data.japanese_name, 14)
        while japanese_name.count('\n') < 1:
            japanese_name += '\n'
        # 同定者と同定年
        det_by = label_data.identified_by + 'det., ' +\
            str(label_data.date_identified)
        return '\n'.join([label_data.genus, label_data.species,
                          label_data.subspecies, author_and_descyear,
                          sex, label_data.japanese_name, det_by])

    def _gen_note_label(self, label_dict):
        """
        備考ラベル用文字列生成
        """
        label_data = Box(label_dict)
        return textwrap.fill(label_data.sampling_protocol, 29)

    def write_label(self, data=True, coll=True, det=True, note=True):
        """
        ラベルの書き込み 必要なタイプのラベルをオプションで指定
        """
        label_types = []
        if data is True:
            label_types.append("data")
        if coll is True:
            label_types.append("coll")
        if det is True:
            label_types.append("det")
        if note is True:
            label_types.append("note")
        labeller_funcs = {"data": self._gen_data_label,
                          "coll": self._gen_coll_label,
                          "det": self._gen_det_label,
                          "note": self._gen_note_label}
        while len(self.label_que) >= 1:
            # 空ラベル入り行×列数の二次元リストを1ページ分作る
            label_list = [["" for c in range(self.page_col)]
                          for r in range(self.page_row)]
            # 有効なラベルタイプ分の行数×ページ全体の列数分リストを埋める
            # 1行に1ラベルタイプ、1列に1ラベルデータずつ描画
            row_counter = 0
            while row_counter <= 11:
                for col in range(self.page_col):
                    if len(self.label_que) == 0:
                        break
                    popdata = self.label_que.popleft()
                    for label_type in label_types:
                        row = row_counter + label_types.index(label_type)
                        label_list[row][col] = labeller_funcs[label_type](popdata)
                row_counter += len(label_types)
                # 1ページ分データ作り次第テーブルに書き込んで改ページ
            self._make_table(label_list)
        self.pdf_canvas.save()
