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


const CollectionSettingCreateActions = ({ basePath, data}) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const validateCollectionName = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(174)]
const validateInstitutionCode = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(10)]


const CollectionSettingCreate = (props) => (
    <Create actions={<CollectionSettingCreateActions/>} {...props} title="コレクション設定">
        <TabbedForm>
            <FormTab label="設定">
                <TextInput source="collection_name" label="コレクション名のフルネーム" helperText='半角英数記号174字以内' resettable validate={validateCollectionName}/>
                <TextInput source="institution_code" label="機関コード(コレクション名の略号)" helperText='半角英数記号10字以内' resettable validate={validateInstitutionCode}/>
                <NumberInput source="latest_collection_code" label="標本IDの最新番号(標本登録時はこの値の+1が標本IDとなります)" helperText='半角数字18桁以内(新規にコレクションを作成する場合は0を入力してください)' validate={[minValue(0), maxValue(999999999999999999)]}/>
            </FormTab>
            <FormTab label="備考">
                <TextInput multiline source="note" label="備考" helperText='200字以内 改行可' resettable validate={minLength(0), maxLength(200)}/>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default CollectionSettingCreate;