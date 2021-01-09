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


const CustomTaxonShowActions = ({ basePath, record, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={record} resource={resource}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const CustomTaxonShow = props => (
    <Show {...props} title="分類情報(カスタム)" actions={<CustomTaxonShowActions/>}>
        <TabbedShowLayout>
            <Tab label='下位分類・和名'>
                <TextField source="genus" />
                <TextField source="subgenus" />
                <TextField source="species" />
                <TextField source="subspecies" />
                <TextField source="scientific_name_author" />
                <NumberField source="name_publishedin_year" />
                <TextField source="japanese_name" />
                <TextField source="distribution" />
            </Tab>
            <Tab label='上位分類'>
                <TextField source="kingdom" />
                <TextField source="phylum" />
                <TextField source="class_name" />
                <TextField source="order" />
                <TextField source="suborder" />
                <TextField source="family" />
                <TextField source="subfamily" />
                <TextField source="tribe" />
                <TextField source="subtribe" />
            </Tab>
            <Tab label='分布・備考'>
                <TextField source="distribution" />
                <TextField source="note" />
            </Tab>
            <Tab label='管理情報'>
                <DateField source="created_at" />
            </Tab>
            <Tab label='画像'>
                <ImageField source="image1" />
                <ImageField source="image2" />
                <ImageField source="image3" />
                <ImageField source="image4" />
                <ImageField source="image5" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default CustomTaxonShow;