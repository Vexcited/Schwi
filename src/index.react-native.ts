import { Schwi } from "./schwi";
import { fetcher } from "./fetchers/native";

export { HeaderMap } from "./headers";
export type { HttpRequest, HttpResponse } from "./schwi";

export default new Schwi(fetcher);
