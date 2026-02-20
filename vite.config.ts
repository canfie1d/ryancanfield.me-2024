import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";
import oxlintPlugin from "vite-plugin-oxlint";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    Sitemap({
      dynamicRoutes: ["/", "/about", "/work", "/writing", "/contact"],
      generateRobotsTxt: true,
    }),
    VitePWA({
      manifest: {
        theme_color: "#d3d3d3",
      },
    }),
    oxlintPlugin({
      configFile: "./oxlintrc.json",
      path: "./src",
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },

  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  server: {
    port: 3000,
    https: {
      key: "./certs/net-fn-key.pem",
      cert: "./certs/net-fn.pem",
    },
  },
});
