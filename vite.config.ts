import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";
// import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    Sitemap({
      dynamicRoutes: ["/", "/about", "/work", "/writing", "/contact"],
      generateRobotsTxt: true,
    }),
    VitePWA() /*mkcert()*/,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    port: 3000,
    // https: {
    //   key: "./net-fn-key.pem",
    //   cert: "./net-fn.pem",
    // },
    // open: true,
    // proxy: {
    //   "/api": {
    //     target: "https://localhost:8888/functions",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
