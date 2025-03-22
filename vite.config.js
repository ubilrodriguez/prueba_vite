import path from "path";
import { defineConfig } from "vite";
import Banner from "vite-plugin-banner";
import pkg from "./package.json" assert { type: "json" }; // Usar assert para JSON
import friendlyTypeImports from "rollup-plugin-friendly-type-imports";
import { fileURLToPath } from "url"; // Necesario para __dirname en ES Modules

// Equivalente a __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    base: "./",
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Kalidokit",
            fileName: (format) => `kalidokit.${format}.js`,
        },
        rollupOptions: {
            exports: "named",
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [
        Banner(
            `/**\n * @${pkg.name} v${pkg.version}\n * ${pkg.description}\n * \n * @license\n * Copyright (c) ${pkg.year} ${pkg.author}\n * SPDX-License-Identifier: ${pkg.license} \n * ${pkg.homepage}\n */`
        ),
        friendlyTypeImports(),
    ],
});