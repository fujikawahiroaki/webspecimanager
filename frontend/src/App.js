import * as React from 'react';
import { Provider } from 'react-redux';


// react admin
import {Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, fetchUtils} from 'react-admin';


// drf
import drfProvider from './utils/drfProvider';
import addUploadCapabilities from './utils/addUploadFeature';

// pages
import loginPage from "./pages/login";
import specimens from "./pages/specimens";
import customTaxa from "./pages/taxa/customTaxa";
import defaultTaxa from './pages/taxa/defaultTaxa';
import tours from './pages/tours';
import collectPoints from './pages/collectPoints';
import collectionSettings from './pages/collectionSettings';
import labels from "./pages/labels";

// components
import Dashboard from './components/Dashboard';
import authProvider from './utils/authProvider';

// themes
import { theme } from "./themes/theme";

// 日本語化
import japaneseMessages from '@bicstone/ra-language-japanese';
import polyglotI18nProvider from 'ra-i18n-polyglot';

// browser history
import { createBrowserHistory as createHistory } from 'history';


const history = createHistory();

const japaneseDomainMessages = {
    authlimit: {
        timeout: "認証期限が切れました 再ログインしてください"
    }
}
const messages = {
    ja: {
        ...japaneseMessages,
        ...japaneseDomainMessages
    }
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'ja');

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token =  localStorage.getItem('wsat');
    options.headers.set('Authorization',  `Bearer ${token}`);
    options.user = {
        authenticated: true
    };
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = addUploadCapabilities(drfProvider(process.env.REACT_APP_BACKEND_API, httpClient))


const App = () => (
    <Admin locale="ja" i18nProvider={i18nProvider}
        authProvider={authProvider}
        dataProvider={dataProvider}
        history={history}
        dashboard={Dashboard}
        loginPage={loginPage}
        theme={theme}
    >
        <Resource name="specimens/own-specimens"  options={{ label: '標本' }} {...specimens}/>
        <Resource name="taxa/own-taxa" options={{ label: 'カスタム分類情報' }} {...customTaxa} />
        <Resource name="taxa/shared-taxa" options={{ label: 'デフォルト分類情報' }} {...defaultTaxa} />
        <Resource name="collect-points/own-collect-points" options={{ label: '採集地点' }} {...collectPoints} />
        <Resource name="tours/own-tours" options={{ label: '採集行' }} {...tours} />
        <Resource name="collection-settings/own-collection-settings" options={{label: 'コレクション設定'}} {...collectionSettings} />
        <Resource name="label-maker/own-labels" options={{ label: 'ラベル' }} {...labels} />
    </Admin>
);
export default App;
