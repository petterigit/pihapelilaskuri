import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import unocssPlugin from 'unocss/vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    solidPlugin(),
    unocssPlugin(),
    { ...eslintPlugin(), apply: 'build' },
    {
      ...eslintPlugin({
        failOnWarning: false,
        failOnError: false,
        cache: true,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
