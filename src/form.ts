export type ReactNativeFileFromURI = {
  uri: string
  name: string
  type: string
  size: number
};

export type FormDataFile = Blob | File | Buffer | ArrayBuffer | Uint8Array | ReactNativeFileFromURI;
