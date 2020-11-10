import textwrap
from collections import deque
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import landscape, portrait
from reportlab.platypus import Table, TableStyle, PageBreak
from reportlab.lib.units import mm
from reportlab.lib import colors
from box import Box


class LavelCanvas:
    """
    ラベル印刷用PDFを生成
    """

    def __init__(self, label_dict_list, filename):
        # 出力ファイル名
        self.pdf_name = filename
        # ハガキサイズに設定
        self.page_width = 100*mm
        self.page_height = 148*mm
        self.page_size = landscape((self.page_width, self.page_height))
        # 上下左右の余白
        self.margin_width = 10*mm
        self.margin_height = 11*mm
        # ラベルのサイズ
        self.label_width = 16*mm
        self.label_height = 10.5*mm
        # キャンバス生成
        self.pdf_canvas = canvas.Canvas(self.pdf_name, pagesize=self.page_size)
        # 1行の字数(半角)
        self.one_line_limit = 29
        # フォント設定
        self.font_file = './fonts/migmix-1m-regular.ttf'
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
        # 地名スペース行分使い切るために2度改行
        while place_name.count('\n') < 3:
            place_name += '\n'
        # GPS座標 dddd形式
        latitude = str(label_data.latitude) + 'N '  # 緯度
        longitude = str(label_data.longitude) + 'E '  # 経度
        coordinate = latitude + ' ' + longitude
        if label_data.latitude == '':
            coordinate = 'GPS: NO DATA '
        # 標高
        elv = str(label_data) + 'm'
        if label_data.elv == '':
            elv = ''
        coordinate_and_elv = coordinate + elv
        # 日付と採集者
        year = str(label_data.year)
        month = str(label_data.month)
        day = str(label_data.day)
        if year == '':
            year = 'Y:?'
        if month == '':
            month = 'M:?'
        if day == '':
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

    def _gen_col_label(self, label_dict):
        """
        コレクションラベル用文字列を生成
        """
        