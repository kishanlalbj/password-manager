import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Backend server
        changeOrigin: true,
        secure: false // For development
        // rewrite: (path) => path.replace(/^\/api/, "") // Optional: Remove /api prefix
      }
    }
  }
});