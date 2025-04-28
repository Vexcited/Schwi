import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/index.react-native.ts",
    "src/index.tauri.ts",
    "src/index.node.ts",
    "src/index.bun.ts"
  ],
  format: ["cjs", "esm"],
  minify: "terser",
  outDir: "dist",
  sourcemap: true,
  splitting: false,
  treeshake: true
});
