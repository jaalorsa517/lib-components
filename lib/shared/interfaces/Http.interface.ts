import { HttpBody, HttpHeader } from "lib/shared/models/Http.model";

export interface J5HttpGetI {
  get(url: string, headers?: HttpHeader): Promise<any>;
}

export interface J5HttpDeleteI {
  delete(url: string, headers?: HttpHeader): Promise<any>;
}

export interface J5HttpPostI {
  post(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
}

export interface J5HttpPutI {
  put(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
}

export interface J5HttpPatchI {
  patch(url: string, body?: HttpBody, headers?: HttpHeader): Promise<any>;
} 
