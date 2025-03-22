import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import typescript from "@rollup/plugin-typescript";
import Banner from "vite-plugin-banner";
import pkg from "./package.json" assert { type: "json" };

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  // Configuración base común
  const baseConfig = {
    plugins: [
      Banner(
        `/**\n * @${pkg.name} v${pkg.version}\n * ${pkg.description}\n * \n * @license\n * Copyright (c) ${pkg.year} ${pkg.author}\n * SPDX-License-Identifier: ${pkg.license}\n * ${pkg.homepage}\n */`
      ),
      typescript({
        tsconfig: "./tsconfig.json",
        rootDir: "src", // Asegura que TypeScript use la carpeta correcta
      }),
    ],
  };

  // Desarrollo: Sirve la documentación desde /docs
  if (command === "serve") {
    return {
      ...baseConfig,
      root: "docs", 
      server: {
        open: true,
        port: 3000, // Puerto explícito para evitar conflictos
      },
      publicDir: "docs/public", // Carpeta para assets estáticos
    };
  }

  // Build: Compila la librería desde /src
  return {
    ...baseConfig,
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "Kalidokit",
        fileName: (format) => `kalidokit.${format}.js`,
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {},
          dir: "dist", // Directorio final de la build
        },
      },
      sourcemap: true, // Genera sourcemaps para depuración
    },
  };
});