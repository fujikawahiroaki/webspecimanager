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
    useMutation, Loading, Error
} from 'react-admin';


const MakePDFButton = ({ record }) => {
    const [mutate, { loading }] = useMutation();
    const pdfLink = event => mutate({
        type: 'getLabelPdf',
        resource: 'label-maker/own-labels',
        payload: {id: record.id},
    });
    return <Button
        label="ラベル生成"
        onClick={pdfLink}
        disabled={loading}
    />;
};


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
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ReferenceArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default LabelShow;