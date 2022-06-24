import { defineConfig } from 'vite'
import { resolve } from "path";

module.exports = defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        meta: resolve(__dirname, 'meta.png')
      },
      output: {
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
})
