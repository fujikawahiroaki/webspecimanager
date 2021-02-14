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
        <TextInput source="default_taxon_info__genus" label="属(デフォルト分類情報)" alwaysOn resettable/>
        <TextInput source="default_taxon_info__species" label="種(デフォルト分類情報)" alwaysOn resettable/>
        <TextInput source="default_taxon_info__subspecies" label="亜種(デフォルト分類情報)" alwaysOn resettable/>
        <TextInput source="default_taxon_info__japanese_name" label="和名(デフォルト分類情報)" alwaysOn resettable/>
        <TextInput source="default_taxon_info__subgenus" label="亜属(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__scientific_name_author" label="記載者(デフォルト分類情報)" resettable/>
        <NumberInput source="default_taxon_info__name_publishedin_year_min" label="記載年の範囲(入力年以降)(デフォルト分類情報)" resettable/>
        <NumberInput source="default_taxon_info__name_publishedin_year_max" label="記載年の範囲(入力年以前)(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__kingdom" label="界(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__phylum" label="門(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__class_name" label="綱(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__order" label="目(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__suborder" label="亜目(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__family" label="科(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__subfamily" label="亜科(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__tribe" label="族(デフォルト分類情報)" resettable/>
        <TextInput source="default_taxon_info__subtribe" label="亜族(デフォルト分類情報)" resettable/>
        <TextInput source="custom_taxon_info__genus" label="属(カスタム分類情報)" alwaysOn resettable/>
        <TextInput source="custom_taxon_info__species" label="種(カスタム分類情報)" alwaysOn resettable/>
        <TextInput source="custom_taxon_info__subspecies" label="亜種(カスタム分類情報)" alwaysOn resettable/>
        <TextInput source="custom_taxon_info__japanese_name" label="和名(カスタム分類情報)" alwaysOn resettable/>
        <TextInput source="custom_taxon_info__subgenus" label="亜属(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__scientific_name_author" label="記載者(カスタム分類情報)" resettable/>
        <NumberInput source="custom_taxon_info__name_publishedin_year_min" label="記載年の範囲(入力年以降)(カスタム分類情報)" resettable/>
        <NumberInput source="custom_taxon_info__name_publishedin_year_max" label="記載年の範囲(入力年以前)(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__kingdom" label="界(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__phylum" label="門(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__class_name" label="綱(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__order" label="目(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__suborder" label="亜目(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__family" label="科(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__subfamily" label="亜科(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__tribe" label="族(カスタム分類情報)" resettable/>
        <TextInput source="custom_taxon_info__subtribe" label="亜族(カスタム分類情報)" resettable/>
        <TextInput source="collect_point_info__country" label="国名コード(ISO 3166-1)" alwaysOn resettable/>
        <TextInput source="collect_point_info__contient" label="大陸"  resettable/>
        <TextInput source="collect_point_info__island_group" label="島群" resettable/>
        <TextInput source="collect_point_info__island" label="島" alwaysOn resettable/>
        <TextInput source="collect_point_info__state_provice" label="県(州)" alwaysOn resettable/>
        <TextInput source="collect_point_info__county" label="海外における群・区" resettable/>
        <TextInput source="collect_point_info__municipality" label="市名以下の詳細地名" alwaysOn resettable/>
        <TextInput source="collect_point_info__verbatim_locality" label="採集地の説明" resettable/>
        <TextInput source="collect_point_info__japanese_place_name" label="日本語地名(ラベル用)" alwaysOn resettable/>
        <TextInput source="collect_point_info__japanese_place_name_detail" label="日本語地名(詳細)" resettable/>
        <NumberInput source="longitude" label="経度(指定座標から指定半径m内にある地点を探すセット検索1/3)" alwaysOn resettable/>
        <NumberInput source="latitude" label="緯度(指定座標から指定半径m内にある地点を探すセット検索2/3)" alwaysOn resettable/>
        <NumberInput source="radius" label="半径(指定座標から指定半径m内にある地点を探すセット検索3/3)" alwaysOn resettable/>
        <NumberInput source="collect_point_info__longitude__range_min" label="経度の範囲(入力値以上)"  resettable/>
        <NumberInput source="collect_point_info__longitude__range_max" label="経度の範囲(入力値以下)"  resettable/>
        <NumberInput source="collect_point_info__latitude__range_min" label="緯度の範囲(入力値以上)"  resettable/>
        <NumberInput source="collect_point_info__latitude__range_max" label="緯度の範囲(入力値以下)"  resettable/>
        <NumberInput source="collect_point_info__coordinate_precision_min" label="採集地の範囲(入力値以上)" resettable/>
        <NumberInput source="collect_point_info__coordinate_precision_max" label="採集地の範囲(入力値以下)" resettable/>
        <NumberInput source="collect_point_info__minimum_elevation_min" label="最低標高の範囲(入力値以上)" resettable/>
        <NumberInput source="collect_point_info__minimum_elevation_max" label="最低標高の範囲(入力値以下)" resettable/>
        <NumberInput source="collect_point_info__maximum_elevation_min" label="最高標高の範囲(入力値以上)" resettable/>
        <NumberInput source="collect_point_info__maximum_elevation_max" label="最高標高の範囲(入力値以下)" resettable/>
        <NumberInput source="collect_point_info__minimum_depth_min" label="水面からの最浅の距離の範囲(入力値以上)" resettable/>
        <NumberInput source="collect_point_info__minimum_depth_max" label="水面からの最浅の距離の範囲(入力値以下)" resettable/>
        <NumberInput source="collect_point_info__maximum_depth_min" label="水面からの最深の距離の範囲(入力値以上)" resettable/>
        <NumberInput source="collect_point_info__maximum_depth_max" label="水面からの最深の距離(入力値以下)" resettable/>
        <TextInput label="採集行のタイトル" source="tour__title" resettable/>
        <TextInput label="コレクション名" source="collection_settings_info__collection_name" resettable/>
        <TextInput label="機関コード" source="collection_settings_info__institution_code" resettable/>
        <TextInput source="collection_code" label="標本ID" resettable/>
        <TextInput source="identified_by" label="同定者" resettable/>
        <DateInput source="date_identified" label="同定年月日" resettable/>
        <TextInput source="collecter" label="採集者" resettable/>
        <TextInput source="year_min" label="採集年の範囲(入力年以降)" resettable/>
        <TextInput source="year_max" label="採集年の範囲(入力年以前)" resettable/>
        <TextInput source="month_min" label="採集月の範囲(入力月以降)" resettable/>
        <TextInput source="month_max" label="採集月の範囲(入力月以前)" resettable/>
        <TextInput source="day_min" label="採集日の範囲(入力日以降)" resettable/>
        <TextInput source="day_max" label="採集日の範囲(入力日以前)" resettable/>
        <TextInput source="sex" label="性別" resettable/>
        <TextInput source="preparation_type" label="標本の種類" resettable/>
        <TextInput source="disposition" label="現在の標本の状況" resettable/>
        <TextInput source="sampling_protocol" label="採集方法" resettable/>
        <TextInput source="sampling_effort" label="採集中の作業メモ" resettable/>
        <TextInput source="lifestage" label="ライフステージ" resettable/>
        <TextInput source="establishment_means" label="生成プロセス" resettable/>
        <TextInput source="rights" label="ライセンス" resettable/>
        <TextInput source="note" label="備考" resettable/>
        <DateInput source="date_last_modified" label="作成日" resettable/>
    </Filter>
);

