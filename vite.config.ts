import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/mixedbread": {
        target: "https://api.mixedbread.ai/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mixedbread/, ""),
      },
    },
  },
});
