import { J5HttpBody, J5HttpHeader } from "lib/shared/models/Http.model";

export interface J5HttpGetI {
  get(url: string, headers?: J5HttpHeader): Promise<any>;
}

export interface J5HttpDeleteI {
  delete(url: string, headers?: J5HttpHeader): Promise<any>;
}

export interface J5HttpPostI {
  post(url: string, body?: J5HttpBody, headers?: J5HttpHeader): Promise<any>;
}

export interface J5HttpPutI {
  put(url: string, body?: J5HttpBody, headers?: J5HttpHeader): Promise<any>;
}

export interface J5HttpPatchI {
  patch(url: string, body?: J5HttpBody, headers?: J5HttpHeader): Promise<any>;
} 
