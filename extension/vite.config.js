import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const manifestFile = `manifest.${mode}.json`;
  const outDir = `dist/${mode}`;

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, `./${manifestFile}`),
            dest: "",
            rename: "manifest.json",
          },
          {
            src: path.resolve(__dirname, `./_locales`),
            dest: "",
            rename: "_locales",
          },
        ],
      }),
    ],
    build: {
      outDir,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
    },
  };
});
