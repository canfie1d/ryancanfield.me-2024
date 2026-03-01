/// <reference types="vitest" />
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import eslintPlugin from "@nabla/vite-plugin-eslint";

/** Polyfill res.setHeaders for preview server (Netlify plugin may provide a different res object) */
function previewSetHeadersPolyfill() {
  return {
    name: "preview-setheaders-polyfill",
    configurePreviewServer: {
      order: "pre" as const,
      handler(server) {
        server.middlewares.use((req, res, next) => {
          if (typeof res.setHeaders !== "function") {
            res.setHeaders = function (headers: Headers | Map<string, string>) {
              if (headers instanceof Headers) {
                headers.forEach((value, key) => res.setHeader(key, value));
              } else if (headers instanceof Map) {
                headers.forEach((value, key) => res.setHeader(key, value));
              }
            };
          }
          next();
        });
      },
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    previewSetHeadersPolyfill(),
    tanstackStart({
      srcDirectory: "src",
      spa: {
        enabled: true,
        prerender: { enabled: false },
      },
    }),
    netlify(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    svgr(),
    VitePWA({
      manifest: {
        theme_color: "#d3d3d3",
      },
    }),
    // mkcert only for dev server — excluded from build/preview/Playwright to avoid cert issues
    ...(command === "serve" && !isPreview && !process.env.PLAYWRIGHT_TEST && !process.env.VITEST
      ? [
        mkcert({
          savePath: "./certs",
          force: true,
          keyFileName: "net-fn-key.pem",
          certFileName: "net-fn.pem",
        }),
      ]
      : []),
    eslintPlugin(),
  ],

  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
    dedupe: ["react", "react-dom"],
  },
  build: {
    cssMinify: true,
    minify: "esbuild",
    target: "es2022",
    rollupOptions: {
      output: {
        // manualChunks removed: caused circular chunks + getVariableForExportName errors with React Compiler
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        // Server entry must stay as server.js - TanStack preview/prerender expects dist/server/server.js
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === "server" ? "server.js" : "assets/[name]-[hash].js",
      },
    },
    sourcemap: true, // Enable source maps for debugging and Lighthouse insights
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.spec.{ts,tsx}"],
  },
  server: {
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "https://localhost:8888/functions",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
}));
