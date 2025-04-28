import type { HttpRequest } from "~/request";
import { HeaderMap } from "~/headers";
import { HttpResponse } from "~/response";

export const fetchAdapter = async (fetch: (url: string, init: RequestInit) => Promise<Response>, req: HttpRequest): Promise<HttpResponse> => {
  const response = await fetch(req.url.href, {
    body: req.body,
    // We don't want to send cookies, only the ones we set manually.
    credentials: "omit",
    headers: req.headers.toNativeHeaders(),
    method: req.method,

    redirect: req.redirection
  });

  return new HttpResponse(
    response.url,
    response.status,
    new HeaderMap(response.headers),
    async () => {
      return response.text();
    },
    async () => {
      const buffer = await response.arrayBuffer();
      return buffer;
    }
  );
};
