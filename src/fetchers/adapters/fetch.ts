import { HeaderMap } from "~/headers";
import type { HttpResponse } from "~/factory"
import type { HttpRequest } from "~/request";

export const fetchAdapter = async (fetch: (url: string, init: RequestInit) => Promise<Response>, req: HttpRequest): Promise<HttpResponse> => {
  const response = await fetch(req.url.href, {
    redirect: req.redirection,
    headers: req.headers.toNativeHeaders(),
    method: req.method,
    body: req.body,

    // We don't want to send cookies, only the ones we set manually.
    credentials: "omit"
  });

  return {
    status: response.status,
    content: await response.text(),
    headers: new HeaderMap(response.headers)
  };
};
