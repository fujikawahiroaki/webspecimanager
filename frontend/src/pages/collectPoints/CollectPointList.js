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


const CollectPointListActions = (props) => {
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
                {/* Add your custom actions */}
            </TopToolbar>
            <Typography variant="body2">ノーマルCSVはBOMなしUTF-8、Excel用CSVはBOM付きUTF-8でエンコードされています。</Typography>
            <Typography variant="body2">検索条件に合うデータのみをダウンロードします。全データをダウンロードしたい場合、検索をかけないでください。</Typography>
        </div>
    );
};

const CollectPointFilter = props => (
    <Filter {...props}>
        <TextInput source="country" label="国名コード(ISO 3166-1)" alwaysOn resettable />
        <TextInput source="contient" label="大陸" resettable />
        <TextInput source="island_group" label="島群" resettable />
        <TextInput source="island" label="島" alwaysOn resettable />
        <TextInput source="state_provice" label="県(州)" alwaysOn resettable />
        <TextInput source="county" label="海外における群・区" resettable />
        <TextInput source="municipality" label="市名以下の詳細地名" alwaysOn resettable />
        <TextInput source="verbatim_locality" label="採集地の説明" resettable />
        <TextInput source="japanese_place_name" label="日本語地名(ラベル用)" resettable />
        <TextInput source="japanese_place_name_detail" label="日本語地名(詳細)" alwaysOn resettable />
        <NumberInput source="longitude" label="経度(指定座標から指定半径m内にある地点を探すセット検索1/3)" alwaysOn resettable />
        <NumberInput source="latitude" label="緯度(指定座標から指定半径m内にある地点を探すセット検索2/3)" alwaysOn resettable />
        <NumberInput source="radius" label="半径(指定座標から指定半径m内にある地点を探すセット検索3/3)" alwaysOn resettable />
        <NumberInput source="longitude__range_min" label="経度の範囲(入力値以上)" resettable />
        <NumberInput source="longitude__range_max" label="経度の範囲(入力値以下)" resettable />
        <NumberInput source="latitude__range_min" label="緯度の範囲(入力値以上)" resettable />
        <NumberInput source="latitude__range_max" label="緯度の範囲(入力値以下)" resettable />
        <NumberInput source="coordinate_precision" label="採集地の範囲" resettable />
        <NumberInput source="minimum_elevation_min" label="最低標高の範囲(入力値以上)" resettable />
        <NumberInput source="minimum_elevation_max" label="最低標高の範囲(入力値以下)" resettable />
        <NumberInput source="maximum_elevation_min" label="最高標高の範囲(入力値以上)" resettable />
        <NumberInput source="maximum_elevation_max" label="最高標高の範囲(入力値以下)" resettable />
        <NumberInput source="minimum_depth_min" label="水面からの最浅の距離の範囲(入力値以上)" resettable />
        <NumberInput source="minimum_depth_max" label="水面からの最浅の距離の範囲(入力値以下)" resettable />
        <NumberInput source="maximum_depth_min" label="水面からの最深の距離の範囲(入力値以上)" resettable />
        <NumberInput source="maximum_depth_max" label="水面からの最深の距離(入力値以下)" resettable />
        <DateInput source="created_at" label="作成日" resettable />
    </Filter>
);


const collectPointToJson = (collectPoints) => {
    const collectPointsForExport = collectPoints.map(collectPoint => {
        const collectPointForExport = {
            contient: collectPoint.contient,
            island_group: collectPoint.island_group,
            country: collectPoint.country,
            island: collectPoint.island,
            state_provice: collectPoint.state_provice,
            county: collectPoint.county,
            municipality: collectPoint.municipality,
            japanese_place_name: collectPoint.japanese_place_name,
            japanese_place_name_detail: collectPoint.japanese_place_name_detail,
            longitude: collectPoint.longitude,
            latitude: collectPoint.latitude,
            coordinate_precision: collectPoint.coordinate_precision,
            minimum_elevation: collectPoint.minimum_elevation,
            maximum_elevation: collectPoint.maximum_elevation,
            minimum_depth: collectPoint.minimum_depth,
            maximum_depth: collectPoint.maximum_depth,
            note: collectPoint.note,
            created_at: collectPoint.created_at,
            image1: collectPoint.image1
        };
        return collectPointForExport;
    });
    return collectPointsForExport
};

const exporter = collectPoints => {
    jsonExport(collectPointToJson(collectPoints), {
    }, (err, csv) => {
        downloadCSV(csv, 'collect_points');
    });
};

const exporterForExcel = collectPoints => {
    jsonExport(collectPointToJson(collectPoints), {
    }, (err, csv) => {
        downloadCSV(new Blob(["\uFEFF", csv], { type: 'application/octet-stream' }), 'collect_points_for_excel');
    });
};

const CollectPointList = props => (
    <List {...props} empty={false} title="採集地点" actions={<CollectPointListActions />} filters={<CollectPointFilter />} perPage={20}
        sort={{ field: 'created_at', order: 'DESC' }} exporter={exporter}>
        <CustomizableDatagrid defaultColumns={['country', 'island', 'state_provice', 'municipality', 'japanese_place_name_detail',
            'longitude', 'latitude']}>
            <TextField source="country" label="国名コード(ISO 3166-1)" />
            <TextField source="contient" label="大陸" />
            <TextField source="island_group" label="島群" />
            <TextField source="island" label="島" />
            <TextField source="state_provice" label="県(州)" />
            <TextField source="county" label="海外における群・区" />
            <TextField source="municipality" label="市名以下の詳細地名" />
            <TextField source="verbatim_locality" label="採集地の説明" />
            <TextField source="japanese_place_name" label="日本語地名(ラベル用)" />
            <TextField source="japanese_place_name_detail" label="日本語地名(詳細)" />
            <NumberField source="longitude" label="経度" sortable={false} />
            <NumberField source="latitude" label="緯度" sortable={false} />
            <NumberField source="coordinate_precision" label="採集地の範囲" />
            <NumberField source="minimum_elevation" label="最低標高" />
            <NumberField source="maximum_elevation" label="最高標高" />
            <NumberField source="minimum_depth" label="水面からの最浅の距離" />
            <NumberField source="maximum_depth" label="水面からの最深の距離" />
            <DateField source="created_at" label="作成日" />
            <EditButton label="編集" />
            <CloneButton label="これをベースに作成" />
            <ShowButton label="詳細" />
        </CustomizableDatagrid>
    </List>
);

export default CollectPointList;