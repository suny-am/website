import { readdirSync } from "node:fs";
import { defineConfig } from "vite";

const base = process.env.NODE_ENV === "production" ? "/website" : "/";

const VITE_ILLUST_FILE_COUNT =
  parseInt(readdirSync("./public/illustrations").length.toString()) - 1;
const VITE_CONCEPT_FILE_COUNT =
  parseInt(readdirSync("./public/concepts").length.toString()) - 1;

console.log(`ILLUST_FILE_COUNT: ${VITE_ILLUST_FILE_COUNT}`);
console.log(`CONCEPT_FILE_COUNT: ${VITE_CONCEPT_FILE_COUNT}`);

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "import.meta.env.VITE_ILLUST_FILE_COUNT": VITE_ILLUST_FILE_COUNT,
    "import.meta.env.VITE_CONCEPT_FILE_COUNT": VITE_CONCEPT_FILE_COUNT,
  },
  server: {
    port: 3000,
    open: true,
  },
  base,
  publicDir: "public",
  build: {
    outDir: "docs",
    sourcemap: true,
  },
});
