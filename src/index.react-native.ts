import { factory } from "./factory";
import { fetcher } from "./fetchers/native";

export * from "./form";
export { HeaderKeys, HeaderMap } from "./headers";
export { HttpRequest } from "./request";
export { HttpResponse } from "./response";

export const send = factory(fetcher);
