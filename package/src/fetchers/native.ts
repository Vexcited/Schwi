import type { Fetcher } from "../factory";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: Fetcher = async (req) => {
  return fetchAdapter(fetch, req);
};
