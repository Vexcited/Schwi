import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

import type { SchwiFetcher } from "../schwi";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: SchwiFetcher = async (req) => {
  return fetchAdapter(tauriFetch, req);
};
