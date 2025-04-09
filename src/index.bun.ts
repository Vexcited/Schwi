import { Schwi } from "./schwi";
import { fetcher } from "./fetchers/undici";

export { HeaderMap } from "./headers";
export type { HttpRequest, HttpResponse } from "./schwi";

export default new Schwi(fetcher);
