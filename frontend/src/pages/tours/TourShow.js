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


const TourShowActions = ({ basePath, data}) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <ListButton basePath={basePath} />
    </TopToolbar>
);

const TourShow = props => (
    <Show actions={<TourShowActions/>} {...props} title="採集行">
        <TabbedShowLayout>
            <Tab label='基本情報'>
                <TextField source="title" label="タイトル"/>
                <DateField source="start_date" label="開始日"/>
                <DateField source="end_date" label="終了日"/>
                <DateField source="created_at" label="作成日"/>
                <TextField multiline source="note" label="備考" />
            </Tab>
            <Tab label='画像'>
                <ImageField source="image1" label="画像" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default TourShow;