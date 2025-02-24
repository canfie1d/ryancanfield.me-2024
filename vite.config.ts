import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import oxlintPlugin from "vite-plugin-oxlint";
import MillionLint from "@million/lint";

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
    // mkcert({
    //   savePath: "./certs", // save the generated certificate into certs directory
    //   force: true, // force generation of certs even without setting https property in the vite config
    //   keyFileName: "net-fn-key.pem", // the name of the generated private key file
    //   certFileName: "net-fn.pem", // the name of the generated certificate file
    // }),
    MillionLint.vite({
      optimizeDOM: true,
      // production: {
      //   enabled: true,
      //   apiKey: "",
      // },
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
