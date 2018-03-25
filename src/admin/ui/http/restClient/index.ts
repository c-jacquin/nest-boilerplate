import {
  CREATE,
  DELETE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
} from 'admin-on-rest';
import { stringify } from 'query-string';

import { fetchJson, FetchOptions } from '../fetch';

export default (apiUrl: string, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (
    type: string,
    resource: any,
    params: any,
  ) => {
    let url = '';
    const options: FetchOptions = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
          // filter: JSON.stringify(params.filter),
          order: order.toUpperCase(),
          orderBy: field,
          skip: (page - 1) * perPage,
          take: perPage,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
          where: JSON.stringify({ id: params.ids }),
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          order: order.toUpperCase(),
          orderBy: field,
          skip: (page - 1) * perPage,
          take: perPage,
          where: JSON.stringify({
            ...params.filter,
            [params.target]: params.id,
          }),
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    options.user = { token: localStorage.getItem('accessToken') as string };

    return {
      options,
      url,
    };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (
    response: any,
    type: string,
    resource: any,
    params: any,
  ) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('content-range')) {
          throw new Error(
            'The Content-Range header is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
          );
        }
        return {
          data: json,
          total: parseInt(
            headers
              .get('content-range')
              .split('/')
              .pop(),
            10,
          ),
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return async (type: string, resource: any, params: any) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);

    const response = await httpClient(url, options);
    return convertHTTPResponseToREST(response, type, resource, params);
  };
};
