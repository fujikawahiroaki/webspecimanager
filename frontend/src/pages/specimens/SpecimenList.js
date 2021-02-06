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
    CloneButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    SearchInput,
    Filter,
    NumberInput,
    DateInput,
    BooleanField,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import CustomizableDatagrid from 'ra-customizable-datagrid';


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
        </TopToolbar>
    );
};

const SpecimenFilter = props => (
    <Filter {...props}>
        <TextInput source="genus" label="属" alwaysOn resettable/>
        <TextInput source="species" label="種" alwaysOn resettable/>
        <TextInput source="subspecies" label="亜種" alwaysOn resettable/>
        <TextInput source="japanese_name" label="和名" alwaysOn resettable/>
        <TextInput source="subgenus" label="亜属" resettable/>
        <TextInput source="scientific_name_author" label="記載者" resettable/>
        <NumberInput source="name_publishedin_year_min" label="記載年の範囲(入力年以降)" resettable/>
        <NumberInput source="name_publishedin_year_max" label="記載年の範囲(入力年以前)" resettable/>
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
        <DateInput source="created_at" label="作成日" resettable/>
    </Filter>
);

const SpecimenList = props => (
    <List {...props} title="標本" actions={<SpecimenListActions/>} filters={<SpecimenFilter />} perPage={20}
        sort={{ field: 'date_last_modified', order: 'DESC' }}>
        <CustomizableDatagrid defaultColumns={['collection_name']}>
            <TextField source="genus" label="属"/>
            <TextField source="collection_name" label="コレクション名のフルネーム"/>
            <TextField source="institution_code" label="機関コード"/>
            <TextField source="collection_code" label="標本ID"/>
            <TextField source="identified_by" label="同定者"/>
            <DateField source="identified_year" label="同定年月日"/>
            <TextField source="collecter" label="採集者"/>
            <TextField source="year" label="採集年"/>
            <TextField source="month" label="採集月"/>
            <TextField source="day" label="採集日"/>
            <TextField source="sex" label="性別"/>
            <TextField source="preparation_type" label="標本の種類"/>
            <TextField source="disposition" label="現在の標本の状況"/>
            <TextField source="sampling_protocol" label="採集方法"/>
            <TextField source="sampling_effort" label="採集中の作業メモ"/>
            <TextField source="lifestage" label="ライフステージ"/>
            <TextField source="establishment_means" label="生成プロセス"/>
            <TextField source="rights" label="ライセンス"/>
            <TextField source="note" label="備考" />
            <DateField source="date_last_modified" label="作成日"/>
            <EditButton label="編集" />
            <CloneButton label="これをベースに作成"/>
            <ShowButton label="詳細"/>
        </CustomizableDatagrid>
    </List>
);

export default SpecimenList;