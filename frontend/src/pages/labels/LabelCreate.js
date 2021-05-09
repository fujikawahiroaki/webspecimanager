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


const identity = value => (value)


const LabelCreateActions = ({ basePath, data}) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);


const LabelCreate = (props) => (
    <Create actions={<LabelCreateActions/>} {...props} title="ラベル">
        <TabbedForm>
            <FormTab label="基本情報">
                <TextInput source="name" label="ラベル名" parse={identity}/>
                <BooleanInput source="data_label_flag" label="データラベル作成の可否" initialValue={false}/>
                <BooleanInput source="coll_label_flag" label="コレクションラベル作成の可否" initialValue={false}/>
                <BooleanInput source="det_label_flag" label="同定ラベル作成の可否" initialValue={false}/>
                <BooleanInput source="note_label_flag" label="備考ラベル作成の可否" initialValue={false}/>
            </FormTab>
            <FormTab label="所属標本">
                <ReferenceArrayInput source="label_specimens" label="所属標本 直近に登録した標本10万件のリストから選択" reference="specimens/own-specimens" sort={{ field: 'date_last_modified', order: 'DESC' }} perPage={100000}>
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default LabelCreate;