/**
 * Created by vivek on 3/5/17.
 */
import 'whatwg-fetch';
import { loadItem, clearItem } from './localStorageApi';
import config from '../config/app';
let API_ENDPOINT = config.development.api_endpoint;
let API_AUTH_ENDPOINT = config.development.auth_endpoint;
if (process.env.NODE_ENV === 'production') {
  API_ENDPOINT = config.production.api_endpoint;
  API_AUTH_ENDPOINT = config.production.auth_endpoint;
}

const isProd = process.env.NODE_ENV === 'production';

function parseJSON(response) {
  return response.json();
}

// const loginUrl = (process.env.NODE_ENV === 'production') ?
//   config.production.login_url : config.development.login_url;

// const loginUrl = (process.env.NODE_ENV === 'production') ?
//   `${pathConfig.publicPath}${config.production.login_url}` : `${pathConfig.publicPath}${config.development.login_url}`;

function redirectIfUnauthenticated(response) {
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAuthUserCall =
    response.url.split('auth')[1] &&
    response.url.split('auth')[1].split('?')[0] === '/user';
  if (isUnauthorized) {
    if (isProd) {
      const originUrl = window.location.origin;
      clearLocalStorage();
      window.location = `${originUrl}/logout`;
    } else {
      if (isLoginPage && isAuthUserCall) return;
      clearLocalStorage();
      const loginPage = `${config.development.login_url}`;
      window.location = `${loginPage}`;
    }
  }
}

function clearLocalStorage() {
  clearItem('token');
  clearItem('orgID');
  clearItem('ouId');
  clearItem('isLoggedIn');
  clearItem('user');
}

function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 500
  ) {
    return response;
  }

  redirectIfUnauthenticated(response);

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options) {
  const fetchUrl =
    url.indexOf('?') !== -1
      ? `${url}&time=${Date.now()}`
      : `${url}?time=${Date.now()}`;
  return fetch(fetchUrl, options)
    .then(checkStatus)
    .then(parseJSON);
}

function getAPICallObjectForAuth(method, body, isFileUpload = false) {
  const token = loadItem('token');
  const orgID = loadItem('orgID');
  const user = loadItem('user');
  let headers;
  if (isFileUpload) {
    headers = {};
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  if (user && user.refID) {
    headers['X-CAP-REMOTE-USER'] = user.refID;
  }

  if (process.env.NODE_ENV !== 'production' && orgID !== undefined) {
    headers['X-CAP-API-AUTH-ORG-ID'] = orgID;
  }

  if (process.env.NODE_ENV !== 'production' && token !== undefined) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestObj = {
    method,
    mode: 'cors',
    headers: new Headers(headers),
  };

  if (process.env.NODE_ENV === 'production') {
    requestObj.credentials = 'same-origin';
  }

  if (body && !isFileUpload) {
    requestObj.body = JSON.stringify(body);
  } else if (body && isFileUpload) {
    requestObj.body = body;
  }
  return requestObj;
}

const dataOrgId = isProd
  ? config.production.data_org_id
  : config.development.data_org_id;

function getAPICallObject(method, body) {
  const token = loadItem('token');
  const orgID = loadItem('orgID');
  const ouId = loadItem('ouId');
  const user = loadItem('user');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (user && user.refID) {
    headers['X-CAP-REMOTE-USER'] = user.refID;
  }
  if (process.env.NODE_ENV !== 'production' && orgID !== undefined) {
    headers['X-CAP-API-AUTH-ORG-ID'] = orgID;
  }
  if (ouId !== undefined) {
    headers['x-cap-api-auth-ou-id'] = ouId;
  }
  headers['x-cap-api-data-context-org-id'] = orgID === 0 ? dataOrgId : orgID;
  if (process.env.NODE_ENV !== 'production' && token !== undefined) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestObj = {
    method,
    mode: 'cors',
    headers: new Headers(headers),
  };

  if (isProd) {
    requestObj.credentials = 'same-origin';
  }

  if (body) {
    requestObj.body = JSON.stringify(body);
  }
  return requestObj;
}
// Authentication
export const authorize = user => {
  const body = {
    username: user.username,
    password: user.password,
  };

  const requestObj = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
  if (process.env.NODE_ENV === 'production') {
    requestObj.credentials = 'same-origin';
  }
  requestObj.body = JSON.stringify(body);
  return request(`${API_AUTH_ENDPOINT}/login`, requestObj);
};

export const logout = () => {
  const url = `${API_AUTH_ENDPOINT}/logout`;
  return request(url, getAPICallObjectForAuth('GET'));
};

export const changeProxyOrg = orgId => {
  const url = `${API_AUTH_ENDPOINT}/setProxy/${orgId}`;
  return request(url, getAPICallObjectForAuth('Post'));
};

export const getUserData = () => {
  const url = `${API_AUTH_ENDPOINT}/user`;
  return request(url, getAPICallObjectForAuth('GET'));
};

export const getMenuData = code => {
  const url = `${API_AUTH_ENDPOINT}/user/${code}/actions`;
  return request(url, getAPICallObject('GET'));
};
