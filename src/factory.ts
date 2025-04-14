import { HeaderMap } from "./headers"
import { HttpRequest } from "./request";

export interface HttpResponse {
  status: number
  content: string
  headers: HeaderMap
}

export type Fetcher = (req: HttpRequest) => Promise<HttpResponse>;

export const factory = (fetcher: Fetcher) => {
  return (req: HttpRequest): Promise<HttpResponse> => {
    return fetcher(req)
  }
}
