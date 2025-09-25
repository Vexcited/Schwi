import type { Fetcher } from "../factory";

import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: Fetcher = async (req) => {
  return fetchAdapter(tauriFetch, req);
};
