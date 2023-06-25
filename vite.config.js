const path = require("path");
const { defineConfig } = require("vite");
import vite_d_ts from "vite-plugin-dts";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "libComponents",
    },
    outDir: "components",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "lib"),
      lib: path.resolve(__dirname, "lib"),
      test: path.resolve(__dirname, "test"),
    },
  },
  plugins: [vite_d_ts()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["dev/**/*", "components/**/*", "node_modules/**/*"],
    coverage: {
      provider: "v8",
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
});
