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
    ImageField,
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
} from 'react-admin';
import Typography from '@material-ui/core/Typography';


const identity = value => (value)

const CustomTaxonEditActions = ({ basePath, data}) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const validateCamelCase = [regex(/^[A-Z][a-z]+$/, '先頭のみ大文字の半角英字にしてください'), minLength(0), maxLength(30)]
const validateLowerCase = [regex(/^[a-z-]+$/, '全て小文字の半角英字にしてください 記号はハイフンのみ使用可能'), minLength(0), maxLength(30)]


function formatImage(value) {
    if (!value ||  typeof value === "string") {
     return { url: value };
    } else {
      return value;
    }
}


const CustomTaxonEdit = (props) => (
    <Edit actions={<CustomTaxonEditActions/>} {...props} title="カスタム分類情報">
        <TabbedForm warnWhenUnsavedChanges>
            <FormTab label="下位分類・記載者(年)・和名">
                <Typography variant='h6'>長音母音入力補助 コピペして使用してください: ā ī ū ē ō ȳ Ā Ī Ū Ē Ō Ȳ â î û ê ô Â Î Û Ê Ô</Typography>
                <TextInput source="genus" label="属" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="subgenus" label="亜属" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="species" label="種" helperText='全て小文字の半角英字30字以内 記号はハイフンのみ使用可能' parse={identity} resettable validate={validateLowerCase}/>
                <TextInput source="subspecies" label="亜種" helperText='全て小文字の半角英字30字以内 記号はハイフンのみ使用可能' parse={identity} resettable validate={validateLowerCase}/>
                <TextInput source="scientific_name_author" label="記載者" helperText='50字以内' parse={identity} resettable validate={[minLength(0), maxLength(50)]}/>
                <NumberInput source="name_publishedin_year" label="記載年" helperText='半角数字4桁(不明な場合0を入力してください)'  defaultValue={0} parse={identity} validate={[minValue(0), maxValue(9999), required("この項目は空にできません 不明な場合0を入力してください")]}/>
                <NumberInput source="actual_dist_year" label="記載実流通年" helperText='半角数字4桁(基本的に記載年と同じでOKです)' defaultValue={0} validate={[minValue(0), maxValue(9999), required("この項目は空にできません 不明な場合0を入力してください")]}/>
                <BooleanInput source="change_genus_brackets" label="属移動カッコの有無" parse={identity} defaultValue={false}/>
                <BooleanInput source="unknown_author_brackets" label="記載者不明角カッコの有無" parse={identity} defaultValue={false}/>
                <BooleanInput source="unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無" parse={identity} defaultValue={false}/>
                <TextInput source="japanese_name" label="和名" helperText='30字以内  標本との紐付け検索時にも利用されるので、上位分類のみの入力の場合はここに区別に必要な情報を入力してください' parse={identity} resettable validate={[minLength(0), maxLength(30)]}/>
            </FormTab>
            <FormTab label="上位分類">
                <TextInput source="kingdom" label="界" defaultValue="Animalia" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="phylum" label="門" defaultValue="Arthropoda" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="class_name" label="綱" defaultValue="Insecta" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="order" label="目" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="suborder" label="亜目" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="family" label="科" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="subfamily" label="亜科" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="tribe" label="族" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
                <TextInput source="subtribe" label="亜族" helperText='先頭のみ大文字の半角英字30字以内' parse={identity} resettable validate={validateCamelCase}/>
            </FormTab>
            <FormTab label="分布・備考">
                <TextInput multiline source="distribution" label="分布" helperText='500字以内 改行可' parse={identity} resettable validate={minLength(0), maxLength(500)}/>
                <TextInput multiline source="note" label="備考" helperText='500字以内 改行可' parse={identity} resettable validate={minLength(0), maxLength(500)}/>
            </FormTab>
            <FormTab label="画像">
                <ImageInput format={formatImage} source="image1" label="画像" >
                    <ImageField source="url" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CustomTaxonEdit;