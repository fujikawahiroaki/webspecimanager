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
    NumberField,
    EditButton,
    ImageField,
} from 'react-admin';


const CollectPointShowActions = ({ basePath, data}) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const CollectPointShow = props => (
    <Show actions={<CollectPointShowActions/>} {...props} title="カスタム分類情報">
        <TabbedShowLayout>
            <Tab label='地名情報'>
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
            </Tab>
            <Tab label="緯度・経度・標高・水深">
                <NumberField source="longitude" label="経度"/>
                <NumberField source="latitude" label="緯度"/>
                <NumberField source="coordinate_precision" label="採集地の範囲"/>
                <NumberField source="minimum_elevation" label="最低標高"/>
                <NumberField source="maximum_elevation" label="最高標高"/>
                <NumberField source="minimum_depth" label="水面からの最浅の距離"/>
                <NumberField source="maximum_depth" label="水面からの最深の距離"/>
            </Tab>
            <Tab label='採集行'>
                <ReferenceField label="登録された採集行" source="tour" reference="tours/own-tours" link="show"  sort={{ field: 'created_at', order: 'DESC' }} perPage={100}>
                    <TextField source="title"/>
                </ReferenceField>
            </Tab>
            <Tab label="管理情報">
                <DateField source="created_at" label="作成日"/>
            </Tab>
            <Tab label='画像'>
                <ImageField source="image1" label="画像" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default CollectPointShow;