// @ts-expect-error
import { fetch as _fetch } from "undici/lib/web/fetch/index.js";
//                               ^ import from path to avoid Bun overriding it.

// We have to type the function since no types are provided here.
const undiciFetch = _fetch as typeof globalThis.fetch;

import type { SchwiFetcher } from "../schwi";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: SchwiFetcher = async (req) => {
  return fetchAdapter(undiciFetch, req);
};
