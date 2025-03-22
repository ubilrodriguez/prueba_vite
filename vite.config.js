import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import typescript from "@rollup/plugin-typescript";

// Configura __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  // Configuración para desarrollo (docs)
  if (command === "serve") {
    return {
      root: "docs",
      server: { open: true },
    };
  }

  // Configuración para build de la librería
  return {
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
      outDir: "dist",
    },
    plugins: [typescript()]
  };
});