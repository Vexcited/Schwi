import { HeaderMap } from "./headers"

export interface HttpRequest {
  url: URL

  /**
   * @default "GET"
   */
  method?: "GET" | "POST"

  /**
   * Body of the request.
   * @default undefined
   */
  content?: string

  /**
   * Headers that should be appended to the request.
   * @default {}
   */
  headers?: Record<string, string> | Headers

  /**
   * @default "follow"
   */
  redirect?: "follow" | "manual"
}

export interface HttpResponse {
  status: number
  content: string
  headers: HeaderMap
}

export type SchwiFetcher = (req: HttpRequest) => Promise<HttpResponse>;

export class Schwi {
  public constructor (
    private readonly fetcher: SchwiFetcher
  ) {}

  public async send (req: HttpRequest): Promise<HttpResponse> {
    return this.fetcher(req)
  }
}
