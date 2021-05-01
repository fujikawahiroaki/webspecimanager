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
    DateInput,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';


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
            {/* Add your custom actions */}
        </TopToolbar>
    );
};

const TourFilter = props => (
    <Filter {...props}>
        <TextInput label="タイトル" source="title" alwaysOn resettable />
        <DateInput label="開始日の範囲(入力年以降)" source="start_date_after" alwaysOn resettable />
        <DateInput label="開始日の範囲(入力年以前)" source="start_date_before" alwaysOn resettable />
        <DateInput label="終了日の範囲(入力年以降)" source="end_date_after" alwaysOn resettable />
        <DateInput label="終了日の範囲(入力年以前)" source="end_date_before" alwaysOn resettable />
        <DateInput label="作成日" source="created_at" alwaysOn resettable />
    </Filter>
);

const TourList = props => (
    <List {...props} title="採集行" actions={<TourListActions />} filters={<TourFilter />} perPage={20}
        sort={{ field: 'start_date', order: 'DESC' }}>
        <Datagrid >
            <TextField source="title" label="タイトル" />
            <DateField source="start_date" label="開始日" />
            <DateField source="end_date" label="終了日" />
            <DateField source="created_at" label="作成日" />
            <EditButton label="編集" />
            <ShowButton label="詳細" />
        </Datagrid>
    </List>
);

export default TourList;