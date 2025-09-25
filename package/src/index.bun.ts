// Working around an issue with `ReadableStream` properties and `node:stream`,
// see https://github.com/oven-sh/bun/issues/19842 for more information.

const kIsClosedPromise = Symbol.for("nodejs.webstream.isClosedPromise");
const OriginalReadableStream = globalThis.ReadableStream;

// @ts-expect-error : monkey patching
globalThis.ReadableStream = function ReadableStream(...args) {
  const instance = Reflect.construct(OriginalReadableStream, args, new.target);
  instance[kIsClosedPromise] = Promise.withResolvers();
  return instance;
};

globalThis.ReadableStream.prototype = OriginalReadableStream.prototype;
Object.setPrototypeOf(globalThis.ReadableStream, OriginalReadableStream);

// -----------------------------------------------------------------------------

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
