import * as React from "react";
import {
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
    ImageInput,
    ImageField,
    AutocompleteArrayInput,
    AutocompleteInput,
    ReferenceArrayInput,
    SelectArrayInput,
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
} from 'react-admin';
import { LeafletCoordinateInput} from '../../utils/leafletInput';
import { iso3166list } from './iso3166';
import Typography from '@material-ui/core/Typography';
import { SideMap } from './SideMap';


const identity = value => (value)

const CollectPointEditActions = ({ basePath, data}) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const validateASCII = [regex(/^[!-~ À-ÖØ-öø-ÿāīūēōȳĀĪŪĒŌȲ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(30)]
const validateASCIIforContient = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(20)]
const validateASCIIforIsland = [regex(/^[!-~ À-ÖØ-öø-ÿāīūēōȳĀĪŪĒŌȲ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(24)]
const validateASCIIforMunicipality = [regex(/^[!-~ À-ÖØ-öø-ÿāīūēōȳĀĪŪĒŌȲ]+$/, '半角英数記号およびアクセント記号付き文字のみにしてください'), minLength(0), maxLength(50)]


function formatImage(value) {
    if (!value ||  typeof value === "string") {
     return { url: value };
    } else {
      return value;
    }
}


const CollectPointEdit = (props) => (
    <Edit aside={<SideMap />} actions={<CollectPointEditActions/>} {...props} title="採集地点">
        <TabbedForm warnWhenUnsavedChanges>
            <FormTab label="緯度・経度・標高・水深">
                <NumberInput source="location.longitude" label="経度(10進数・度表記)" helperText="半角数字 小数点以下6桁まで可" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="location.latitude" label="緯度(10進数・度表記)" helperText="半角数字 小数点以下6桁まで可" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="minimum_elevation" label="最低標高(m)" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="maximum_elevation" label="最高標高(m)" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="coordinate_precision" label="採集地の範囲(m)" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="minimum_depth" label="水面からの最浅の距離(m)" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
                <NumberInput source="maximum_depth" label="水面からの最深の距離(m)" resettable defaultValue={0} validate={required("この項目は空にできません 不明な場合は0を入力してください")}/>
            </FormTab>
            <FormTab label="地名情報">
                <AutocompleteInput source="country" label="国名コード(ISO 3166-1)" helperText="ISO 3166-1準拠の半角英字2字の国名コード(リストから国名を選択すると自動入力されます)" resettable
                choices={iso3166list} validate={required("この項目は空にできません")} />
                <Typography variant='h6'>長音母音入力補助 コピペして使用してください: ā ī ū ē ō ȳ Ā Ī Ū Ē Ō Ȳ â î û ê ô Â Î Û Ê Ô</Typography>
                <TextInput source="contient" label="大陸" helperText="半角英数記号20字以内" parse={identity} resettable validate={validateASCIIforContient}/>
                <TextInput source="island_group" label="島群" helperText="半角英数記号およびアクセント記号付き文字30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="island" label="島" helperText="半角英数記号およびアクセント記号付き文字24字以内" parse={identity} resettable validate={validateASCIIforIsland}/>
                <TextInput source="state_provice" label="県(州)" helperText="半角英数記号およびアクセント記号付き文字30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="county" label="海外における群・区" helperText="半角英数記号およびアクセント記号付き文字30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="municipality" label="市名以下の詳細地名" helperText="半角英数記号およびアクセント記号付き文字50字以内 大地名から順にカンマ区切り" parse={identity} resettable validate={validateASCIIforMunicipality}/>
                <TextInput multiple source="verbatim_locality" label="採集地の説明" helperText="200字以内 改行可" parse={identity} resettable validate={[minLength(0), maxLength(200)]}/>
                <TextInput source="japanese_place_name" label="日本語地名(ラベル用)" helperText="14字以内" parse={identity} resettable validate={[minLength(0), maxLength(14)]}/>
                <TextInput source="japanese_place_name_detail" label="日本語地名(詳細)" helperText="50字以内 標本との紐付けの際の検索に利用されるので、検索しやすい内容にしてください" parse={identity} resettable validate={[minLength(0), maxLength(50), required("この項目は空にできません")]}/>
            </FormTab>
            <FormTab label="採集行情報">
                <ReferenceArrayInput
                    source="tour"
                    label="登録された採集行"
                    reference="tours/own-tours"
                    perPage={15000}
                    suggestionLimit={100}
                    filterToQuery={searchText => ({ q: searchText })}>
                    <AutocompleteArrayInput optionText="title" helperText="採集行のタイトルで検索  候補リストが最大100件まで表示されます" resettable={true} allowEmpty={true}/>
                </ReferenceArrayInput>
            </FormTab>
            <FormTab label="画像">
                <ImageInput format={formatImage} source="image1" label="画像" >
                    <ImageField source="url" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CollectPointEdit;