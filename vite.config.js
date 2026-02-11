import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy các yêu cầu bắt đầu bằng /api/v1
      "/api/v1": {
        target: "http://localhost:2811",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
