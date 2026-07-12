import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/", // Recommended for standard Netlify deployments
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sample: resolve(__dirname, "sample.html"),
        home: resolve(__dirname, "home.html"),
        loadingempower: resolve(__dirname, "loadingempower.html"),
        presentation2026: resolve(__dirname, "presentation2026.html"), // Added this line
      },
    },
  },
});
