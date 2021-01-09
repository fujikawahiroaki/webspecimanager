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
    Filter,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';


const CustomTaxonListActions = (props) => {
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
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
            {/* Add your custom actions */}
        </TopToolbar>
    );
};

const CustomTaxonFilter = props => (
    <Filter {...props}>
        <TextInput label="検索" source="q" alwaysOn />
    </Filter>
);

const CustomTaxonList = props => (
    <List {...props} title="分類情報(カスタム)" actions={<CustomTaxonListActions/>} filters={<CustomTaxonFilter />} perPage={20}
        sort={{ field: 'genus', order: 'DESC' }}>
        <Datagrid >
            <TextField source="genus" label="属"/>
            <TextField source="subgenus" label="亜属"/>
            <TextField source="species" label="種"/>
            <TextField source="subspecies" label="亜種"/>
            <TextField source="scientific_name_author" label="記載者"/>
            <NumberField source="name_publishedin_year" label="記載年"/>
            <TextField source="japanese_name" label="和名"/>
            <TextField source="order" label="目"/>
            <TextField source="suborder" label="亜目"/>
            <TextField source="family" label="科"/>
            <TextField source="subfamily" label="亜科"/>
            <TextField source="tribe" label="族"/>
            <TextField source="subtribe" label="亜族"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export default CustomTaxonList;