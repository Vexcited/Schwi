export enum HeaderKeys {
  AUTHORIZATION = "Authorization",
  CONTENT_TYPE = "Content-Type",
  COOKIE = "Cookie",
  SET_COOKIE = "Set-Cookie",
  USER_AGENT = "User-Agent"
}

/**
 * Basically a copy of the Headers interface from the Fetch API
 * but with `getSetCookie` optional since it is not always available.
 */
interface HeadersLike {
  get: (key: string) => null | string;
  getSetCookie?: () => string[];
  set: (key: string, value: string) => void;
}

type PossibleHeaders = (
  | Headers
  | HeadersLike
  | Record<string, string>
);

export const kHeaders = Symbol("Headers");

export class HeaderMap {
  static [kHeaders] = Headers;

  public constructor(
    private readonly headers: PossibleHeaders = new HeaderMap[kHeaders]()
  ) {}

  private static isHeadersInstance(headers: PossibleHeaders): headers is (
    | Headers
    | HeadersLike
   ) {
    return typeof headers.get === "function"
      && typeof headers.set === "function";
  }

  public get(key: string): null | string {
    const headers = this.headers;

    if (HeaderMap.isHeadersInstance(headers)) {
      return headers.get(key);
    }

    key = key.toLowerCase();
    for (const currentKey of Object.keys(headers)) {
      if (currentKey.toLowerCase() === key) {
        return headers[currentKey];
      }
    }

    return null;
  }

  public getSetCookie(): string[] {
    if (typeof this.headers.getSetCookie === "function")
      return this.headers.getSetCookie();

    const setCookieHeader = this.get(HeaderKeys.SET_COOKIE);

    if (!setCookieHeader)
      return [];

    return this.splitSetCookieValue(setCookieHeader);
  }

  public set(key: string, value: string): void {
    if (HeaderMap.isHeadersInstance(this.headers)) {
      this.headers.set(key, value);
    }
    else {
      this.headers[key] = value;
    }
  }

  public toNativeHeaders(): Headers {
    if (HeaderMap.isHeadersInstance(this.headers)) {
      return this.headers as Headers;
    }

    return new HeaderMap[kHeaders](Object.entries(this.headers));
  }

  private splitSetCookieValue(headerValue: string): string[] {
    const output: Array<string> = [];

    let index = 0;
    let start: number;
    let character: string;
    let lastComma: number;
    let nextStart: number;
    let cookiesSeparatorFound: boolean;

    const skipWhitespace = (): boolean => {
      while (index < headerValue.length && /\s/.test(headerValue.charAt(index))) {
        index += 1;
      }

      return index < headerValue.length;
    };

    const notSpecialChar = (): boolean => {
      character = headerValue.charAt(index);
      return character !== "=" && character !== ";" && character !== ",";
    };

    while (index < headerValue.length) {
      start = index;
      cookiesSeparatorFound = false;

      while (skipWhitespace()) {
        character = headerValue.charAt(index);

        if (character === ",") {
          // ',' is a header value separator if we have later first '=', not ';' or ','
          lastComma = index;
          index += 1;

          skipWhitespace();
          nextStart = index;

          while (index < headerValue.length && notSpecialChar()) {
            index += 1;
          }

          // Currently special character.
          if (index < headerValue.length && headerValue.charAt(index) === "=") {
            // We found cookies separator.
            cookiesSeparatorFound = true;

            // `index` is inside the next cookie, so back up and return it.
            index = nextStart;

            output.push(headerValue.substring(start, lastComma));
            start = index;
          }
          else {
            // In param ',' or param separator ';',
            // we continue from that comma.
            index = lastComma + 1;
          }
        }
        else {
          index += 1;
        }
      }

      if (!cookiesSeparatorFound || index >= headerValue.length) {
        output.push(headerValue.substring(start, headerValue.length));
      }
    }

    return output;
  }
}
