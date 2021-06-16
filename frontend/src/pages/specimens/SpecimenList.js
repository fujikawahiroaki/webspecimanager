import * as React from 'react';
import { cloneElement, useMemo, useState, useEffect, Fragment } from 'react';
import {
    useListContext,
    useDataProvider,
    Title,
    TopToolbar,
    Pagination,
    ListBase,
    ListToolbar,
    BulkActionsToolbar,
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
    BooleanField,
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
    downloadCSV,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import jsonExport from 'jsonexport/dist';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


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
                maxResults={100000}
                label="CSVをDL"
            />
            <Typography>　</Typography>
            <Typography>CSVの文字コードはutf-8なので、Excelでそのまま読み込むとデータが崩れます。対処法は「Excel csv 文字化け」で検索</Typography>
            <Typography>　</Typography>
            <Typography>検索条件に合うデータのみをダウンロードします。全データをダウンロードしたい場合、検索をかけないでください。</Typography>
        </TopToolbar>
    );
};

const SpecimenFilter = props => (
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
        <TextInput source="family" label="科" resettable />
        <TextInput source="subfamily" label="亜科" resettable />
        <TextInput source="tribe" label="族" resettable />
        <TextInput source="subtribe" label="亜族" resettable />
        <TextInput source="collect_point_info__country" label="国名コード(ISO 3166-1)" resettable />
        <TextInput source="collect_point_info__contient" label="大陸" resettable />
        <TextInput source="collect_point_info__island_group" label="島群" resettable />
        <TextInput source="collect_point_info__island" label="島" alwaysOn resettable />
        <TextInput source="collect_point_info__state_provice" label="県(州)" alwaysOn resettable />
        <TextInput source="collect_point_info__county" label="海外における群・区" resettable />
        <TextInput source="collect_point_info__municipality" label="市名以下の詳細地名" resettable />
        <TextInput source="collect_point_info__verbatim_locality" label="採集地の説明" resettable />
        <TextInput source="collect_point_info__japanese_place_name" label="日本語地名(ラベル用)" resettable />
        <TextInput source="collect_point_info__japanese_place_name_detail" label="日本語地名(詳細)" alwaysOn resettable />
        <NumberInput source="longitude" label="経度(指定座標から指定半径m内にある地点を探すセット検索1/3)" alwaysOn resettable />
        <NumberInput source="latitude" label="緯度(指定座標から指定半径m内にある地点を探すセット検索2/3)" alwaysOn resettable />
        <NumberInput source="radius" label="半径(指定座標から指定半径m内にある地点を探すセット検索3/3)" alwaysOn resettable />
        <NumberInput source="collect_point_info__longitude__range_min" label="経度の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__longitude__range_max" label="経度の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__latitude__range_min" label="緯度の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__latitude__range_max" label="緯度の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__coordinate_precision_min" label="採集地の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__coordinate_precision_max" label="採集地の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__minimum_elevation_min" label="最低標高の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__minimum_elevation_max" label="最低標高の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__maximum_elevation_min" label="最高標高の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__maximum_elevation_max" label="最高標高の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__minimum_depth_min" label="水面からの最浅の距離の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__minimum_depth_max" label="水面からの最浅の距離の範囲(入力値以下)" resettable />
        <NumberInput source="collect_point_info__maximum_depth_min" label="水面からの最深の距離の範囲(入力値以上)" resettable />
        <NumberInput source="collect_point_info__maximum_depth_max" label="水面からの最深の距離(入力値以下)" resettable />
        <TextInput label="採集行のタイトル" source="tour__title" resettable />
        <TextInput label="コレクション名" source="collection_settings_info__collection_name" resettable />
        <TextInput label="機関コード" source="collection_settings_info__institution_code" resettable />
        <TextInput source="collection_code" label="標本ID" resettable />
        <TextInput source="identified_by" label="同定者" resettable />
        <DateInput source="date_identified_after" label="同定年月日の範囲(入力日以降)" resettable />
        <DateInput source="date_identified_before" label="同定年月日の範囲(入力日以前)" resettable />
        <TextInput source="collecter" label="採集者" resettable />
        <TextInput source="year_min" label="採集年の範囲(入力年以降)" resettable />
        <TextInput source="year_max" label="採集年の範囲(入力年以前)" resettable />
        <TextInput source="month_min" label="採集月の範囲(入力月以降)" resettable />
        <TextInput source="month_max" label="採集月の範囲(入力月以前)" resettable />
        <TextInput source="day_min" label="採集日の範囲(入力日以降)" resettable />
        <TextInput source="day_max" label="採集日の範囲(入力日以前)" resettable />
        <TextInput source="sex" label="性別" resettable />
        <TextInput source="preparation_type" label="標本の種類" resettable />
        <TextInput source="disposition" label="現在の標本の状況" resettable />
        <TextInput source="sampling_protocol" label="採集方法" resettable />
        <TextInput source="sampling_effort" label="採集中の作業メモ" resettable />
        <TextInput source="lifestage" label="ライフステージ" resettable />
        <TextInput source="establishment_means" label="生成プロセス" resettable />
        <TextInput source="rights" label="ライセンス" resettable />
        <TextInput source="note" label="備考" resettable />
        <DateInput source="date_last_modified_after" label="作成日の範囲(入力日以降)" resettable />
        <DateInput source="date_last_modified_before" label="作成日の範囲(入力日以前)" resettable />
        <TextInput source="default_taxon_info__genus" label="属(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__species" label="種(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__subspecies" label="亜種(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__japanese_name" label="和名(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__subgenus" label="亜属(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__scientific_name_author" label="記載者(デフォルト分類情報)" resettable />
        <NumberInput source="default_taxon_info__name_publishedin_year_min" label="記載年の範囲(入力年以降)(デフォルト分類情報)" resettable />
        <NumberInput source="default_taxon_info__name_publishedin_year_max" label="記載年の範囲(入力年以前)(デフォルト分類情報)" resettable />
        <NumberInput source="default_taxon_info__actual_dist_year_min" label="記載実流通年の範囲(入力年以降)(デフォルト分類情報)" resettable />
        <NumberInput source="default_taxon_info__actual_dist_year_max" label="記載実流通年の範囲(入力年以前)(デフォルト分類情報)" resettable />
        <BooleanInput source="default_taxon_info__change_genus_brackets" label="属移動カッコの有無(デフォルト分類情報)" resettable />
        <BooleanInput source="default_taxon_info__unknown_author_brackets" label="記載者不明角カッコの有無(デフォルト分類情報)" resettable />
        <BooleanInput source="default_taxon_info__unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__kingdom" label="界(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__phylum" label="門(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__class_name" label="綱(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__order" label="目(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__suborder" label="亜目(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__family" label="科(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__subfamily" label="亜科(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__tribe" label="族(デフォルト分類情報)" resettable />
        <TextInput source="default_taxon_info__subtribe" label="亜族(デフォルト分類情報)" resettable />
        <TextInput source="custom_taxon_info__genus" label="属(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__species" label="種(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__subspecies" label="亜種(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__japanese_name" label="和名(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__subgenus" label="亜属(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__scientific_name_author" label="記載者(カスタム分類情報)" resettable />
        <NumberInput source="custom_taxon_info__name_publishedin_year_min" label="記載年の範囲(入力年以降)(カスタム分類情報)" resettable />
        <NumberInput source="custom_taxon_info__name_publishedin_year_max" label="記載年の範囲(入力年以前)(カスタム分類情報)" resettable />
        <NumberInput source="custom_taxon_info__actual_dist_year_min" label="記載実流通年の範囲(入力年以降)(カスタム分類情報)" resettable />
        <NumberInput source="custom_taxon_info__actual_dist_year_max" label="記載実流通年の範囲(入力年以前)(カスタム分類情報)" resettable />
        <BooleanInput source="custom_taxon_info__change_genus_brackets" label="属移動カッコの有無(カスタム分類情報)" resettable />
        <BooleanInput source="custom_taxon_info__unknown_author_brackets" label="記載者不明角カッコの有無(カスタム分類情報)" resettable />
        <BooleanInput source="custom_taxon_info__unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__kingdom" label="界(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__phylum" label="門(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__class_name" label="綱(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__order" label="目(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__suborder" label="亜目(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__family" label="科(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__subfamily" label="亜科(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__tribe" label="族(カスタム分類情報)" resettable />
        <TextInput source="custom_taxon_info__subtribe" label="亜族(カスタム分類情報)" resettable />
    </Filter>
);


