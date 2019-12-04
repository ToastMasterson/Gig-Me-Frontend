import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from './react-auth0-wrapper'

import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './auth_config.json'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

ReactDOM.render(
    <BrowserRouter>
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        audience={config.audience}
        onRedirectCallback={onRedirectCallback}
    >
    <App /> 
    </Auth0Provider>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
