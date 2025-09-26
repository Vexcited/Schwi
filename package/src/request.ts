import { HeaderKeys, HeaderMap } from "./headers";

export enum HttpRequestMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT"
}

export enum HttpRequestRedirection {
  FOLLOW = "follow",
  MANUAL = "manual"
}

class HttpRequestBuilder {
  private body?: ArrayBuffer | Blob | FormData | string;
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

  /**
   * @example
   * .setAllCookies([["name", "value"], ["name2", "value2"]])
   */
  public setAllCookies(cookies: Array<[string, string]>): this;
  /**
   * @example
   * .setAllCookies(["name=value", "name2=value2"])
   */
  public setAllCookies(cookies: Array<string>): this;
  /**
   * @example
   * .setAllCookies({ name: "value", name2: "value2" })
   */
  public setAllCookies(cookies: Record<string, string>): this;
  public setAllCookies(cookies: Array<[string, string]> | Array<string> | Record<string, string>): this {
    if (Array.isArray(cookies)) {
      const arr = cookies;
      cookies = {};

      for (const cookie of arr) {
        const [name, value] = Array.isArray(cookie) ? cookie : cookie.split("=");
        cookies[name] = value;
      }
    }

    this.cookies = { ...this.cookies, ...cookies };
    return this;
  }

  public setCookie(key: string, value: string): this {
    this.cookies[key] = value;
    return this;
  }

  public setFormUrlEncodedBody(searchParams: URLSearchParams): this {
    this.body = searchParams.toString();
    this.headers.set(HeaderKeys.CONTENT_TYPE, "application/x-www-form-urlencoded");
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
    public readonly body: ArrayBuffer | Blob | FormData | string | undefined,
    public readonly headers: HeaderMap,
    public readonly redirection: HttpRequestRedirection
  ) {}
}
