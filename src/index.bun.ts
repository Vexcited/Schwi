import { factory } from "./factory";
import { fetcher } from "./fetchers/undici";

export { HeaderMap, HeaderKeys } from "./headers";
export { HttpRequest, HttpRequestRedirection } from "./request";
export type { HttpResponse } from "./factory";
export * from "./form";

export const send = factory(fetcher);
