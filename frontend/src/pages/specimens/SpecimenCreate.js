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
    ReferenceInput,
    AutocompleteInput,
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


const SpecimenCreateActions = ({ basePath, data}) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);


function formatImage(value) {
    if (!value ||  typeof value === "string") {
     return { url: value };
    } else {
      return value;
    }
}


const SpecimenCreate = (props) => (
    <Create actions={<SpecimenCreateActions/>} {...props} title="標本">
        <TabbedForm>
            <FormTab label="標本固有情報">
                <ReferenceInput
                    source="collection_settings_info"
                    label="登録されたコレクション設定情報"
                    reference="collection-settings/own-collection-settings"
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="institution_code" helperText="機関コードで検索"/>
                </ReferenceInput>
                <NumberInput source="collection_code" label="標本ID" helperText='半角数字18桁以内(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(999999999999999999)]}/>
                <DateInput source="date_identified" label="同定日"/>
                <NumberInput source="year" label="採集年" helperText='半角数字4桁以内(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(9999)]}/>
                <NumberInput source="month" label="採集月" helperText='半角数字12以下(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(12)]}/>
                <NumberInput source="day" label="採集日" helperText='半角数字31以下(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(31)]}/>
            </FormTab>
            <FormTab label="分類情報">
                <ReferenceInput
                    source="custom_taxon_info"
                    label="登録されたカスタム分類情報"
                    reference="taxa/own-taxa"
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="scientific_name" helperText="属 種 亜種 の組み合わせで検索"/>
                </ReferenceInput>
                <ReferenceInput
                    source="default_taxon_info"
                    label="登録されたデフォルト分類情報"
                    reference="taxa/shared-taxa"
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="scientific_name" helperText="属 種 亜種 の組み合わせで検索"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="採集地点">
                <ReferenceInput
                    source="collect_point_info"
                    label="登録された採集地点"
                    reference="collect-points/own-collect-points"
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="japanese_place_name" helperText="日本語地名で検索"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="採集行">
                <ReferenceInput
                    source="tour"
                    label="登録された採集行"
                    reference="tours/own-tours"
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="title" helperText="採集行のタイトルで検索"/>
                </ReferenceInput>
            </FormTab>
            <FormTab label="画像">
                <ImageInput format={formatImage} source="image1" label="画像" >
                    <ImageField source="url" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default SpecimenCreate;