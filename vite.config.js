import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("dariooo", `${__dirname}/src/components`);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map "@components" to the actual path of your components directory
      "#root": __dirname,

      "#components": path.resolve(__dirname, "src/components"),
    },
  },
  // "#components": `${__dirname}/src/components`,
  root: path.resolve(__dirname),
});