const exporter = specimens => {
    const specimensForExport = specimens.map(specimen => {
        const sortedSpecimenForExport = {
            collection_name: specimen.collection_name,
            institution_code: specimen.institution_code,
            collection_code: specimen.collection_code,
            date_last_modified: specimen.date_last_modified,
            date_identified: specimen.date_identified,
            identified_by: specimen.identified_by,
            collecter: specimen.collecter,
            year: specimen.year,
            month: specimen.month,
            day: specimen.day,
            sampling_protocol: specimen.sampling_protocol,
            sampling_effort: specimen.sampling_effort,
            preparation_type: specimen.preparation_type,
            disposition: specimen.disposition,
            establishment_means: specimen.establishment_means,
            lifestage: specimen.lifestage,
            rights: specimen.rights,
            note: specimen.note,
            kingdom: specimen.kingdom,
            phylum: specimen.phylum,
            class: specimen.class_name,
            order: specimen.order,
            suborder: specimen.suborder,
            family: specimen.family,
            subfamily: specimen.subfamily,
            tribe: specimen.tribe,
            subtribe: specimen.subtribe,
            genus: specimen.genus,
            subgenus: specimen.subgenus,
            species: specimen.species,
            subspecies: specimen.subspecies,
            scientific_name_author: specimen.scientific_name_author,
            name_publishedin_year: specimen.name_publishedin_year,
            actual_dist_year: specimen.actual_dist_year,
            change_genus_brackets: specimen.change_genus_brackets,
            unknown_author_brackets: specimen.unknown_author_brackets,
            unknown_name_publishedin_year_brackets: specimen.unknown_name_publishedin_year_brackets,
            sex: specimen.sex,
            japanese_name: specimen.japanese_name,
            contient: specimen.contient,
            island_group: specimen.island_group,
            country: specimen.country,
            island: specimen.island,
            state_provice: specimen.state_provice,
            county: specimen.county,
            municipality: specimen.municipality,
            japanese_place_name: specimen.japanese_place_name,
            japanese_place_name_detail: specimen.japanese_place_name_detail,
            longitude: specimen.longitude,
            latitude: specimen.latitude,
            coordinate_precision: specimen.coordinate_precision,
            minimum_elevation: specimen.minimum_elevation,
            maximum_elevation: specimen.maximum_elevation,
            minimum_depth: specimen.minimum_depth,
            maximum_depth: specimen.maximum_depth,
            title: specimen.title,
            image1: specimen.image1
        }
        return sortedSpecimenForExport;
    });
    jsonExport(specimensForExport, {
    }, (err, csv) => {
        downloadCSV(csv, 'specimens');
    });
};


