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
    EditButton,
    ImageInput
} from 'react-admin';

const CustomTaxonEdit = (props) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="下位分類・和名">
                <TextInput source="genus" />
                <TextInput source="subgenus" />
                <TextInput source="species" />
                <TextInput source="subspecies" />
                <TextInput source="scientific_name_author" />
                <NumberInput source="name_publishedin_year" />
                <TextInput source="japanese_name" />
                <TextInput source="distribution" />
            </FormTab>
            <FormTab label="上位分類">
                <TextInput source="kingdom" />
                <TextInput source="phylum" />
                <TextInput source="class_name" />
                <TextInput source="order" />
                <TextInput source="suborder" />
                <TextInput source="family" />
                <TextInput source="subfamily" />
                <TextInput source="tribe" />
                <TextInput source="subtribe" />
            </FormTab>
            <FormTab label="分布・備考">
                <TextInput source="distribution" />
                <TextInput source="note" />
            </FormTab>
            <FormTab label="画像">
                <ImageInput source="image1" />
                <ImageInput source="image2" />
                <ImageInput source="image3" />
                <ImageInput source="image4" />
                <ImageInput source="image5" />

            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CustomTaxonEdit;