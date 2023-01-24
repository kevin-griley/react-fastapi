import { createContext, useContext } from 'react';
import { FastApiClient, RequestResponse } from '../FastApiClient';

interface IApiContext {
  api: FastApiClient;
  get: (url: string, query?: {[key: string]: string}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  post: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  put: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  delete: (url: string, options?: {[key: string]: any}) => Promise<RequestResponse>;
  login: (body: {[key: string]: any}) => Promise<RequestResponse>;
  post_form: (url: string, body: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
}

const ApiContext = createContext<IApiContext>({
  api: new FastApiClient,
  get: function (url: string, query?: { [key: string]: string; } | undefined, options?: { [key: string]: any; } | undefined): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  },
  post: function (url: string, body?: { [key: string]: any; } | undefined, options?: { [key: string]: any; } | undefined): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  },
  put: function (url: string, body?: { [key: string]: any; } | undefined, options?: { [key: string]: any; } | undefined): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  },
  delete: function (url: string, options?: { [key: string]: any; } | undefined): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  },
  login: function (body: { [key: string]: any; }): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  },
  post_form: function (url: string, body: { [key: string]: any; }, options?: { [key: string]: any; } | undefined): Promise<RequestResponse> {
    throw new Error('Function not implemented.');
  }
});

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = new FastApiClient();
  return (
    <ApiContext.Provider
      value={{
        api,
        get: api.get.bind(api),
        post: api.post.bind(api),
        put: api.put.bind(api),
        delete: api.delete.bind(api),
        login: api.login.bind(api),
        post_form: api.post_form.bind(api),
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = (): IApiContext => {
  return useContext(ApiContext);
}

export { ApiProvider, useApi };