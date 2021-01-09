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
} from 'react-admin';


const SpecimenShowActions = ({ basePath, record, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={record} />
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const SpecimenShow = props => (
    <Show {...props} title="標本" actions={<SpecimenShowActions/>}>
        <TabbedShowLayout>
            <Tab label='管理情報'>
                <TextField source="collection_name" />
                <TextField source="institution_code" />
                <NumberField source="collection_code" />
                <TextField source="collection_settings_info.id" />
                <DateField source="date_last_modified" />
                <TextField source="preparation_type" />
                <TextField source="disposition" />
                <TextField source="rights" />
                <TextField source="note" />
            </Tab>
            <Tab label='分類情報'>
                <TextField source="collect_point_info.id" />
                <TextField source="custom_taxon_info.id" />
                <DateField source="date_identified" />
                <TextField source="identified_by" />
                <TextField source="sex" />
                <TextField source="lifestage" />
                <TextField source="establishment_means" />
            </Tab>
            <Tab label='採集情報'>
                <NumberField source="year" />
                <NumberField source="month" />
                <NumberField source="day" />
                <TextField source="collecter" />
                <TextField source="sampling_protocol" />
                <TextField source="sampling_effort" />
                <TextField source="tour.id" />
            </Tab>
            <Tab label='画像'>
                <TextField source="image1" />
                <TextField source="image2" />
                <TextField source="image3" />
                <TextField source="image4" />
                <TextField source="image5" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default SpecimenShow;