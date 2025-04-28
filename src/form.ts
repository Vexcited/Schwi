export type FormDataFile = ArrayBuffer | Blob | Buffer | File | ReactNativeFileFromURI | Uint8Array;

export interface ReactNativeFileFromURI {
  name: string;
  size: number;
  type: string;
  uri: string;
}
