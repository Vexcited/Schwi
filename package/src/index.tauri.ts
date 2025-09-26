import { factory } from "./factory";
import { fetcher } from "./fetchers/tauri";

export * from "./form";
export { HeaderKeys, HeaderMap } from "./headers";
export { HttpRequest, HttpRequestMethod, HttpRequestRedirection } from "./request";
export { HttpResponse } from "./response";

export const send = factory(fetcher);
