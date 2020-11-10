#!/usr/bin/env python3
# coding: utf-8

import traceback
import textwrap
import json
from collections import deque
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
#from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import landscape, portrait
from reportlab.platypus import Table, TableStyle, PageBreak
from reportlab.lib.units import mm
from reportlab.lib import colors
from box import Box
from test_data import test_data


class LabelCanvas:
    """キャンバス全体の設定
    Attributes:
        font_file (str): font file path
        pdf_name (str): pdf file name
        pdf_canvas (reportlab.pdfgen.canvas.Canvas): canvas object
        width (float): canvas width
        height (float): canvas height
        font_size (int): font size

    """
    def __init__(self, size_prof, username, filename, label_dict_list):
        self.font_file = './fonts/migmix-1m-regular.ttf'
        self.pdf_name = filename
        self.size_prof = json.load(open('settings/size_prof.json'))[size_prof]
        self.user_prof = json.load(open('settings/user_prof.json'))[username]
        self.width = self.size_prof['page_w']*mm
        self.height = self.size_prof['page_h']*mm
        self.w_margin = self.size_prof['page_w_margin']*mm
        self.h_margin = self.size_prof['page_h_margin']*mm
        self.font_size = self.size_prof['font_size']
        self.pdf_canvas = canvas.Canvas(self.pdf_name, pagesize=landscape((self.width, self.height)))
        pdfmetrics.registerFont(TTFont('migmix', self.font_file))
        self.pdf_canvas.setFont('migmix', self.font_size)
        self.label_que = deque(label_dict_list)
        
    def _make_table(self, label_data):
        table = Table(label_data, self.size_prof['label_w']*mm, self.size_prof['label_h']*mm)
        table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'migmix', self.font_size),
            ('BOX', (0, 0), (-1, -1), 0.1, colors.black),
            ('INNERGRID', (0, 0), (-1, -1), 0.1, colors.black),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0.0*mm),
            ('LEFTPADDING', (0, 0), (-1, -1), 0.3*mm),
            ('TOPPADDING', (0, 0), (-1, -1), 0.0*mm),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0.3*mm)
        ]))
        table.wrapOn(self.pdf_canvas, self.w_margin, self.h_margin)
        table.drawOn(self.pdf_canvas, self.w_margin, self.h_margin)
        self.pdf_canvas.showPage()
        
    def _gen_data_label(self, label_dict):
        """データラベル用文字列を生成

        Args:
            label_dict (dict): ラベルデータを格納した辞書
        Returns:
            str: データラベル1枚分の文字列
        """ 
        #国号 + 島名
        country_and_island = label_dict['country'] + ": " + label_dict['island']
        #地名
        place_list = [label_dict['prefecture'], label_dict['city'], label_dict['placeNameMoreInfo'], 
                    label_dict['naturalPlaceName'], label_dict['supplementaryInfo']] 
        place_list = [s for s in place_list if s != ''] #NULL要素を排除
        place_name = textwrap.fill(', '.join(place_list), self.size_prof['one_line_limit'])
        while place_name.count('\n') < self.size_prof['place_row']: #地名スペース行分使い切るようにする
            place_name += '\n'
        #標高
        elv = label_dict['elevation'] + 'm'
        if label_dict['elevation'] == '':
            elv = ''
        #GPS座標
        n = label_dict['nDegree'] + "°" + label_dict['nMin'] + "'" + label_dict['nSec'] + "\"N, "
        e = label_dict['eDegree'] + "°" + label_dict['eMin'] + "'" + label_dict['eSec'] + "\"E "
        gps = n + e
        if label_dict['nDegree'] == '':
            gps = 'GPS: NO DATA'
        gps_and_elv = gps + elv
        #日付と採集者
        year = label_dict['year']
        month = label_dict['month']
        day = label_dict['day']
        if year == '':
            year = 'Y:?'
        if month == '':
            month = 'M:?'
        if day == '':
            day = 'D:?'
        #採集月が明確な場合ローマ数字に変換
        roman_num_dict = {'1' : 'I', '2': 'II', '3' : 'III', '4' : 'IV', '5' : 'V', '6' : 'VI',
                        '7' : 'VII', '8' : 'VIII', '9' : 'IX', '10' : 'X', '11' : 'XI', '12' : 'XII'}
        if month.isdecimal():
            month = roman_num_dict[month]
        collecter = label_dict['collecterName']
        if collecter == '':
            collecter  = 'leg: Unknown'
        date_and_leg = ' '.join([day, month, year]) + ', ' + collecter
        #日本語地名
        place_ja_list = [label_dict['cityJa'], label_dict['placeNameMoreInfoJa'], label_dict['naturalPlaceNameJa']]
        place_ja_list = [s for s in place_ja_list if s != ''] #NULL要素を排除
        place_ja = ' '.join(place_ja_list)
        #各項目を連結
        return '\n'.join([country_and_island, place_name, gps_and_elv, date_and_leg, place_ja]) 

    def _gen_col_label(self, label_dict):
        """コレクションラベル用文字列を生成

        Args:
            label_dict (dict): ラベルデータを格納した辞書
        Returns:
            str: コレクションラベル1枚分の文字列
        """
        col_name = textwrap.fill(self.user_prof['col_name'], self.size_prof['one_line_limit'])
        col_abbr = self.user_prof['col_abbr'] 
        col_num = label_dict['collectionCode']
        col_name_row = self.size_prof['col_name_row']
        while col_name.count('\n') < col_name_row: #コレクション名スペース指定行分使い切るようにする
            col_name += '\n'
        return col_name + col_abbr + ': ' + col_num.rjust(self.size_prof['col_num_digits'], '0')

    def _gen_det_label(self, label_dict):
        genus = label_dict['genus']
        sp = label_dict['species']
        subsp = label_dict['subspecies']
        sex = label_dict['sex']
        author = label_dict['scientificNameAuthorship']
        descyear = label_dict['descriptionYear']
        jpname = label_dict['japaneseName']
        detby = label_dict['identifiedBy']
        detyear = label_dict['identifiedYear']
        if genus == '':
            genus = 'UnIdentified.'
        if sp == '':
            sp = 'sp.'
        if sex == '':
            sex = 'Sex: UnIdentified'
        elif sex == 'M':
            sex = 'sex: ♂'
        elif sex == 'F':
            sex = 'sex: ♀'
        elif sex == 'H':
            sex = 'sex: Hermaphrodite'
        elif sex == 'T':
            sex = 'sex: Transition'
        author_and_descyear = author + ', ' + descyear
        if author == '':
            author_and_descyear = ''
        detprof = detby + ' det., ' + detyear
        if detby == '':
            detprof = ''
        return '\n'.join([genus, sp, subsp, author_and_descyear, sex, jpname, detprof])
        
    def _make_one_type_label(self, labeller_func):
        while len(self.label_que) > 0:
            #1ページ分の行数の空ラベル入り二次元リストを作る
            label_list = [["" for c in range(self.size_prof['page_col'])] for r in range(self.size_prof['page_row'])]
            #各行のリスト内の各列にラベルデータを挿入
            for r in range(self.size_prof['page_row']):
                for c in range(self.size_prof['page_col']):
                    if len(self.label_que) == 0:
                        break
                    else:
                        label_list[r][c] = labeller_func(self.label_que.popleft())
            #1ページ分データ作り次第テーブル書き込んで改ページ
            self._make_table(label_list)
        self.pdf_canvas.save()
        
    def _make_two_type_label(self, labeller_func1, labeller_func2):
        while len(self.label_que) > 0:
            #1ページ分の行数の空ラベル入り二次元リストを作る
            label_list = [["" for c in range(self.size_prof['page_col'])] for r in range(self.size_prof['page_row'])]
            #各行のリスト内の各列にラベルデータを挿入
            for r in range(self.size_prof['page_row']):
                if len(self.label_que) == 0:
                    break
                pair_counter = 1
                while pair_counter < self.size_prof['page_col']:
                    popdata = self.label_que.popleft()
                    label_list[r][pair_counter - 1] = labeller_func1(popdata)
                    label_list[r][pair_counter] = labeller_func2(popdata)
                    pair_counter += 2
            #1ページ分データ作り次第テーブル書き込んで改ページ
            self._make_table(label_list)
        self.pdf_canvas.save()
        
    def _make_three_type_label(self, labeller_func1, labeller_func2, labeller_func3):
        while len(self.label_que) > 0:
            #1ページ分の行数の空ラベル入り二次元リストを作る
            label_list = [["" for c in range(self.size_prof['page_col'])] for r in range(self.size_prof['page_row'])]
            #各行のリスト内の各列にラベルデータを挿入
            for r in range(self.size_prof['page_row']):
                if len(self.label_que) == 0:
                    break
                pair_counter = 2
                while pair_counter < self.size_prof['page_col']:
                    popdata = self.label_que.popleft()
                    label_list[r][pair_counter - 2] = labeller_func1(popdata)
                    label_list[r][pair_counter - 1] = labeller_func2(popdata)
                    label_list[r][pair_counter] = labeller_func3(popdata)
                    pair_counter += 3
            #1ページ分データ作り次第テーブル書き込んで改ページ
            self._make_table(label_list)
        self.pdf_canvas.save()
        
    def _select_labeller_method(self, *labeller_methods):
        """ラベル描画メソッドを指定
        
        Args:
            *labeller_methods (tuple): ラベラーメソッドを指定する可変長引数
        """
        if len(labeller_methods) == 1:
            self._make_one_type_label(labeller_methods[0])
        elif len(labeller_methods) == 2:
            self._make_two_type_label(labeller_methods[0], labeller_methods[1])
        elif len(labeller_methods) == 3:
            self._make_three_type_label(labeller_methods[0], labeller_methods[1], labeller_methods[2])
        
    def write_label(self, data=False, col=False, det=False):
        """指定した種類のラベルを描画

        Args:
            data (bool, optional): データラベルを作るか真偽で指定. Defaults to False.
            col (bool, optional): コレクションラベルを作るか真偽で指定. Defaults to false.
            det (bool, optional): 同定ラベルを作るか真偽で指定. Defaults to False.
        """
        #指定なし、エラー対策
        if data == False and col == False and det==False:
            return
        #データのみ
        elif data == True and col == False and det == False:
            self._select_labeller_method(self._gen_data_label)
        #コレクションのみ
        elif data == False and col == True and det == False:
            self._select_labeller_method(self._gen_col_label)
        #同定のみ
        elif data == False and col == False and det == True:
            self._select_labeller_method(self._gen_det_label)
        #データとコレクション
        elif data == True and col == True and det == False:
            self._select_labeller_method(self._gen_data_label, self._gen_col_label)
        #データと同定
        elif data == True and col == False and det == True:
            self._select_labeller_method(self._gen_data_label, self._gen_det_label)
        #コレクションと同定
        elif data == False and col == True and det == True:
            self._select_labeller_method(self._gen_col_label, self._gen_det_label)
        #全種
        elif data == True and col == True and det == True:
            self._select_labeller_method(self._gen_data_label, self._gen_col_label, self._gen_det_label)


        
l = LabelCanvas('default', "FUJIKAWA HIROAKI", 'test.pdf',  test_data())
l.write_label(data=True, col=True, det=True)
