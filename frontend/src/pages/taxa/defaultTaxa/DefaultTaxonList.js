import * as React from 'react';
import { cloneElement, useMemo } from 'react';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    ExportButton,
    Button,
    sanitizeListRestProps,
    EditActions,
    DeleteButton,
    BulkDeleteButton,
    ListButton,
    Tab,
    ShowActions,
    Show,
    ShowButton,
    SimpleShowLayout,
    TabbedShowLayout,
    RichTextField,
    DateField,
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    NumberField,
    EditButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    NumberInput,
    Filter,
    DateInput,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import CustomizableDatagrid from 'ra-customizable-datagrid';



const DefaultTaxonListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
            {/* Add your Default actions */}
        </TopToolbar>
    );
};

const DefaultTaxonFilter = props => (
    <Filter {...props}>
        <TextInput source="genus" label="属" alwaysOn />
        <TextInput source="species" label="種" alwaysOn/>
        <TextInput source="subspecies" label="亜種" alwaysOn/>
        <TextInput source="japanese_name" label="和名" alwaysOn/>
        <TextInput source="subgenus" label="亜属" resettable/>
        <TextInput source="scientific_name_author" label="記載者" resettable/>
        <NumberInput source="name_publishedin_year" label="記載年"resettable/>
        <TextInput source="kingdom" label="界" resettable/>
        <TextInput source="phylum" label="門" resettable/>
        <TextInput source="class_name" label="綱" resettable/>
        <TextInput source="order" label="目" resettable/>
        <TextInput source="suborder" label="亜目" resettable/>
        <TextInput source="family" label="科" resettable/>
        <TextInput source="subfamily" label="亜科" resettable/>
        <TextInput source="tribe" label="族" resettable/>
        <TextInput source="subtribe" label="亜族" resettable/>
        <TextInput source="distribution" label="分布" resettable/>
        <TextInput source="note" label="備考" resettable/>
        <DateInput source="created_at" label="作成日"/>
    </Filter>
);

const DefaultTaxonList = props => (
    <List {...props} title="デフォルト分類情報" actions={<DefaultTaxonListActions/>} filters={<DefaultTaxonFilter />} perPage={20}
        sort={{ field: 'genus', order: 'DESC' }}>
        <CustomizableDatagrid defaultColumns={['genus', 'subgenus', 'species', 'subspecies', 'scientific_name_author',
                                               'name_publishedin_year', 'japanese_name']}>
            <TextField source="genus" label="属"/>
            <TextField source="subgenus" label="亜属"/>
            <TextField source="species" label="種"/>
            <TextField source="subspecies" label="亜種"/>
            <TextField source="scientific_name_author" label="記載者"/>
            <NumberField source="name_publishedin_year" label="記載年"/>
            <TextField source="japanese_name" label="和名"/>
            <TextField source="kingdom" label="界" />
            <TextField source="phylum" label="門" />
            <TextField source="class_name" label="綱" />
            <TextField source="order" label="目" />
            <TextField source="suborder" label="亜目" />
            <TextField source="family" label="科" />
            <TextField source="subfamily" label="亜科" />
            <TextField source="tribe" label="族" />
            <TextField source="subtribe" label="亜族" />
            <TextField source="distribution" label="分布" />
            <TextField source="note" label="備考" />
            <DateField source="created_at" label="作成日"/>
            <ShowButton label="詳細"/>
        </CustomizableDatagrid>
    </List>
);

export default DefaultTaxonList;