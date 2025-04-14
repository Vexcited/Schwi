import type { SchwiFetcher } from "../schwi";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: SchwiFetcher = async (req) => {
  return fetchAdapter(fetch, req);
};
