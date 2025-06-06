import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   proxy:
  //     mode === "development"
  //       ? {
  //           "/api": {
  //             target: "https://admin.gogomarket.uz", // Целевой сервер
  //             changeOrigin: true, // Изменяет Origin для обхода CORS
  //             rewrite: (path) => path.replace(/^\/api/, ""), // Убираем /api
  //           },
  //         }
  //       : undefined, // В продакшене прокси не используется
  // },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://admin.gogomarket.uz",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "/api/v2"),
  //     },
  //   },
  // },
})
