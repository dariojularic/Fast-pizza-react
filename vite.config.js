import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map "@components" to the actual path of your components directory
      "#root": __dirname,

      "#components": path.resolve(__dirname, "src/components"),
      "#layouts": path.resolve(__dirname, "src/layouts"),
      "#pages": path.resolve(__dirname, "src/pages"),
      "#cartSlice" : path.resolve(__dirname, "src/cartSlice"),
      "#userSlice" : path.resolve(__dirname, "src/userSlice"),
      "#helpers" : path.resolve(__dirname, "src/helpers"),
      "#api" : path.resolve(__dirname, "src/api"),
    },
  },
  root: path.resolve(__dirname),
});
