import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Banner from "vite-plugin-banner";
import pkg from "./package.json" assert { type: "json" };

// Configuración de rutas
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsPath = path.resolve(__dirname, "docs");
// ... (imports previos se mantienen igual)

export default defineConfig(({ command }) => ({
  plugins: [
    Banner(
      `/**\n * ${pkg.name} v${pkg.version}\n * ${pkg.description}\n * ${pkg.homepage}\n */`
    )
  ],

  root: docsPath,
  publicDir: path.join(docsPath, "public"),
  
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "../dist",
    publicDir: "docs/public",
    emptyOutDir: true,
    reportCompressedSize: false,
    rollupOptions: {
      input: {
        main: path.join(docsPath, "index.html")
      },
      output: {
        manualChunks(id) {
          // División más efectiva de chunks
          if (id.includes('node_modules')) {
            // Separa Three.js y sus utilidades
            if (id.includes('three/examples/jsm')) return 'three-extras';
            if (id.includes('three')) return 'three';
            
            // Separa otras librerías pesadas
            if (id.includes('mediapipe')) return 'mediapipe';
            if (id.includes('kalidokit')) return 'kalidokit';
            
            // Todo lo demás de node_modules va a vendor
            return 'vendor';
          }
          
          // Separa código fuente propio si es necesario
          if (id.includes('src/')) return 'app-core';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  optimizeDeps: {
    // Mantén esta exclusión solo si tienes problemas específicos
    exclude: ['three']
  },
  
  server: {
    open: true,
    port: 3000
  }
}));