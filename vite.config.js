const path = require("path");
const { defineConfig } = require("vite");
import vite_d_ts from "vite-plugin-dts";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "libComponents",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "lib"),
      lib: path.resolve(__dirname, "lib"),
    },
  },
  plugins: [vite_d_ts()],
});
