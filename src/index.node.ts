import { Schwi } from "./schwi";
import { fetcher } from "./fetchers/native";

export { HeaderMap } from "./headers";
export { HttpRequest, HttpRequestRedirection } from "./request";
export type { HttpResponse } from "./schwi";
export * from "./form";

export default new Schwi(fetcher);
