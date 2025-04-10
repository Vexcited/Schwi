// @ts-expect-error
import { fetch as _fetch } from "undici/lib/web/fetch/index.js";
//                               ^ import from path to avoid bun overriding it.

// We have to type the fetch function since no types are provided for it.
const fetch = _fetch as typeof globalThis.fetch;

import type { SchwiFetcher } from "../schwi";
import { HeaderMap } from "../headers";

export const fetcher: SchwiFetcher = async (req) => {
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
