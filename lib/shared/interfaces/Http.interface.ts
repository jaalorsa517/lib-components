import { HttpBody, HttpHeader } from "lib/shared/models/Http.model";

export interface IHttpGet {
  get(url: string, headers?: HttpHeader): Promise<any>;
}

export interface IHttpDelete {
  delete(url: string, headers?: HttpHeader): Promise<any>;
}

export interface IHttpPost {
  post(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
}

export interface IHttpPut {
  put(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
}

export interface IHttpPatch {
  patch(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
} 
