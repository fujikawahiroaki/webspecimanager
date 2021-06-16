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
    BooleanField,
    EditButton,
    ImageField,
} from 'react-admin';


const DefaultTaxonShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const DefaultTaxonShow = props => (
    <Show actions={<DefaultTaxonShowActions />} {...props} title="デフォルト分類情報">
        <TabbedShowLayout>
            <Tab label='下位分類・記載者(年)・和名'>
                <TextField source="genus" label="属" />
                <TextField source="subgenus" label="亜属" />
                <TextField source="species" label="種" />
                <TextField source="subspecies" label="亜種" />
                <TextField source="scientific_name_author" label="記載者" />
                <TextField source="name_publishedin_year" label="記載年" />
                <TextField source="actual_dist_year" label="記載実流通年" />
                <BooleanField source='change_genus_brackets' label='属移動カッコの有無' />
                <BooleanField source='unknown_author_brackets' label='記載者不明角カッコの有無' />
                <BooleanField source='unknown_name_publishedin_year_brackets' label='記載年不明角カッコの有無' />
                <TextField source="japanese_name" label="和名" />
            </Tab>
            <Tab label='上位分類'>
                <TextField source="kingdom" label="界" />
                <TextField source="phylum" label="門" />
                <TextField source="class_name" label="綱" />
                <TextField source="order" label="目" />
                <TextField source="suborder" label="亜目" />
                <TextField source="family" label="科" />
                <TextField source="subfamily" label="亜科" />
                <TextField source="tribe" label="族" />
                <TextField source="subtribe" label="亜族" />
            </Tab>
            <Tab label='分布・備考'>
                <TextField source="distribution" label="分布" />
                <TextField source="note" label="備考" />
            </Tab>
            <Tab label='管理情報'>
                <DateField source="created_at" label="作成日" />
            </Tab>
            <Tab label='画像'>
                <ImageField source="image1" label="画像1" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default DefaultTaxonShow;