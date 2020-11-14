from django.test.testcases import SimpleTestCase
from label_maker.utils import LabelCanvas


class TestLabelCanvas(SimpleTestCase):
    """
    LabelCanvasクラスのテスト
    """
    
    def test_write_label(self):
        label_dict1 = {
            'country': 'JP', 'island': 'Okinawa-Is.',
            'state_provice': 'Okinawa-ken', 'county': '',
            'municipality': 'Nago-shi, Agarie, Mt.Nago-dake',
            'latitude': 32.009897, 'longitude': 128.004488,
            'maximum_elevation': 290, 'year': 2020,
            'month': 10, 'day': 20, 'collecter': 'FUJIKAWA H.',
            'japanese_place_name': '名護市 東江 名護岳',
            'collection_name': "FUJIKAWA Hiroaki's Collection",
            'institution_code': 'FHC', 'collection_code': 34,
            'sex': 'U', 'genus': 'Hogehoogegege',
            'species': 'fuagagaensis', 'subspecies': 'ogegegeois',
            'japanese_name': 'ホゲホゲフガホソカタムシ',
            'scientific_name_author': 'Bakaaho',
            'name_publishedin_year': 2019,
            'identified_by': 'FUJIKAWA H.', 'date_identified': 2020,
            'sampling_protocol': 'Beating'
        }
        label_dict2 = {
            'country': 'JP', 'island': 'Honsyu-Is.',
            'state_provice': 'Yamaguchi-ken', 'county': '',
            'municipality': 'Shimonoseki-shi, Moji, Mt.Mojimoji-yama',
            'latitude': 32.009897, 'longitude': 128.004488,
            'maximum_elevation': 290, 'year': 2020,
            'month': 10, 'day': 20, 'collecter': 'UNKOMAN K.',
            'japanese_place_name': '下関市 門司 門司門司山',
            'collection_name': "FUJIKAWA Hiroaki's Collection",
            'institution_code': 'FHC', 'collection_code': 39,
            'sex': 'U', 'genus': 'Hagehageyus',
            'species': 'hogehogei', 'subspecies': '',
            'japanese_name': 'ハゲホゲゴミムシダマシ',
            'scientific_name_author': 'Buriburiman',
            'name_publishedin_year': 2019,
            'identified_by': 'FUJIKAWA H.', 'date_identified': 2020,
            'sampling_protocol': 'Looking'
        }
        self.label_list = []
        for i in range(40):
            self.label_list.append(label_dict1)
            self.label_list.append(label_dict2)
        all_label = LabelCanvas(self.label_list, 'test_alllabel.pdf')
        all_label.write_label()
        one_label = LabelCanvas(self.label_list, 'test_onelabel.pdf')
        one_label.write_label(data=True, coll=False, det=False, note=False)
        two_label = LabelCanvas(self.label_list, 'test_twolabel.pdf')
        two_label.write_label(data=True, coll=True, det=False, note=False)
        three_label = LabelCanvas(self.label_list, 'test_threelabel.pdf')
        three_label.write_label(data=True, coll=True, det=True, note=False)
        self.assertTrue(True)
