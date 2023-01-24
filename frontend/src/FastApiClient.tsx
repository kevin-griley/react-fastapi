const BASE_API_URL: string = "/api";
const LOGIN_URL: string = '/login/access-token';
import { isAuthenticated } from './utils/auth'

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export type RequestResponse = {
    ok: boolean;
    status: number;
    body: any;
  }

export class FastApiClient {
  async json_request({query, ...options}: {[key: string]: any}): Promise<RequestResponse> {
    let queryParams: string = new URLSearchParams(query || {}).toString();
    if (queryParams !== '') {
      queryParams = '?' + queryParams;
    }

    const token = isAuthenticated();
    if ( token ) {
      options.headers = {
        ...options.headers,
        ...authHeaders(token).headers,
      };
    }

    let response: Response;
    try {
      response = await fetch(BASE_API_URL + options.url + queryParams, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error!.toString(),
        }; }
      } as Response;
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    } as RequestResponse;
  }


  async form_request({url, body, ...options}: {[key: string]: any}): Promise<RequestResponse> {

    const formParams = new URLSearchParams();
    for (const key in body) {
      formParams.append(key, body[key]);
    }

    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        ...authHeaders(token).headers,
      };
    }

    let response: Response;
    try {
      response = await fetch(BASE_API_URL + url, {
        method: options.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...options.headers,
        },
        body: formParams,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error!.toString(),
        }; }
      } as Response;
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    } as RequestResponse;

  }

  async get(url: string, query?: {[key: string]: string}, options?: {[key: string]: any}) {
    return this.json_request({method: 'GET', url, query, ...options});
  }
  async post(url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) {
    return this.json_request({method: 'POST', url, body, ...options});
  }
  async put(url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) {
    return this.json_request({method: 'PUT', url, body, ...options});
  }
  async delete(url: string, options?: {[key: string]: any}) {
    return this.json_request({method: 'DELETE', url, ...options});
  }
  async login(body: {[key: string]: any}) {
    return this.form_request({method: 'POST', url: LOGIN_URL, body});
  }
  async post_form(url: string, body: {[key: string]: any}, options?: {[key: string]: any}) {
    return this.form_request({method: 'POST', url, body, ...options });
  }
}