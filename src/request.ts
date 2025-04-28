import { HeaderKeys, HeaderMap } from "./headers";

enum HttpRequestMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT"
}

enum HttpRequestRedirection {
  FOLLOW = "follow",
  MANUAL = "manual"
}

class HttpRequestBuilder {
  private body?: ArrayBuffer | Blob | FormData | string | Uint8Array;
  private cookies: Record<string, string> = {};
  private headers = new HeaderMap();
  private method = HttpRequestMethod.GET;
  private redirection = HttpRequestRedirection.MANUAL;
  private url: URL;

  constructor(url: string | URL) {
    if (typeof url === "string") {
      url = new URL(url);
    }

    this.url = url;
  }

  public appendUrlSearchParameter(key: string, value: string): this {
    this.url.searchParams.append(key, value);
    return this;
  }

  public build(): HttpRequest {
    const cookies = Object.entries(this.cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");

    if (cookies.length > 0)
      this.headers.set(HeaderKeys.COOKIE, cookies);

    return new HttpRequest(
      this.url,
      this.method,
      this.body,
      this.headers,
      this.redirection
    );
  }

  public deleteAllCookies(): this {
    this.cookies = {};
    return this;
  }

  public deleteCookie(key: string): this {
    delete this.cookies[key];
    return this;
  }

  public deleteUrlSearchParameter(key: string): this {
    this.url.searchParams.delete(key);
    return this;
  }

  public setAllCookies(cookies: Record<string, string>): this {
    this.cookies = { ...this.cookies, ...cookies };
    return this;
  }

  public setCookie(key: string, value: string): this {
    this.cookies[key] = value;
    return this;
  }

  public setHeader(key: string, value: string): this {
    this.headers.set(key, value);
    return this;
  }

  public setJsonBody(json: object): this {
    this.body = JSON.stringify(json);
    this.headers.set(HeaderKeys.CONTENT_TYPE, "application/json");
    return this;
  }

  public setMethod(method: HttpRequestMethod): this {
    this.method = method;
    return this;
  }

  public setRedirection(redirect: HttpRequestRedirection): this {
    this.redirection = redirect;
    return this;
  }

  public setSearchParamsBody(searchParams: URLSearchParams): this {
    this.body = searchParams.toString();
    this.headers.set(HeaderKeys.CONTENT_TYPE, "application/x-www-form-urlencoded");
    return this;
  }

  public setUrlSearchParameter(key: string, value: string): this {
    this.url.searchParams.set(key, value);
    return this;
  }
}

export class HttpRequest {
  public static Builder = HttpRequestBuilder;
  public static Method = HttpRequestMethod;
  public static Redirection = HttpRequestRedirection;

  public constructor(
    public readonly url: URL,
    public readonly method: HttpRequestMethod,
    public readonly body: ArrayBuffer | Blob | FormData | string | Uint8Array | undefined,
    public readonly headers: HeaderMap,
    public readonly redirection: HttpRequestRedirection
  ) {}
}
