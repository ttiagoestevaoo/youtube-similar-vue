import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "src", "modules"),
      "@providers": path.resolve(__dirname, "src", "providers"),
      "@ui": path.resolve(__dirname, "src", "ui"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
