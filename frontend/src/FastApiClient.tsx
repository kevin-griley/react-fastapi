const BASE_API_URL: string = "/api";
import { isAuthenticated } from "./utils/auth";

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
};

export class FastApiClient {
  async request({query, ...options  } : { [key: string]: any }): Promise<RequestResponse> {

    let requestBody: string | URLSearchParams;
    let contentType: string;
    let queryParams: string;

    switch (options.formType) {

      case "form":
        requestBody = new URLSearchParams(options.body);
        contentType = "application/x-www-form-urlencoded";
        queryParams = "";
        break;

      default:
        requestBody = JSON.stringify(options.body);
        contentType = "application/json";
        queryParams = new URLSearchParams(query || {}).toString();
        if (queryParams !== "") {
          queryParams = "?" + queryParams;
        }
        break;
    }

    const token = await isAuthenticated();
    if (token) {
      options.headers = {
        ...options.headers,
        ...authHeaders(token).headers,
      };
    }

    let response: Response;
    try {
      response = await fetch(
        BASE_API_URL + options.url + queryParams,
        {
          method: options.method,
          headers: { "Content-Type": contentType, ...options.headers, },
          body: requestBody,
        }
      );
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

  async get(url: string, query?: {[key: string]: string}, options?: { [key: string]: any }) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url: string, body?: {[key: string]: any}, options?: {[key: string]: any }) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url: string, body?: {[key: string]: any}, options?: {[key: string]: any }) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url: string, options?: {[key: string]: any }) {
    return this.request({method: "DELETE", url, ...options});
  }

  async post_form(url: string, body: {[key: string]: any}, options?: {[key: string]: any }) {
    return this.request({formType: "form", method: "POST", url, body, ...options });
  }
}