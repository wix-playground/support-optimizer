import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import i18n from './i18n';
import {Route} from 'react-router-dom';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import App from './components/App';
import Nav from './components/Nav';
import { create as createFedopsLogger } from '@wix/fedops-logger';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('support-optimizer');
const browserHistory = createBrowserHistory();

// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

ReactDOM.render(
  <Router history={browserHistory}>
    <I18nextProvider i18n={i18n(locale)}>
      <Route path={'/'} component={App}/>
    </I18nextProvider>
  </Router>,
  document.getElementById('root'),
);
