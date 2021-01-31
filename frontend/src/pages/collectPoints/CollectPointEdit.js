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
import { GMapInput } from '@fusionworks/ra-google-maps-input';

const identity = value => (value)

const CollectPointEditActions = ({ basePath, data}) => (
    <TopToolbar>
        <ShowButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const validateASCII = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(30)]
const validateASCIIforContient = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(20)]
const validateASCIIforIsland = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(24)]
const validateASCIIforMunicipality = [regex(/^[!-~ ]+$/, '半角英数記号のみにしてください'), minLength(0), maxLength(50)]


function formatImage(value) {
    if (!value ||  typeof value === "string") {
     return { url: value };
    } else {
      return value;
    }
}


const CollectPointEdit = (props) => (
    <Edit actions={<CollectPointEditActions/>} {...props} title="採集地点">
        <TabbedForm>
            <FormTab label="地名情報">
                <AutocompleteInput source="country" label="国名コード(ISO 3166-1)" helperText="ISO 3166-1準拠の半角英字2字の国名コード" resettable
                choices={[
                    { id: 'JP', name: '日本' },
                ]}/>
                <TextInput source="contient" label="大陸" helperText="半角英数記号20字以内" parse={identity} resettable validate={validateASCIIforContient}/>
                <TextInput source="island_group" label="島群" helperText="半角英数記号30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="island" label="島" helperText="半角英数記号24字以内" parse={identity} resettable validate={validateASCIIforIsland}/>
                <TextInput source="state_provice" label="県(州)" helperText="半角英数記号30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="county" label="海外における群・区" helperText="半角英数記号30字以内" parse={identity} resettable validate={validateASCII}/>
                <TextInput source="municipality" label="市名以下の詳細地名" helperText="半角英数記号50字以内 大地名から順にカンマ区切り" parse={identity} resettable validate={validateASCIIforMunicipality}/>
                <TextInput multiple source="verbatim_locality" label="採集地の説明" helperText="200字以内 改行可" parse={identity} resettable validate={[minLength(0), maxLength(200)]}/>
                <TextInput source="japanese_place_name" label="日本語地名(ラベル用)" helperText="14字以内" parse={identity} resettable validate={[minLength(0), maxLength(14)]}/>
                <TextInput source="japanese_place_name_detail" label="日本語地名(詳細)" helperText="50字以内" parse={identity} resettable validate={[minLength(0), maxLength(50)]}/>
            </FormTab>
            <FormTab label="緯度・経度・標高・水深">
                <NumberInput source="location.longitude" label="経度" helperText="半角数字 小数点以下6桁まで可" resettable/>
                <NumberInput source="location.latitude" label="緯度" helperText="半角数字 小数点以下6桁まで可" resettable/>
                <NumberInput source="coordinate_precision" label="採集地の範囲(m)" resettable/>
                <NumberInput source="minimum_elevation" label="最低標高" resettable/>
                <NumberInput source="maximum_elevation" label="最高標高" resettable/>
                <NumberInput source="minimum_depth" label="水面からの最浅の距離" resettable/>
                <NumberInput source="maximum_depth" label="水面からの最深の距離" resettable/>
            </FormTab>
            <FormTab label="管理情報">
                <ReferenceArrayInput source="tour" reference="tours/own-tours" label="所属する採集行">
                    <SelectArrayInput optionText="title" />
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