const SpecimenList = props => (
    <List {...props} title="標本" actions={<SpecimenListActions/>} filters={<SpecimenFilter />} perPage={20}
        sort={{ field: 'date_last_modified', order: 'DESC' }}>
        <CustomizableDatagrid defaultColumns={['institution_code', 'collection_code',
                                               'genus', 'species', 'year', 'month', 'day',
                                               'state_provice', 'municipality', 'japanese_place_name']}>
            <TextField source="institution_code" label="機関コード"/>
            <TextField source="collection_code" label="標本ID"/>
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
            <TextField source="family" label="科" />
            <TextField source="subfamily" label="亜科" />
            <TextField source="tribe" label="族" />
            <TextField source="subtribe" label="亜族" />
            <TextField source="country" label="国名コード(ISO 3166-1)"/>
            <TextField source="contient" label="大陸"/>
            <TextField source="island_group" label="島群"/>
            <TextField source="island" label="島"/>
            <TextField source="state_provice" label="県(州)"/>
            <TextField source="county" label="海外における群・区"/>
            <TextField source="municipality" label="市名以下の詳細地名"/>
            <TextField source="verbatim_locality" label="採集地の説明"/>
            <TextField source="japanese_place_name" label="日本語地名(ラベル用)"/>
            <TextField source="japanese_place_name_detail" label="日本語地名(詳細)"/>
            <NumberField source="longitude" label="経度"/>
            <NumberField source="latitude" label="緯度"/>
            <NumberField source="coordinate_precision" label="採集地の範囲"/>
            <NumberField source="minimum_elevation" label="最低標高"/>
            <NumberField source="maximum_elevation" label="最高標高"/>
            <NumberField source="minimum_depth" label="水面からの最浅の距離"/>
            <NumberField source="maximum_depth" label="水面からの最深の距離"/>
            <TextField source="title" label="採集行のタイトル"/>
            <TextField source="collection_name" label="コレクション名"/>
            <TextField source="identified_by" label="同定者"/>
            <DateField source="date_identified" label="同定年月日"/>
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