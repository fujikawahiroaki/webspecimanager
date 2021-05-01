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
            <Typography>　</Typography>
            <Typography>CSVの文字コードはutf-8なので、Excelでそのまま読み込むとデータが崩れます。対処法は「Excel csv 文字化け」で検索</Typography>
            <Typography>　</Typography>
            <Typography>検索条件に合うデータのみをダウンロードします。全データをダウンロードしたい場合、検索をかけないでください。</Typography>
            {/* Add your custom actions */}
        </TopToolbar>
    );
};

const CustomTaxonFilter = props => (
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


const exporter = taxa => {
    const taxaForExport = taxa.map(taxon => {
        const {id, scientific_name, is_private, image2, image3, image4, image5, ...taxonForExport } = taxon; // 除外する項目
        return taxonForExport;
    });
    jsonExport(taxaForExport, {
    }, (err, csv) => {
        downloadCSV(csv, 'custom_taxa');
    });
};

const CustomTaxonList = props => (
    <List {...props} title="カスタム分類情報" actions={<CustomTaxonListActions/>} filters={<CustomTaxonFilter />} perPage={20}
        sort={{ field: 'family', order: 'DESC' }} exporter={exporter}>
        <CustomizableDatagrid defaultColumns={['family', 'genus', 'species', 'subspecies', 'scientific_name_author',
                                               'name_publishedin_year', 'japanese_name']}>
            <TextField source="family" label="科" />
            <TextField source="genus" label="属"/>
            <TextField source="subgenus" label="亜属"/>
            <TextField source="species" label="種"/>
            <TextField source="subspecies" label="亜種"/>
            <TextField source="scientific_name_author" label="記載者"/>
            <TextField source="name_publishedin_year" label="記載年"/>
            <TextField source="japanese_name" label="和名"/>
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
            <DateField source="created_at" label="作成日"/>
            <EditButton label="編集" />
            <CloneButton label="これをベースに作成"/>
            <ShowButton label="詳細"/>
        </CustomizableDatagrid>
    </List>
);

export default CustomTaxonList;