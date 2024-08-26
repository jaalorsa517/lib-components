import * as path from "path";
import { defineConfig } from "vite";
import vite_d_ts from "vite-plugin-dts";

export default defineConfig({
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
    environment: "jsdom",
    coverage: {
      provider: "v8",
      all: true,
      enabled: true,
      exclude: ["dev/**/*", "components/**/*", "node_modules/**/*"],
      reporter: ["json-summary", "html"],
    },
  }
});
