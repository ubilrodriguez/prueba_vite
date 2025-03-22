import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import typescript from "@rollup/plugin-typescript"; // Paquete instalado
import Banner from "vite-plugin-banner";
import pkg from "./package.json" assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  root: command === "serve" ? "docs" : __dirname,
  plugins: [
    Banner(`/** ... */`),
    typescript({ tsconfig: "./tsconfig.json" }), // Plugin configurado
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Kalidokit",
      fileName: (format) => `kalidokit.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
}));