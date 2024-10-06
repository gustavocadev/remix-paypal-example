import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { vercelPreset } from '@vercel/remix/vite';

export default defineConfig({
  plugins: [
    reactRouter({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
