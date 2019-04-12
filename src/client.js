import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import i18n from './i18n';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import App from './components/App';
import { create as createFedopsLogger } from '@wix/fedops-logger';

const baseURL = window.__BASEURL__;
const locale = window.__LOCALE__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('support-optimizer');
const browserHistory = createBrowserHistory();
fedopsLogger.appLoaded();

ReactDOM.render(
  <I18nextProvider i18n={i18n(locale)}>
    <Router history={browserHistory}>
      <Route path={'/'} component={App} />
    </Router>
  </I18nextProvider>,

  document.getElementById('root'),
);
