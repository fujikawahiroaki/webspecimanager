import * as React from "react";
import {
    TabbedForm,
    FormTab,
    Create,
    Datagrid,
    TextField,
    DateField,
    TextInput,
    ReferenceManyField,
    NumberInput,    
    DateInput,
    BooleanInput,
    ImageInput,
    ReferenceArrayInput,
    SelectArrayInput,
    ImageField,
    TopToolbar,
    ListButton,
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
} from 'react-admin';


const LabelCreateActions = ({ basePath, data}) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);


const LabelCreate = (props) => (
    <Create actions={<LabelCreateActions/>} {...props} title="ラベル">
        <TabbedForm>
            <FormTab label="基本情報">
                <TextInput source="name" label="ラベル名"/>
                <BooleanInput source="data_label_flag" label="データラベル作成の可否"/>
                <BooleanInput source="coll_label_flag" label="コレクションラベル作成の可否"/>
                <BooleanInput source="det_label_flag" label="同定ラベル作成の可否"/>
                <BooleanInput source="note_label_flag" label="備考ラベル作成の可否"/>
            </FormTab>
            <FormTab label="所属標本">
                <ReferenceArrayInput source="label_specimens" reference="specimens/own-specimens" perPage={100}>
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default LabelCreate;