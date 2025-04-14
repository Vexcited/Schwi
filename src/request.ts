import { HeaderMap } from "./headers"
import { HttpMethod } from "./method"

export enum HttpRequestRedirection {
  FOLLOW = "follow",
  MANUAL = "manual",
}

export class HttpRequest {
  public constructor (
    public readonly url: URL,
    public readonly method: HttpMethod,
    public readonly body: undefined | string | FormData | Blob | ArrayBuffer | Uint8Array,
    public readonly headers: HeaderMap,
    public readonly redirection: HttpRequestRedirection
  ) {}

  public static Builder = class HttpRequestBuilder {
    url: URL
    method = HttpMethod.GET
    body?: string | FormData | Blob | ArrayBuffer | Uint8Array
    headers = new HeaderMap()
    redirection = HttpRequestRedirection.MANUAL

    constructor (url: URL | string) {
      if (typeof url === "string") {
        url = new URL(url)
      }

      this.url = url
    }

    public setMethod (method: HttpMethod): this {
      this.method = method
      return this
    }

    public setJsonBody (json: object): this {
      this.body = JSON.stringify(json)
      this.headers.set("Content-Type", "application/json")
      return this
    }

    public setSearchParamsBody (searchParams: URLSearchParams): this {
      this.body = searchParams.toString()
      this.headers.set("Content-Type", "application/x-www-form-urlencoded")
      return this
    }

    public setHeader (key: string, value: string): this {
      this.headers.set(key, value)
      return this
    }

    public setRedirection (redirect: HttpRequestRedirection): this {
      this.redirection = redirect
      return this
    }

    public build (): HttpRequest {
      return new HttpRequest(
        this.url,
        this.method,
        this.body,
        this.headers,
        this.redirection
      )
    }
  }
}
