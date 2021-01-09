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


const TourListActions = (props) => {
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

const TourFilter = props => (
    <Filter {...props}>
        <TextInput label="検索" source="q" alwaysOn />
    </Filter>
);

const TourList = props => (
    <List {...props} title="採集行" actions={<TourListActions/>} filters={<TourFilter />} perPage={20}
        sort={{ field: 'start_date', order: 'DESC' }} bulkActionButtons={<BulkDeleteButton/>}>
        <Datagrid >
        <TextField source="id" />
            <DateField source="created_at" />
            <TextField source="title" />
            <DateField source="start_date" />
            <DateField source="end_date" />
            <TextField source="track" />
            <TextField source="note" />
            <TextField source="image1" />
            <TextField source="image2" />
            <TextField source="image3" />
            <TextField source="image4" />
            <TextField source="image5" />
            <TextField source="specimens.id" />
            <TextField source="collect_points.id" />
        </Datagrid>
    </List>
);

export default TourList;