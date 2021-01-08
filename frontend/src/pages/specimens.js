import * as React from 'react';
import { cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    ExportButton,
    Button,
    sanitizeListRestProps,
    EditActions,
    DeleteButton,
    Tab,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import {
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

export const SpecimenList = props => (
    <List {...props} title="標本" actions={<SpecimenListActions/>} filters={<SpecimenFilter />} perPage={20}
        sort={{ field: 'collection_code', order: 'DESC' }}>
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

export const SpecimenEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            
        </SimpleForm>
    </Edit>
);

const SpecimenShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const SpecimenShow = props => (
    <Show {...props} title="標本" actions={<SpecimenShowActions/>}>
        <TabbedShowLayout>
            <Tab label='管理情報'>
                <TextField source="collection_name" />
                <TextField source="institution_code" />
                <NumberField source="collection_code" />
                <TextField source="collection_settings_info.id" />
                <DateField source="date_last_modified" />
                <TextField source="preparation_type" />
                <TextField source="disposition" />
                <TextField source="rights" />
                <TextField source="note" />
            </Tab>
            <Tab label='分類情報'>
                <TextField source="collect_point_info.id" />
                <TextField source="custom_taxon_info.id" />
                <DateField source="date_identified" />
                <TextField source="identified_by" />
                <TextField source="sex" />
                <TextField source="lifestage" />
                <TextField source="establishment_means" />
            </Tab>
            <Tab label='採集情報'>
                <NumberField source="year" />
                <NumberField source="month" />
                <NumberField source="day" />
                <TextField source="collecter" />
                <TextField source="sampling_protocol" />
                <TextField source="sampling_effort" />
                <TextField source="tour" />
            </Tab>
            <Tab label='画像'>
                <TextField source="image1" />
                <TextField source="image2" />
                <TextField source="image3" />
                <TextField source="image4" />
                <TextField source="image5" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);