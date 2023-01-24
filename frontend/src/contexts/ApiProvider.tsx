
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
  api: new FastApiClient(),
  get: (url: string, query?: {[key: string]: string}, options?: {[key: string]: any}) => (new FastApiClient()).get(url, query, options),
  post: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).post(url, body, options),
  put: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).put(url, body, options),
  delete: (url: string, options?: {[key: string]: any}) => (new FastApiClient()).delete(url, options),
  login: (body: {[key: string]: any}) => (new FastApiClient()).login(body),
  post_form: (url: string, body: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).post_form(url, body, options),
});

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{
        api: new FastApiClient(),
        get:(url: string, query?: {[key: string]: string}, options?: {[key: string]: any}) => (new FastApiClient()).get(url, query, options),
        post: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).post(url, body, options),
        put: (url: string, body?: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).put(url, body, options),
        delete: (url: string, options?: {[key: string]: any}) => (new FastApiClient()).delete(url, options),
        login: (body: {[key: string]: any}) => (new FastApiClient()).login(body),
        post_form: (url: string, body: {[key: string]: any}, options?: {[key: string]: any}) => (new FastApiClient()).post_form(url, body, options),
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