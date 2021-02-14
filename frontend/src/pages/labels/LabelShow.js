import * as React from 'react';
import {
    TopToolbar,
    ListButton,
    Tab,
    Show,
    Button,
    SimpleShowLayout,
    TabbedShowLayout,
    RichTextField,
    DateField,
    Datagrid,
    ReferenceField,
    BooleanField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    TextField,
    NumberField,
    EditButton,
    ImageField,
} from 'react-admin';
import {MakePDFButton} from './MakeLabelPDF';


const LabelShowActions = ({ basePath, data}) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
        <MakePDFButton record={data} />
    </TopToolbar>
);


const LabelShow = props => (
    <Show actions={<LabelShowActions/>} {...props} title="ラベル">
        <TabbedShowLayout>
            <Tab label='基本情報'>
                <TextField source="name" label="ラベル名"/>
                <BooleanField source="data_label_flag" label="データラベル作成の可否"/>
                <BooleanField source="coll_label_flag" label="コレクションラベル作成の可否"/>
                <BooleanField source="det_label_flag" label="同定ラベル作成の可否"/>
                <BooleanField source="note_label_flag" label="備考ラベル作成の可否"/>
                <DateField source="created_at" label="作成日"/>
            </Tab>
            <Tab label='所属標本'>
                <ReferenceArrayField label="所属標本" reference="specimens/own-specimens" source="label_specimens">
                    <Datagrid>
                        <DateField source="date_last_modified" label="作成日"/>
                        <TextField source="name" label="標本ID"/>
                        <TextField source="genus" label="属"/>
                        <TextField source="species" label="種"/>
                        <EditButton />
                    </Datagrid>
                </ReferenceArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default LabelShow;