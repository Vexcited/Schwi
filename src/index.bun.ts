// @ts-expect-error: undici is not typed with this type of import.
import { Headers } from "undici/lib/web/fetch/headers.js";
//                       ^ import from path to avoid Bun overriding it.

import { HeaderMap, kHeaders } from "./headers";
HeaderMap[kHeaders] = Headers;
export { HeaderMap };

import { factory } from "./factory";
import { fetcher } from "./fetchers/undici";

export * from "./form";
export { HeaderKeys } from "./headers";
export { HttpRequest } from "./request";
export { HttpResponse } from "./response";

export const send = factory(fetcher);
