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
    FormDataConsumer,
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
    useQuery,
    Loading,
    Error,
    NumberField,
    SaveButton,
    Toolbar,
    useCreate,
    useUpdate,
    useGetOne,
    Button
} from 'react-admin';

import { useFormState } from 'react-final-form';

const identity = value => (value)


const SpecimenCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
);


const validateforIdentifiedBy = [regex(/^[!-~ À-ÖØ-öø-ÿ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(19)]
const validateforCollecter = [regex(/^[!-~ À-ÖØ-öø-ÿ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(18)]
const validateforSamplingProtocol = [regex(/^[!-~ À-ÖØ-öø-ÿ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(20)]
const validateforSamplingEffort = [regex(/^[!-~ À-ÖØ-öø-ÿ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(100)]
const validateforLifeStage = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(20)]
const validateforRights = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(10)]


function formatImage(value) {
    if (!value || typeof value === "string") {
        return { url: value };
    } else {
        return value;
    }
}


const SpecimenCreateToolbar = props => {
    const times = 3;
    const BulkCreateButton = props => {
        const { values } = useFormState();
        const [create, { loading, error }] = useCreate('specimens/own-specimens', {...values, times: times});
        const dbg = () => {
            console.log(values);
            create();
        };
        return <Button label="同一データの標本を指定個数作成" onClick={dbg} disabled={loading} />;
    };
    return (
        <Toolbar {...props} >
            <SaveButton />
            <BulkCreateButton {...props} />
        </Toolbar>
    );
};


const SpecimenCreate = (props) => (
    <Create actions={<SpecimenCreateActions />} {...props} title="標本">
        <TabbedForm toolbar={<SpecimenCreateToolbar />}>
            <FormTab label="標本固有情報">
                <ReferenceInput
                    source="collection_settings_info"
                    label="登録されたコレクション設定情報"
                    reference="collection-settings/own-collection-settings"
                    perPage={15000}
                    suggestionLimit={100}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="institution_code" helperText="機関コードで検索  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true} />
                </ReferenceInput>
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.collection_settings_info &&
                        <NumberInput source="collection_code" {...rest} label="標本ID 自動連番にする場合は入力しないでください" helperText='半角数字18桁以内(不明な場合0を入力してください)' parse={identity} allowEmpty={true} validate={[minValue(0), maxValue(999999999999999999)]} />
                    }
                </FormDataConsumer>
                <DateInput source="date_identified" label="同定日" />
                <TextInput source="identified_by" label="同定者" helperText='半角英数記号およびアクセント記号付き文字19字以内' parse={identity} validate={validateforIdentifiedBy} />
                <NumberInput source="year" label="採集年" helperText='半角数字4桁以内(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(9999)]} />
                <NumberInput source="month" label="採集月" helperText='半角数字12以下(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(12)]} />
                <NumberInput source="day" label="採集日" helperText='半角数字31以下(不明な場合0を入力してください)' parse={identity} validate={[minValue(0), maxValue(31)]} />
                <TextInput source="collecter" label="採集者" helperText='半角英数記号およびアクセント記号付き文字18字以内' parse={identity} validate={validateforCollecter} />
                <AutocompleteInput source="sex" label="性別" choices={[
                    { id: 'U', name: '不明' },
                    { id: 'M', name: 'オス' },
                    { id: 'F', name: 'メス' },
                    { id: 'H', name: '両性' },
                    { id: 'I', name: '不確定' },
                    { id: 'T', name: '転移' },
                ]} />
                <AutocompleteInput source="preparation_type" label="標本の種類" choices={[
                    { id: 'dry specimens', name: '乾燥標本' },
                    { id: 'immersion specimens', name: '液浸標本' },
                ]} />
                <AutocompleteInput source="disposition" label="現在の標本の状況" choices={[
                    { id: 'in collection', name: '所蔵中' },
                    { id: 'missing', name: '紛失' },
                    { id: 'voucher elsewhere', name: '貸出中' },
                    { id: 'duplicates elsewhere', name: '他所に複製あり' },
                ]} />
                <TextInput source="sampling_protocol" label="採集方法" helperText='半角英数記号およびアクセント記号付き文字20字以内' parse={identity} validate={validateforSamplingProtocol} />
                <TextInput multiline source="sampling_effort" label="採集中の作業メモ" helperText='半角英数記号およびアクセント記号付き文字100字以内 改行可' parse={identity} validate={validateforSamplingEffort} />
                <TextInput source="lifestage" label="ライフステージ" defaultValue="adult" helperText='半角英数記号20字以内' parse={identity} validate={validateforLifeStage} />
                <TextInput source="establishment_means" label="生成プロセス(wildなど)" defaultValue="wild" helperText='半角英数記号20字以内' parse={identity} validate={validateforLifeStage} />
                <TextInput source="rights" label="ライセンス" defaultValue="CC BY" helperText='半角英数記号10字以内' parse={identity} validate={validateforRights} />
                <TextInput multiline source="note" label="備考" helperText='200字以内 改行可' resettable validate={minLength(0), maxLength(200)} />
            </FormTab>
            <FormTab label="分類情報">
                <ReferenceInput
                    source="custom_taxon_info"
                    label="登録されたカスタム分類情報"
                    reference="taxa/own-taxa"
                    perPage={15000}
                    suggestionLimit={100}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="scientific_name" helperText="属 種 亜種 和名 から検索  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true} />
                </ReferenceInput>
                <ReferenceInput
                    source="default_taxon_info"
                    label="登録されたデフォルト分類情報"
                    reference="taxa/shared-taxa"
                    perPage={15000}
                    suggestionLimit={100}
                    shouldRenderSuggestions={(val) => { return val.trim().length >= 5 }}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="scientific_name" helperText="属 種 亜種 和名 から検索    5文字以上入力してから検索が開始されます  データ量が非常に多いため表示や検索に時間がかかります  画面右上の読み込みアイコンが回転を停止するまでしばらくお待ちください  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true} />
                </ReferenceInput>
            </FormTab>
            <FormTab label="採集地点">
                <ReferenceInput
                    source="collect_point_info"
                    label="登録された採集地点"
                    reference="collect-points/own-collect-points"
                    perPage={15000}
                    suggestionLimit={100}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="japanese_place_name_detail" helperText="日本語地名(詳細)で検索  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true} />
                </ReferenceInput>
            </FormTab>
            <FormTab label="採集行">
                <ReferenceInput
                    source="tour"
                    label="登録された採集行"
                    reference="tours/own-tours"
                    perPage={15000}
                    suggestionLimit={100}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteInput optionText="title" helperText="採集行のタイトルで検索  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true} />
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