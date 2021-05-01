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
    BooleanField,
    TextField,
    NumberField,
    EditButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
    DateInput,
    BooleanInput,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import Typography from '@material-ui/core/Typography';
import {MakePDFButton} from './MakeLabelPDF';


const LabelListActions = (props) => {
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


const LabelFilter = props => (
    <Filter {...props}>
        <TextInput label="ラベル名" source="name" alwaysOn resettable/>
        <DateInput label="作成日" source="created_at" alwaysOn resettable/> 
    </Filter>
);

const LabelList = props => (
    <List {...props} title="ラベル" actions={<LabelListActions/>} filters={<LabelFilter />} perPage={20}
        sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid >
            <TextField source="name" label="ラベル名"/>
            <BooleanField source="data_label_flag" label="データラベル作成の可否"/>
            <BooleanField source="coll_label_flag" label="コレクションラベル作成の可否"/>
            <BooleanField source="det_label_flag" label="同定ラベル作成の可否"/>
            <BooleanField source="note_label_flag" label="備考ラベル作成の可否"/>
            <DateField source="created_at" label="作成日"/>
            <EditButton label="編集"/>
            <ShowButton label="詳細"/>
            <MakePDFButton label="ラベルPDF生成"/>
        </Datagrid>
    </List>
);

export default LabelList;