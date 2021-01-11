import * as React from "react";
import {
    TopToolbar,
    TabbedForm,
    FormTab,
    Edit,
    Datagrid,
    TextField,
    DateField,
    TextInput,
    ReferenceManyField,
    NumberInput,    
    DateInput,
    BooleanInput,
    EditButton,
    ShowButton,
    ListButton,
    ImageInput,
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
} from 'react-admin';


const CustomTaxonEditActions = ({ basePath, data}) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const validateCamelCase = [regex(/^[A-Z][a-z]+$/, '先頭のみ大文字の半角英字にしてください'), minLength(0), maxLength(30)]
const validateLowerCase = [regex(/^[a-z]+$/, '全て小文字の半角英字にしてください'), minLength(0), maxLength(30)]

const CustomTaxonEdit = (props) => (
    <Edit actions={<CustomTaxonEditActions/>} {...props} title="カスタム分類情報">
        <TabbedForm>
            <FormTab label="下位分類・記載者(年)・和名">
                <TextInput source="genus" label="属" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="subgenus" label="亜属" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="species" label="種" helperText='全て小文字の半角英字30字以内' resettable validate={validateLowerCase}/>
                <TextInput source="subspecies" label="亜種" helperText='全て小文字の半角英字30字以内' resettable validate={validateLowerCase}/>
                <TextInput source="scientific_name_author" label="記載者" helperText='50字以内' resettable validate={[minLength(0), maxLength(50)]}/>
                <NumberInput source="name_publishedin_year" label="記載年" helperText='半角数字4桁(不明な場合0を入力してください)' validate={[minValue(0), maxValue(9999)]}/>
                <TextInput source="japanese_name" label="和名" helperText='30字以内' resettable validate={[minLength(0), maxLength(30)]}/>
            </FormTab>
            <FormTab label="上位分類">
                <TextInput source="kingdom" label="界" defaultValue="Animalia" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="phylum" label="門" defaultValue="Arthropoda" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="class_name" label="綱" defaultValue="Insecta" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="order" label="目" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="suborder" label="亜目" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="family" label="科" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="subfamily" label="亜科" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="tribe" label="族" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
                <TextInput source="subtribe" label="亜族" helperText='先頭のみ大文字の半角英字30字以内' resettable validate={validateCamelCase}/>
            </FormTab>
            <FormTab label="分布・備考">
                <TextInput multiline source="distribution" label="分布" helperText='100字以内 改行可' resettable validate={minLength(0), maxLength(100)}/>
                <TextInput multiline source="note" label="備考" helperText='200字以内 改行可' resettable validate={minLength(0), maxLength(200)}/>
            </FormTab>
            <FormTab label="画像">
                <ImageInput source="image1" label="画像1" />
                <ImageInput source="image2" label="画像2" />
                <ImageInput source="image3" label="画像3" />
                <ImageInput source="image4" label="画像4" />
                <ImageInput source="image5" label="画像5" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CustomTaxonEdit;