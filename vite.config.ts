import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import eslintPlugin from "@nabla/vite-plugin-eslint";

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: "src",
      spa: {
        enabled: true,
        prerender: { enabled: false },
      },
    }),
    netlify(),
    react(),
    svgr(),
    VitePWA({
      manifest: {
        theme_color: "#d3d3d3",
      },
    }),
    mkcert({
      savePath: "./certs",
      force: true,
      keyFileName: "net-fn-key.pem",
      certFileName: "net-fn.pem",
    }),
    eslintPlugin(),
  ],

  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
    // mkcert plugin provides https cert paths (force: true)
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
