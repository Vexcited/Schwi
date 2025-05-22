import { defineConfig, type Options } from "tsup";
import pkg from "./package.json";

const defaults: Options = {
  dts: true,
  external: Object.keys(pkg.optionalDependencies),
  format: ["cjs", "esm"],
  minify: "terser",
  outDir: "dist",
  sourcemap: true,
  treeshake: true
};

export default defineConfig([
  {
    ...defaults,
    clean: true, // Only on the first build !
    entry: [
      "src/index.node.ts"
    ]
  },
  {
    ...defaults,
    entry: [
      "src/index.bun.ts"
    ],
    external: [
      ...<string[]>defaults.external,
      "undici"
    ]
  },
  {
    ...defaults,
    entry: [
      "src/index.tauri.ts"
    ],
    external: [
      ...<string[]>defaults.external,
      "@tauri-apps/plugin-http"
    ]
  },
  {
    ...defaults,
    entry: [
      "src/index.react-native.ts"
    ],
    target: "es6" // Make sure React Native supports the library.
  }
]);
