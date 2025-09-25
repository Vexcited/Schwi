import type { Fetcher } from "../factory";
import { fetch as reactNativeFetch } from "react-native-real-fetch";
import { fetchAdapter } from "./adapters/fetch";

export const fetcher: Fetcher = async (req) => {
  // @ts-expect-error : supports all the properties, except the `credentials` one...
  return fetchAdapter(reactNativeFetch, req);
};
