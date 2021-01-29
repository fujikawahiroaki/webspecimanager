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

const i18nProvider = polyglotI18nProvider(() => japaneseMessages, 'ja');

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token =  localStorage.getItem('wsat');
    options.headers.set('Authorization',  `Bearer ${token}`);
    options.user = {
        authenticated: true
    };
    console.log(options)
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = addUploadCapabilities(drfProvider('http://localhost:8000/api', httpClient))

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
        <Resource name="user-profiles/own-user-profiles" options={{ label: 'ユーザー設定' }} list={ListGuesser} />
        <Resource name="label-maker/own-labels" options={{ label: 'ラベル' }} list={ListGuesser} />
    </Admin>
);
export default App;
