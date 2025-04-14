import { HeaderMap } from "~/headers";
import type { HttpRequest, HttpResponse } from "~/schwi"

export const fetchAdapter = async (fetch: (url: string, init: RequestInit) => Promise<Response>, req: HttpRequest): Promise<HttpResponse> => {
  const response = await fetch(req.url.href, {
    redirect: req.redirect ?? "follow",
    headers: req.headers ?? {},
    method: req.method ?? "GET",
    body: req.content,

    // We don't want to send cookies, only the ones we set manually.
    credentials: "omit"
  });

  return {
    status: response.status,
    content: await response.text(),
    headers: new HeaderMap(response.headers)
  };
};
