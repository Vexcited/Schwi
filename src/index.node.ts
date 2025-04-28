import { factory } from "./factory";
import { fetcher } from "./fetchers/native";

export type { HttpResponse } from "./factory";
export * from "./form";
export { HeaderKeys, HeaderMap } from "./headers";
export { HttpRequest } from "./request";

export const send = factory(fetcher);
