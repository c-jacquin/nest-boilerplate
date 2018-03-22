import { AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT } from 'admin-on-rest';

import { fetchJson } from '../fetch';

export default async (type: string, params: any) => {
  switch (type) {
    case AUTH_LOGIN:
      const { username: login, password } = params;
      const { json } = await fetchJson(process.env.ADMIN_AUTH_PATH as string, {
        body: JSON.stringify({ login, password }),
        method: 'POST',
      });
      localStorage.setItem('accessToken', json.accessToken);
      return Promise.resolve();
    case AUTH_LOGOUT:
      localStorage.removeItem('accessToken');
      return Promise.resolve();
    case AUTH_CHECK:
      return localStorage.getItem('accessToken')
        ? Promise.resolve()
        : Promise.reject('forbiden');
    default:
      return Promise.reject('unknown auth method');
  }
};
