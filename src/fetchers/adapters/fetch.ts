import type { HttpResponse } from "~/factory";
import type { HttpRequest } from "~/request";
import { HeaderMap } from "~/headers";

export const fetchAdapter = async (fetch: (url: string, init: RequestInit) => Promise<Response>, req: HttpRequest): Promise<HttpResponse> => {
  const response = await fetch(req.url.href, {
    body: req.body,
    // We don't want to send cookies, only the ones we set manually.
    credentials: "omit",
    headers: req.headers.toNativeHeaders(),
    method: req.method,

    redirect: req.redirection
  });

  return {
    content: await response.text(),
    headers: new HeaderMap(response.headers),
    status: response.status
  };
};
