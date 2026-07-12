import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

// 1. Define your manual root pages
const entries = {
  main: resolve(__dirname, "index.html"),
  sample: resolve(__dirname, "sample.html"),
  home: resolve(__dirname, "home.html"),
  loadingempower: resolve(__dirname, "loadingempower.html"),
  presentation2026: resolve(__dirname, "presentation2026.html"),
};

// 2. Automatically find and add all HTML files inside src/pages/
const pagesDir = resolve(__dirname, "src/pages");

if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir);

  files.forEach((file) => {
    if (file.endsWith(".html")) {
      // e.g., "page1" from "page1.html"
      const name = file.replace(".html", "");
      entries[name] = resolve(pagesDir, file);
    }
  });
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: entries, // Pass the dynamically generated list here
    },
  },
});
