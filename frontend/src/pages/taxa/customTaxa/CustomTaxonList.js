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
    BooleanInput,
    Filter,
    NumberInput,
    DateInput,
    BooleanField,
    downloadCSV,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import jsonExport from 'jsonexport/dist';
import Typography from '@material-ui/core/Typography';


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
        <div>
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
                    maxResults={100000}
                    label="CSVをDL"
                />
                <ExportButton
                    disabled={total === 0}
                    resource={resource}
                    sort={currentSort}
                    filterValues={filterValues}
                    maxResults={100000}
                    label="Excel用CSVをDL"
                    exporter={exporterForExcel}
                />
            </TopToolbar>
            <Typography variant="body2">ノーマルCSVはBOMなしUTF-8、Excel用CSVはBOM付きUTF-8でエンコードされています。</Typography>
            <Typography variant="body2">検索条件に合うデータのみをダウンロードします。全データをダウンロードしたい場合、検索をかけないでください。</Typography>
        </div>
    );
};

const CustomTaxonFilter = props => (
    <Filter {...props}>
        <TextInput source="genus" label="属" alwaysOn resettable />
        <TextInput source="species" label="種" alwaysOn resettable />
        <TextInput source="subspecies" label="亜種" alwaysOn resettable />
        <TextInput source="japanese_name" label="和名" alwaysOn resettable />
        <TextInput source="subgenus" label="亜属" resettable />
        <TextInput source="scientific_name_author" label="記載者" resettable />
        <NumberInput source="name_publishedin_year_min" label="記載年の範囲(入力年以降)" resettable />
        <NumberInput source="name_publishedin_year_max" label="記載年の範囲(入力年以前)" resettable />
        <NumberInput source="actual_dist_year_min" label="記載実流通年の範囲(入力年以降)" resettable />
        <NumberInput source="actual_dist_year_max" label="記載実流通年の範囲(入力年以前)" resettable />
        <BooleanInput source="change_genus_brackets" label="属移動カッコの有無" resettable />
        <BooleanInput source="unknown_author_brackets" label="記載者不明角カッコの有無" resettable />
        <BooleanInput source="unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無" resettable />
        <TextInput source="kingdom" label="界" resettable />
        <TextInput source="phylum" label="門" resettable />
        <TextInput source="class_name" label="綱" resettable />
        <TextInput source="order" label="目" resettable />
        <TextInput source="suborder" label="亜目" resettable />
        <TextInput source="family" label="科" alwaysOn resettable />
        <TextInput source="subfamily" label="亜科" resettable />
        <TextInput source="tribe" label="族" resettable />
        <TextInput source="subtribe" label="亜族" resettable />
        <TextInput source="distribution" label="分布" resettable />
        <TextInput source="note" label="備考" resettable />
        <DateInput source="created_at" label="作成日" resettable />
    </Filter>
);


const taxaToJson = (taxa) => {
    const taxaForExport = taxa.map(taxon => {
        const taxonForExport = {
            kingdom: taxon.kingdom,
            phylum: taxon.phylum,
            class: taxon.class_name,
            order: taxon.order,
            suborder: taxon.suborder,
            family: taxon.family,
            subfamily: taxon.subfamily,
            tribe: taxon.tribe,
            subtribe: taxon.subtribe,
            genus: taxon.genus,
            subgenus: taxon.subgenus,
            species: taxon.species,
            subspecies: taxon.subspecies,
            scientific_name_author: taxon.scientific_name_author,
            name_publishedin_year: taxon.name_publishedin_year,
            actual_dist_year: taxon.actual_dist_year,
            change_genus_brackets: taxon.change_genus_brackets,
            unknown_author_brackets: taxon.unknown_author_brackets,
            unknown_name_publishedin_year_brackets: taxon.unknown_name_publishedin_year_brackets,
            japanese_name: taxon.japanese_name,
            distribution: taxon.distribution,
            created_at: taxon.created_at,
            note: taxon.note,
            image1: taxon.image1
        }
        return taxonForExport;
    });
    return taxaForExport;
};

const exporter = taxa => {
    jsonExport(taxaToJson(taxa), {
    }, (err, csv) => {
        downloadCSV(csv, 'custom_taxa');
    });
};

const exporterForExcel = taxa => {
    jsonExport(taxaToJson(taxa), {
    }, (err, csv) => {
        downloadCSV(new Blob(["\uFEFF", csv], { type: 'application/octet-stream' }), 'custom_taxa_for_excel');
    });
};

const CustomTaxonList = props => (
    <List {...props} empty={false} title="カスタム分類情報" actions={<CustomTaxonListActions />} filters={<CustomTaxonFilter />} perPage={20}
        sort={{ field: 'family', order: 'DESC' }} exporter={exporter}>
        <CustomizableDatagrid defaultColumns={['family', 'genus', 'species', 'subspecies', 'scientific_name_author',
            'name_publishedin_year', 'change_genus_brackets', 'japanese_name']}>
            <TextField source="family" label="科" />
            <TextField source="genus" label="属" />
            <TextField source="subgenus" label="亜属" />
            <TextField source="species" label="種" />
            <TextField source="subspecies" label="亜種" />
            <TextField source="scientific_name_author" label="記載者" />
            <TextField source="name_publishedin_year" label="記載年" />
            <TextField source="actual_dist_year" label="記載実流通年" />
            <BooleanField source='change_genus_brackets' label='属移動カッコの有無' />
            <BooleanField source='unknown_author_brackets' label='記載者不明角カッコの有無' />
            <BooleanField source='unknown_name_publishedin_year_brackets' label='記載年不明角カッコの有無' />
            <TextField source="japanese_name" label="和名" />
            <TextField source="kingdom" label="界" />
            <TextField source="phylum" label="門" />
            <TextField source="class_name" label="綱" />
            <TextField source="order" label="目" />
            <TextField source="suborder" label="亜目" />
            <TextField source="subfamily" label="亜科" />
            <TextField source="tribe" label="族" />
            <TextField source="subtribe" label="亜族" />
            <TextField source="distribution" label="分布" />
            <TextField source="note" label="備考" />
            <DateField source="created_at" label="作成日" />
            <EditButton label="編集" />
            <CloneButton label="これをベースに作成" />
            <ShowButton label="詳細" />
        </CustomizableDatagrid>
    </List>
);

export default CustomTaxonList;