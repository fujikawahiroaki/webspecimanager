import authConfig from "./authConfig";
import { Auth0Client } from '@auth0/auth0-spa-js';
import { fetchUtils } from 'react-admin';


const auth0 = new Auth0Client({
    domain: authConfig.domain,
    client_id: authConfig.clientID,
    redirect_uri: authConfig.redirectURI,
    audience: authConfig.audience,
    scope: "openid profile offline_access read:specimens create:specimens delete:specimens",
    useRefreshTokens: true,
    issuer: authConfig.issuer
});


export const httpClient = async (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token =  await auth0.getTokenSilently();
    options.headers.set('Authorization',  `Bearer ${token}`);
    options.user = {
        authenticated: true
    };
    return fetchUtils.fetchJson(url, options);
}


export default {
    // called when the user attempts to log in
    login: (url) => {
        if (typeof url === 'undefined') {
            return auth0.loginWithRedirect()
        }
        return auth0.handleRedirectCallback(url.location);
    },
    // called when the user clicks on the logout button
    logout: async () => {
        return auth0.isAuthenticated().then(function (isAuthenticated) {
            if (isAuthenticated) { // need to check for this as react-admin calls logout in case checkAuth failed
                localStorage.clear();
                return auth0.logout({
                    redirect_uri: authConfig.redirectURI,
                    federated: false // have to be enabled to invalidate refresh token
                });
            }
            return Promise.resolve()
        })
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: async () => {
        return auth0.isAuthenticated().then(function (isAuthenticated) {
            if (isAuthenticated) {
                auth0.getTokenSilently().then(access_token => {
                    return Promise.resolve();
                }).catch(e => {
                    if (e.error === 'login_required') {
                        auth0.loginWithRedirect();
                    }
                    if (e.error === 'consent_required') {
                        auth0.loginWithRedirect();
                    }
                    throw e;
                })
            } else {
                localStorage.clear();
                return Promise.reject({ message: 'authlimit.timeout' });
            };
        })
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        return Promise.resolve();
    },
};
