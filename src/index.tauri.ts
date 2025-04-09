import { Schwi } from "./schwi";
import { fetcher } from "./fetchers/tauri";

export { HeaderMap } from "./headers";
export type { HttpRequest, HttpResponse } from "./schwi";

export default new Schwi(fetcher);
