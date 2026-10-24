import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: {
    port: 3000,
    open: true,
  },
  base: process.env.NODE_ENV === "production" ? "/website" : "/",
  publicDir: "public",
  build: {
    outDir: "docs",
    sourcemap: true,
  },
});
