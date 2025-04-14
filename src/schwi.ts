import { HeaderMap } from "./headers"



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
