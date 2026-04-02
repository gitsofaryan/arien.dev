import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/medium-feed": {
        target: "https://medium.com",
        changeOrigin: true,
        rewrite: () => "/feed/@arien7",
      },
      "/youtube-feed": {
        target: "https://www.youtube.com",
        changeOrigin: true,
        rewrite: () => "/feeds/videos.xml?channel_id=UCzEp5zLLp4BirsoJUogUY4A",
      },
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
