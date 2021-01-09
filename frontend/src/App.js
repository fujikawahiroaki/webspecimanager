import * as React from 'react';
import { Provider } from 'react-redux';

// react admin
import {Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, fetchUtils} from 'react-admin';

// drf
import drfProvider from 'ra-data-django-rest-framework';

// pages
import loginPage from "./pages/login";
import specimens from "./pages/specimens";
import taxa from "./pages/taxa/customTaxa";

// components
import Dashboard from './components/Dashboard';
import authProvider from './utils/authProvider';

import { theme } from "./themes/theme";

// browser history
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();


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

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={drfProvider('http://localhost:8000/api', httpClient)}
        history={history}
        dashboard={Dashboard}
        loginPage={loginPage}
        theme={theme}
    >
        <Resource name="specimens/own-specimens"  options={{ label: '標本' }} {...specimens}/>
        <Resource name="taxa/own-taxa" options={{ label: 'カスタム分類情報' }} {...taxa} />
        <Resource name="taxa/shared-taxa" options={{ label: 'デフォルト分類情報' }} list={ListGuesser} />
        <Resource name="collect-points/own-collect-points" options={{ label: '採集地点' }} list={ListGuesser} />
        <Resource name="tours/own-tours" options={{ label: '採集行' }} list={ListGuesser} />
        <Resource name="user-profiles/own-user-profiles" options={{ label: 'ユーザー設定' }} list={ListGuesser} />
        <Resource name="label-maker/own-labels" options={{ label: 'ラベル' }} list={ListGuesser} />
    </Admin>
);
export default App;
