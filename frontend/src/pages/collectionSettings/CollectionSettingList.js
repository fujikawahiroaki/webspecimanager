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
    NumberInput,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';


const CollectionSettingListActions = (props) => {
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

const CollectionSettingFilter = props => (
    <Filter {...props}>
        <TextInput label="コレクション名" source="collection_name" alwaysOn resettable/>
        <TextInput label="機関コード" source="institution_code" alwaysOn resettable/>
        <NumberInput label="標本IDの最新番号の範囲(入力値以上)" source="latest_collection_code_min" alwaysOn resettable/>
        <NumberInput label="標本IDの最新番号の範囲(入力値以下)" source="latest_collection_code_max" alwaysOn resettable/>
        <DateInput label="作成日" source="created_at" alwaysOn resettable/> 
    </Filter>
);

const CollectionSettingList = props => (
    <List {...props} empty={false} title="コレクション設定" actions={<CollectionSettingListActions/>} filters={<CollectionSettingFilter />} perPage={20}
        sort={{ field: 'institution_code', order: 'DESC' }}>
        <Datagrid >
            <TextField source="collection_name" label="コレクション名"/>
            <TextField source="institution_code" label="機関コード"/>
            <NumberField source="latest_collection_code" label="標本IDの最新番号"/>
            <DateField source="created_at" label="作成日"/>
            <EditButton label="編集"/>
            <ShowButton label="詳細"/>
        </Datagrid>
    </List>
);

export default CollectionSettingList;