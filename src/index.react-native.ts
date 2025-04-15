import { factory } from "./factory";
import { fetcher } from "./fetchers/native";

export { HeaderMap, HeaderKeys } from "./headers";
export { HttpRequest, HttpRequestRedirection } from "./request";
export type { HttpResponse } from "./factory";
export * from "./form";

export const send = factory(fetcher);