const Counter = () => {
    const { filterValues, ids } = useListContext();
    const dataProvider = useDataProvider();
    const [allSpCount, setAllSpCount] = useState("?");
    const [allSspCount, setAllSspCount] = useState("?");
    const [selectCount, setSelectCount] = useState("?");
    const [selectTaxon, setSelectTaxon] = useState("subspecies")
    useEffect(() => {
        dataProvider.getSpecimenCounter('specimens/own-specimens', { target_taxon: 'species', filter: {} })
            .then(({ data }) => {
                setAllSpCount(data.data);
            })
            .catch(error => {
                setAllSpCount("?");
            })
        dataProvider.getSpecimenCounter('specimens/own-specimens', { target_taxon: 'subspecies', filter: {} })
            .then(({ data }) => {
                setAllSspCount(data.data);
            })
            .catch(error => {
                setAllSspCount("?");
            })
        dataProvider.getSpecimenCounter('specimens/own-specimens', { target_taxon: selectTaxon, filter: filterValues })
            .then(({ data }) => {
                setSelectCount(data.data);
            })
            .catch(error => {
                setSelectCount("?");
            })
    }, [filterValues, ids, selectTaxon])
    const handleChange = (event) => {
        setSelectTaxon(event.target.value);
    };
    return (
        <div style={{ width: "98%", margin: '1em' }}>
            <Card>
                <CardContent>
                    <Typography variant="h6">所持タクソンカウンター</Typography>
                    <Typography variant="body2">
                        種数、科数など指定した分類階級をいくつ所持しているか計算します。
                        リスト検索バーによる絞り込みはここでも有効ですので、指定条件内での種数カウントなどにご活用ください。
                    </Typography>
                    <Typography variant="body2">
                        例: 機関コードで検索をかけて、特定のコレクション内の種数のみをカウントする
                    </Typography>
                    <Typography variant="body2">
                        例: 県名で検索をかけて、特定の県内の科数のみをカウントする
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            分類階級の指定
                        </InputLabel>
                        <NativeSelect
                            defaultValue={"subspecies"}
                            inputProps={{
                                name: 'taxon',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChange}
                            style={{ width: "10%"}}
                        >
                            <option value={"kingdom"}>界</option>
                            <option value={"phylum"}>門</option>
                            <option value={"class_name"}>綱</option>
                            <option value={"order"}>目</option>
                            <option value={"suborder"}>亜目</option>
                            <option value={"family"}>科</option>
                            <option value={"subfamily"}>亜科</option>
                            <option value={"tribe"}>族</option>
                            <option value={"subtribe"}>亜族</option>
                            <option value={"genus"}>属</option>
                            <option value={"subgenus"}>亜属</option>
                            <option value={"species"}>種</option>
                            <option value={"subspecies"}>亜種</option>
                        </NativeSelect>
                    </FormControl>
                    <Typography variant='body1'>
                        検索条件に合致した所持タクソン数: {selectCount} &emsp; 総所持種数(亜種含まない): {allSpCount} &emsp; 総所持種数(亜種含む): {allSspCount}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}


const MyList = ({ children, ...props }) => (
    <ListBase {...props}>
        <Title title={props.title} />
        <ListToolbar
            filters={props.filters}
            actions={props.actions}
        />
        <Counter />
        <Card>
            <CardContent>
                <div style={{ justifyContent: 'space-between' ,display: "flex" }}>
                    <Typography noWrap>↓一括選択は項目名左端のチェックボックスからできます</Typography>
                    <Typography noWrap>表示項目の変更は下の黒いボタンからできます↓</Typography>
                </div>
            </CardContent>
            <BulkActionsToolbar>
                <BulkDeleteButton {...props}/>
            </BulkActionsToolbar>
            {cloneElement(children, {
                hasBulkActions: props.bulkActionButtons !== false,
            })}
            <Pagination />
        </Card>
    </ListBase>
);

const SpecimenList = props => {
    return (
        <MyList {...props} title="標本" actions={<SpecimenListActions />} filters={<SpecimenFilter />} perPage={20}
            sort={{ field: 'date_last_modified', order: 'DESC' }} exporter={exporter}>
            <CustomizableDatagrid defaultColumns={['institution_code', 'collection_code',
                'genus', 'species', 'japanese_name', 'year', 'month', 'day',
                'japanese_place_name_detail', 'date_last_modified']}>
                <TextField source="institution_code" label="機関コード" />
                <TextField source="collection_code" label="標本ID" />
                <TextField source="genus" label="属" sortable={false} />
                <TextField source="subgenus" label="亜属" sortable={false} />
                <TextField source="species" label="種" sortable={false} />
                <TextField source="subspecies" label="亜種" sortable={false} />
                <TextField source="scientific_name_author" label="記載者" sortable={false} />
                <TextField source="name_publishedin_year" label="記載年" sortable={false} />
                <TextField source="actual_dist_year" label="記載実流通年" sortable={false} />
                <BooleanField source="change_genus_brackets" label="属移動カッコの有無" sortable={false} />
                <BooleanField source="unknown_author_brackets" label="記載者不明角カッコの有無" sortable={false} />
                <BooleanField source="unknown_name_publishedin_year_brackets" label="記載年不明角カッコの有無" sortable={false} />
                <TextField source="japanese_name" label="和名" sortable={false} />
                <TextField source="kingdom" label="界" sortable={false} />
                <TextField source="phylum" label="門" sortable={false} />
                <TextField source="class_name" label="綱" sortable={false} />
                <TextField source="order" label="目" sortable={false} />
                <TextField source="suborder" label="亜目" sortable={false} />
                <TextField source="family" label="科" sortable={false} />
                <TextField source="subfamily" label="亜科" sortable={false} />
                <TextField source="tribe" label="族" sortable={false} />
                <TextField source="subtribe" label="亜族" sortable={false} />
                <TextField source="country" label="国名" />
                <TextField source="contient" label="大陸" />
                <TextField source="island_group" label="島群" />
                <TextField source="island" label="島" />
                <TextField source="state_provice" label="県(州)" />
                <TextField source="county" label="海外における群・区" />
                <TextField source="municipality" label="市名以下の詳細地名" />
                <TextField source="verbatim_locality" label="採集地の説明" />
                <TextField source="japanese_place_name" label="日本語地名(ラベル用)" />
                <TextField source="japanese_place_name_detail" label="日本語地名(詳細)" />
                <NumberField source="longitude" label="経度" options={{ maximumFractionDigits: 6 }} sortable={false} />
                <NumberField source="latitude" label="緯度" options={{ maximumFractionDigits: 6 }} sortable={false} />
                <NumberField source="coordinate_precision" label="採集地の範囲" />
                <NumberField source="minimum_elevation" label="最低標高" />
                <NumberField source="maximum_elevation" label="最高標高" />
                <NumberField source="minimum_depth" label="水面からの最浅の距離" />
                <NumberField source="maximum_depth" label="水面からの最深の距離" />
                <TextField source="title" label="採集行のタイトル" />
                <TextField source="collection_name" label="コレクション名" />
                <TextField source="identified_by" label="同定者" />
                <DateField source="date_identified" label="同定年月日" />
                <TextField source="collecter" label="採集者" />
                <TextField source="year" label="採集年" />
                <TextField source="month" label="採集月" />
                <TextField source="day" label="採集日" />
                <TextField source="sex" label="性別" />
                <TextField source="preparation_type" label="標本の種類" />
                <TextField source="disposition" label="現在の標本の状況" />
                <TextField source="sampling_protocol" label="採集方法" />
                <TextField source="sampling_effort" label="採集中の作業メモ" />
                <TextField source="lifestage" label="ライフステージ" />
                <TextField source="establishment_means" label="生成プロセス" />
                <TextField source="rights" label="ライセンス" />
                <TextField source="note" label="備考" />
                <DateField source="date_last_modified" label="作成日" />
                <EditButton label="編集" />
                <CloneButton label="これをベースに作成" />
                <ShowButton label="詳細" />
            </CustomizableDatagrid>
        </MyList>
    )
};

export default SpecimenList;