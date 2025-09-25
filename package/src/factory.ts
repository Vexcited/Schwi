import type { HttpRequest } from "./request";
import type { HttpResponse } from "./response";

export type Fetcher = (req: HttpRequest) => Promise<HttpResponse>;

export const factory = (fetcher: Fetcher) => {
  return (req: HttpRequest): Promise<HttpResponse> => {
    return fetcher(req);
  };
};
