import * as React from 'react';
import {
    TopToolbar,
    ListButton,
    Tab,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    RichTextField,
    DateField,
    Datagrid,
    ReferenceField,
    TextField,
    NumberField,
    EditButton,
    ImageField,
} from 'react-admin';


const CollectionSettingShowActions = ({ basePath, data}) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const CollectionSettingShow = props => (
    <Show actions={<CollectionSettingShowActions/>} {...props} title="コレクション設定">
        <TabbedShowLayout>
            <Tab label='設定'>
                <TextField source="collection_name" label="コレクション名"/>
                <TextField source="institution_code" label="機関コード"/>
                <NumberField source="latest_collection_code" label="標本IDの最新番号"/>
                <DateField source="created_at" label="作成日"/>
            </Tab>
            <Tab label='備考'>
                <TextField source="note" label="備考" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default CollectionSettingShow;