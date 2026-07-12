import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

// 1. Manual root pages
const entries = {
  main: resolve(__dirname, "index.html"),
  sample: resolve(__dirname, "sample.html"),
  home: resolve(__dirname, "home.html"),
  loadingempower: resolve(__dirname, "loadingempower.html"),
  presentation2026: resolve(__dirname, "presentation2026.html"),
};

// 2. Automatically find and add all page1.html, page2.html... files
const pagesDir = resolve(__dirname, "src/pages");

// List the files inside src/pages that should NOT be treated as main pages
const filesToIgnore = ["footer.html", "header.html", "page-nav.html"];

if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir);

  files.forEach((file) => {
    // Only include HTML files, and skip your partial layout components
    if (file.endsWith(".html") && !filesToIgnore.includes(file)) {
      const name = file.replace(".html", "");
      entries[name] = resolve(pagesDir, file);
    }
  });
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: entries,
    },
  },
});
