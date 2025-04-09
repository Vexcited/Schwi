
/**
 * Basically a copy of the Headers interface from the Fetch API
 * but with `getSetCookie` optional since it is not always available.
 */
interface HeadersLike {
  get(key: string): string | null
  set(key: string, value: string): void
  getSetCookie?: () => string[]
}

type PossibleHeaders = (
  | Record<string, string>
  | Headers
  | HeadersLike
);

export class HeaderMap {
  public constructor (
    private readonly headers: PossibleHeaders = new Headers()
  ) {}

  public get (key: string): string | null {
    const headers = this.headers;

    return HeaderMap.isHeadersInstance(headers)
      ? headers.get(key)
      : headers[key] || null;
  }

  public set (key: string, value: string): void {
    if (HeaderMap.isHeadersInstance(this.headers)) {
      this.headers.set(key, value);
    }
    else {
      this.headers[key] = value;
    }
  }

  public getSetCookie (): string[] {
    // When the function exists, simply use it !
    if (typeof this.headers.getSetCookie === "function")
      return this.headers.getSetCookie();

    const setCookieHeader = this.get("set-cookie");

    if (!setCookieHeader)
      return [];

    return this.splitSetCookieValue(setCookieHeader);
  }

  private static isHeadersInstance (headers: PossibleHeaders): headers is (
    | Headers
    | HeadersLike
   ) {
    return typeof headers.get === "function"
        && typeof headers.set === "function";
  }

  private splitSetCookieValue (headerValue: string): string[] {
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
