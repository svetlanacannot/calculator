/** @type {import('vite').UserConfig} */
export default {
  root: process.cwd(),
  base: '/',
  mode: 'development',
  plugins: [],
  publicDir: './public',
  appType: 'spa',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return 'assets[name]-[hash][extname]'
        },
        entryFileNames: 'calculator/assets/[name]-[hash].js'
      }
    }
  }
}
