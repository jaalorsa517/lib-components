/// <reference types="vitest" />

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
      lib: path.resolve(__dirname, "lib"),
      test: path.resolve(__dirname, "test"),
    },
  },
  plugins: [vite_d_ts({
    tsconfigPath: "tsconfig.build.json",
    copyDtsFiles: true,
  })],
  test: {
    typecheck: {
      enabled: true,
      tsconfig: path.resolve(__dirname, "tsconfig.test.json"),
    },
    environment: "jsdom",
    coverage: {
      provider: "v8",
      all: true,
      enabled: true,
      exclude: [
        "test/**",
        "vite.config.ts",
        "dev/**/*",
        "components/**/*",
        "node_modules/**/*",
        "lib/main.ts",
        "lib/**/*.enum.ts",
        "lib/**/*.type.ts",
        "lib/**/*.cls.ts",
        "lib/components/**/index.ts",
        "lib/shared/constantes/**/*",
        "lib/shared/dictionaries/**/*",
        "lib/shared/enums/**/*",
        "lib/shared/interfaces/**/*",
        "lib/shared/types/**/*",
        "lib/shared/models/**/*"
      ],
      reporter: ["json-summary", "html", "text"],
    },
  }
});
