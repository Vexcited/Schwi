import type { CheerioAPI } from "cheerio";
import type { HeaderMap } from "./headers";

export class HttpResponse {
  constructor(
    public url: string,
    public status: number,
    public headers: HeaderMap,
    public toString: () => Promise<string>,
    public toArrayBuffer: () => Promise<ArrayBuffer>
  ) {}

  /**
   * Uses `cheerio` under the hood to parse the HTML response
   * and return a `CheerioAPI` instance.
   */
  public async toHTML(): Promise<CheerioAPI> {
    const html = await this.toString();

    // Dynamically import cheerio to avoid bundling it with the rest of the code.
    const cheerio = await import("cheerio");

    return cheerio.load(html);
  }

  public async toJSON <T = unknown>(): Promise<T> {
    const string = await this.toString();
    return JSON.parse(string) as T;
  }

  public async toXML <T = unknown>(): Promise<{ root: T }> {
    const { XMLParser } = await import("fast-xml-parser");

    const parser = new XMLParser({
      attributeNamePrefix: "",
      ignoreAttributes: false,
      textNodeName: "content"
    });

    const string = await this.toString();
    return parser.parse(string);
  }
}
