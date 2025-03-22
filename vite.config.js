import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Banner from "vite-plugin-banner";
import pkg from "./package.json" assert { type: "json" };

// Configuración de rutas
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsPath = path.resolve(__dirname, "docs");

export default defineConfig(({ command }) => ({
  // Configuración base para todos los entornos
  plugins: [
    Banner(
      `/**\n * ${pkg.name} v${pkg.version}\n * ${pkg.description}\n * ${pkg.homepage}\n */`
    )
  ],

  // Configuración común para desarrollo y producción
  root: docsPath,
  publicDir: path.join(docsPath, "public"),
  
  build: {
    outDir: "../dist",  // Carpeta de salida fuera de docs
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(docsPath, "index.html")  // Entrada principal
      }
    }
  },

  server: {
    open: true,
    port: 3000
  }
}));