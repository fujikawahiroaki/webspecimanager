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


const TourCreateActions = ({ basePath, data}) => (
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


const TourCreate = (props) => (
    <Create actions={<TourCreateActions/>} {...props} title="採集行">
        <TabbedForm>
            <FormTab label="基本情報">
                <TextInput source="title" label="タイトル"/>
                <DateInput source="start_date" label="開始日"/>
                <DateInput source="end_date" label="終了日"/>
                <DateInput source="created_at" label="作成日"/>
            </FormTab>
            <FormTab label="画像">
                <ImageInput format={formatImage} source="image1" label="画像" >
                    <ImageField source="url" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default TourCreate;