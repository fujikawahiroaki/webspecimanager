import * as React from 'react';
import {
    TopToolbar,
    ListButton,
    Tab,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    RichTextField,
    DateField,
    Datagrid,
    ReferenceField,
    TextField,
    ImageField,
    NumberField,
    BooleanField,
    EditButton,
} from 'react-admin';
import { LeafletCoordinateField } from '../../utils/leafletField';


const SpecimenShowActions = ({ basePath, data}) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const SpecimenShow = props => (
    <Show {...props} title="標本" actions={<SpecimenShowActions/>}>
        <TabbedShowLayout>
            <Tab label='標本固有情報'>
                <ReferenceField label="登録されたコレクション設定" source="collection_settings_info" reference="collection-settings/own-collection-settings" link="show">
                    <TextField source="collection_name"/>
                </ReferenceField>
                <TextField source="collection_name" label="コレクション名"/>
                <TextField source="institution_code" label="機関コード"/>
                <NumberField source="collection_code" label="標本ID"/>
                <TextField source="identified_by" label="同定者"/>
                <DateField source="date_identified" label="同定年月日"/>
                <TextField source="collecter" label="採集者"/>
                <TextField source="year" label="採集年"/>
                <TextField source="month" label="採集月"/>
                <TextField source="day" label="採集日"/>
                <TextField source="sex" label="性別"/>
                <BooleanField source="allow_kojin_shuzo" label="個人収蔵.comへの投稿の可否" />
                <BooleanField source="published_kojin_shuzo" label="個人収蔵.comに投稿済み?" />
                <TextField source="preparation_type" label="標本の種類"/>
                <TextField source="disposition" label="現在の標本の状況"/>
                <TextField source="sampling_protocol" label="採集方法"/>
                <TextField source="sampling_effort" label="採集中の作業メモ"/>
                <TextField source="lifestage" label="ライフステージ"/>
                <TextField source="establishment_means" label="生成プロセス"/>
                <TextField source="rights" label="ライセンス"/>
                <TextField source="note" label="備考" />
                <DateField source="date_last_modified" label="作成日"/>
            </Tab>
            <Tab label='分類情報(カスタムが優先表示されます)'>
                <ReferenceField label="登録されたデフォルト分類情報" source="default_taxon_info" reference="taxa/shared-taxa" link="show">
                    <TextField source="scientific_name"/>
                </ReferenceField>
                <ReferenceField label="登録されたカスタム分類情報" source="custom_taxon_info" reference="taxa/own-taxa" link="show">
                    <TextField source="scientific_name"/>
                </ReferenceField>
                <TextField source="kingdom" label="界" />
                <TextField source="phylum" label="門" />
                <TextField source="class_name" label="綱" />
                <TextField source="order" label="目" />
                <TextField source="suborder" label="亜目" />
                <TextField source="family" label="科" />
                <TextField source="subfamily" label="亜科" />
                <TextField source="tribe" label="族" />
                <TextField source="subtribe" label="亜族" />
                <TextField source="genus" label="属"/>
                <TextField source="subgenus" label="亜属"/>
                <TextField source="species" label="種"/>
                <TextField source="subspecies" label="亜種"/>
                <TextField source="scientific_name_author" label="記載者"/>
                <TextField source="name_publishedin_year" label="記載年"/>
                <TextField source="actual_dist_year" label="記載実流通年"/>
                <BooleanField source="change_genus_brackets" label="属移動カッコの有無" sortable={false} />
                <BooleanField source="unknown_author_brackets" label="記載者不明角カッコの有無" sortable={false} />
                <BooleanField source="unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無" sortable={false} />
                <TextField source="japanese_name" label="和名"/>
            </Tab>
            <Tab label='採集地点'>
                <ReferenceField label="登録された採集地点" source="collect_point_info" reference="collect-points/own-collect-points" link="show">
                    <TextField source="japanese_place_name_detail"/>
                </ReferenceField>
                <LeafletCoordinateField source="location" label="マップ"/>
                <TextField source="country" label="国名コード(ISO 3166-1)"/>
                <TextField source="contient" label="大陸"/>
                <TextField source="island_group" label="島群"/>
                <TextField source="island" label="島"/>
                <TextField source="state_provice" label="県(州)"/>
                <TextField source="county" label="海外における群・区"/>
                <TextField source="municipality" label="市名以下の詳細地名"/>
                <TextField source="verbatim_locality" label="採集地の説明"/>
                <TextField source="japanese_place_name" label="日本語地名(ラベル用)"/>
                <TextField source="japanese_place_name_detail" label="日本語地名(詳細)"/>
                <NumberField source="longitude" label="経度" options={{ maximumFractionDigits: 6 }}/>
                <NumberField source="latitude" label="緯度" options={{ maximumFractionDigits: 6 }}/>
                <NumberField source="coordinate_precision" label="採集地の範囲"/>
                <NumberField source="minimum_elevation" label="最低標高"/>
                <NumberField source="maximum_elevation" label="最高標高"/>
                <NumberField source="minimum_depth" label="水面からの最浅の距離"/>
                <NumberField source="maximum_depth" label="水面からの最深の距離"/>
            </Tab>
            <Tab label='採集行'>
                <ReferenceField label="登録された採集行" source="tour" reference="tours/own-tours" link="show">
                    <TextField source="title"/>
                </ReferenceField>
            </Tab>
            <Tab label='画像'>
                <ImageField source="image1" label="画像"/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default SpecimenShow;