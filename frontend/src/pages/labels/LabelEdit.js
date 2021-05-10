import * as React from "react";
import {
    TabbedForm,
    FormTab,
    Edit,
    Button,
    Datagrid,
    TextField,
    DateField,
    TextInput,
    ReferenceManyField,
    NumberInput,    
    DateInput,
    BooleanInput,
    ReferenceArrayInput,
    SelectArrayInput,
    ImageInput,
    ImageField,
    TopToolbar,
    ListButton,
    ShowButton,
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
    useMutation, Loading, Error
} from 'react-admin';


const identity = value => (value)


const LabelEditActions = ({ basePath, data}) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);


const LabelEdit = (props) => (
    <Edit actions={<LabelEditActions/>} {...props} title="ラベル">
        <TabbedForm warnWhenUnsavedChanges>
            <FormTab label="基本情報">
                <TextInput source="name" label="ラベル名" parse={identity}/>
                <BooleanInput source="data_label_flag" label="データラベル作成の可否"/>
                <BooleanInput source="coll_label_flag" label="コレクションラベル作成の可否"/>
                <BooleanInput source="det_label_flag" label="同定ラベル作成の可否"/>
                <BooleanInput source="note_label_flag" label="備考ラベル作成の可否"/>
            </FormTab>
            <FormTab label="所属標本">
                <ReferenceArrayInput source="label_specimens" label="所属標本 直近に登録した標本10万件のリストから選択" reference="specimens/own-specimens" sort={{ field: 'date_last_modified', order: 'DESC' }} perPage={100000}>
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default LabelEdit;