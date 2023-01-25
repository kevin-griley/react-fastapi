import { createContext, useContext } from 'react';
import { FastApiClient, RequestResponse } from '../FastApiClient';

interface IApiContext {
  api: FastApiClient;
  get: (url: string, query?: {[key: string]: string}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  post: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  put: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
  delete: (url: string, options?: {[key: string]: any}) => Promise<RequestResponse>;
  post_form: (url: string, body: {[key: string]: any}, options?: {[key: string]: any}) => Promise<RequestResponse>;
}

const ApiContext = createContext( {} as IApiContext );

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