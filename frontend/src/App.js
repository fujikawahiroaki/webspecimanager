import * as React from 'react';
import { Provider } from 'react-redux';

// react admin
import {Admin, Resource, ListGuesser, EditGuesser, fetchUtils} from 'react-admin';

// drf
import drfProvider, { tokenAuthProvider, fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';

// pages
import loginPage from "./pages/login";

// components
import Dashboard from './components/Dashboard';
import authProvider from './utils/authProvider';

// browser history
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('access_token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

const App = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={drfProvider("http://localhost:8000/api", httpClient)}
        history={history}
        dashboard={Dashboard}
        loginPage={loginPage}
    >
        <Resource name="specimens/own-specimens" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="taxa/own-taxa" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="taxa/shared-taxa" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="collect-points/own-collect-points" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="tours/own-tours" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="user-profiles/own-user-profiles" list={ListGuesser} edit={EditGuesser}/>
        <Resource name="label-maker/own-labels" list={ListGuesser} edit={EditGuesser}/>
    </Admin>
);
export default App;
