import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'; // Adicionando o plugin do Vuetify
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Habilitando a importação automática de componentes Vuetify
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
