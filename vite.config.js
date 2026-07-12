import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sample: resolve(__dirname, "sample.html"),
        home: resolve(__dirname, "home.html"),
        loadingempower: resolve(__dirname, "loadingempower.html"),
        pages: resolve(__dirname, "page1.html"),
      },
    },
  },
});
