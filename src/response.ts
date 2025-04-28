import type { HeaderMap } from "./headers";

export class HttpResponse {
  constructor(
    public url: string,
    public status: number,
    public headers: HeaderMap,
    public toString: () => Promise<string>,
    public toArrayBuffer: () => Promise<ArrayBuffer>
  ) {}

  public async toJSON <T = unknown>(): Promise<T> {
    const string = await this.toString();
    return JSON.parse(string) as T;
  }
}
