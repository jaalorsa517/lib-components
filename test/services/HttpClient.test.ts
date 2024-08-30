import { J5HttpClient } from "lib/services/HttpClient.service";
import { describe, it, expect, vi, afterEach } from "vitest"

describe("[Servicios] J5HttpClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("get", async () => {
    const window = {
      fetch: vi.fn().mockResolvedValue(
        await Promise.resolve({
          json: vi.fn().mockResolvedValue({}),
        } as unknown as Response))
    }
    const url = "https://url.com";
    const httpService = new J5HttpClient(window as any)
    const response = await httpService.get(url);
    expect(window.fetch).toBeCalledWith(url, { method: "GET", headers: {} });
    expect(response).toEqual({});
  })

  it("delete", async () => {
    const window = {
      fetch: vi.fn().mockResolvedValue(
        await Promise.resolve({
          json: vi.fn().mockResolvedValue({}),
        } as unknown as Response))
    }
    const url = "https://url.com";
    const httpService = new J5HttpClient(window as any)
    const response = await httpService.delete(url);
    expect(window.fetch).toBeCalledWith(url, { method: "DELETE", headers: {} });
    expect(response).toEqual({});
  })

  it("post", async () => {
    const window = {
      fetch: vi.fn().mockResolvedValue(
        await Promise.resolve({
          json: vi.fn().mockResolvedValue({}),
        } as unknown as Response))
    }
    const url = "https://url.com";
    const httpService = new J5HttpClient(window as any)
    const response = await httpService.post(url);
    expect(window.fetch).toBeCalledWith(url, { method: "POST", headers: {} });
    expect(response).toEqual({});
  })

  it("put", async () => {
    const window = {
      fetch: vi.fn().mockResolvedValue(
        await Promise.resolve({
          json: vi.fn().mockResolvedValue({}),
        } as unknown as Response))
    }
    const url = "https://url.com";
    const httpService = new J5HttpClient(window as any)
    const response = await httpService.put(url);
    expect(window.fetch).toBeCalledWith(url, { method: "PUT", headers: {} });
    expect(response).toEqual({});
  })

  it("patch", async () => {
    const window = {
      fetch: vi.fn().mockResolvedValue(
        await Promise.resolve({
          json: vi.fn().mockResolvedValue({}),
        } as unknown as Response))
    }
    const url = "https://url.com";
    const httpService = new J5HttpClient(window as any)
    const response = await httpService.patch(url);
    expect(window.fetch).toBeCalledWith(url, { method: "PATCH", headers: {} });
    expect(response).toEqual({});
  })
})