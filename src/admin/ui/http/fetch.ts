import { stringify } from 'query-string';

import HttpError from './HttpError';

export interface FetchOptions {
  body?: string | Blob | ArrayBuffer | ArrayBufferView | FormData;
  headers?: Headers;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';
  user?: {
    token: string;
  };
}

export const fetchJson = async (
  url: string,
  { body, headers, user, method }: FetchOptions = {},
) => {
  const requestHeaders =
    headers ||
    new Headers({
      Accept: 'application/json',
    });
  if (!requestHeaders.has('Content-Type') && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (user && user.token) {
    requestHeaders.set('Authorization', `Bearer ${user.token}`);
  }

  const request = new Request(url, { body, headers: requestHeaders, method });

  const response = await fetch(request);
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    // no json no big deal
  }

  if (response.status < 200 || response.status >= 300) {
    return Promise.reject(
      new HttpError(
        (json && json.message) || response.statusText,
        response.status,
        json,
      ),
    );
  }
  return {
    body: response.body,
    headers: response.headers,
    json,
    status: response.status,
  };
};

export const queryParameters = stringify;

const isValidObject = (value: any) => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isObject = Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && isObject && hasKeys;
};

export const flattenObject = (value: any, path: string[] = []): any => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map(key => {
        return flattenObject(value[key], path.concat([key]));
      }),
    );
  } else {
    return path.length ? { [path.join('.')]: value } : value;
  }
};
