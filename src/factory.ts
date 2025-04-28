import type { HeaderMap } from "./headers";
import type { HttpRequest } from "./request";

export type Fetcher = (req: HttpRequest) => Promise<HttpResponse>;

export interface HttpResponse {
  content: string;
  headers: HeaderMap;
  status: number;
}

export const factory = (fetcher: Fetcher) => {
  return (req: HttpRequest): Promise<HttpResponse> => {
    return fetcher(req);
  };
};
