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


const SpecimenListActions = (props) => {
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
            <Button
                onClick={() => { alert('未実装'); }}
                label="ラベル作成"
            >
                <IconEvent />
            </Button>
        </TopToolbar>
    );
};

const SpecimenFilter = props => (
    <Filter {...props}>
        <TextInput label="検索" source="q" alwaysOn />
    </Filter>
);

const SpecimenList = props => (
    <List {...props} title="標本" actions={<SpecimenListActions/>} filters={<SpecimenFilter/>} perPage={20}
        sort={{ field: 'collection_code', order: 'DESC' }} >
        <Datagrid >
            <TextField source="institution_code" label="機関コード" />
            <NumberField source="collection_code" label="標本番号"/>
            <ReferenceField source="custom_taxon_info.id" label="属" reference="taxa/own-taxa" >
                <TextField source="genus" />
            </ReferenceField>
            <ReferenceField source="custom_taxon_info.id" label="種" reference="taxa/own-taxa" >
                <TextField source="species" />
            </ReferenceField>
            <NumberField source="year" label="採集年" />
            <NumberField source="month" label="採集月"/>
            <NumberField source="day" label="採集日"/>
            <TextField source="collecter" label="採集者" />
            <ReferenceField source="collect_point_info.id" label="採集地点" reference="collect-points/own-collect-points" >
                <TextField source="japanese_place_name" />
            </ReferenceField>
            <TextField source="sex" label="性別"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export default SpecimenList;