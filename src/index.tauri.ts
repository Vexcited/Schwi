import { factory } from "./factory";
import { fetcher } from "./fetchers/tauri";

export * from "./form";
export { HeaderKeys, HeaderMap } from "./headers";
export { HttpRequest } from "./request";
export { HttpResponse } from "./response";
export type { CheerioAPI } from "cheerio";

export const send = factory(fetcher);
