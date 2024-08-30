import { J5HttpDeleteI, J5HttpGetI, J5HttpPatchI, J5HttpPostI, J5HttpPutI } from "lib/shared/interfaces/Http.interface";
import { HttpBody, HttpHeader } from "lib/shared/models/Http.model";

export class J5HttpClient implements J5HttpGetI, J5HttpDeleteI, J5HttpPostI, J5HttpPutI, J5HttpPatchI {
  constructor(private windows: Window) { }

  async get(url: string, headers: HttpHeader = {}): Promise<any> {
    const response = await this.windows.fetch(url, { method: "GET", headers });
    const responseJson = await response.json();
    return responseJson;
  }
  async delete(url: string, headers: HttpHeader = {}): Promise<any> {
    const response = await this.windows.fetch(url, { method: "DELETE", headers });
    const responseJson = await response.json()
    return responseJson;
  }
  async post(url: string, body?: HttpBody, headers: HttpHeader = {}): Promise<any> {
    const response = await this.windows.fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
    const responseJson = await response.json();
    return responseJson;
  }
  async put(url: string, body?: HttpBody, headers: HttpHeader = {}): Promise<any> {
    const response = await this.windows.fetch(url, { method: "PUT", headers, body: JSON.stringify(body) });
    const responseJson = await response.json();
    return responseJson;
  }
  async patch(url: string, body?: HttpBody, headers: HttpHeader = {}): Promise<any> {
    const response = await this.windows.fetch(url, { method: "PATCH", headers, body: JSON.stringify(body) });
    const responseJson = await response.json();
    return responseJson;
  }
}