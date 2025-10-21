import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs-extra';
import { resolve } from 'path';

// Plugin to copy static assets
const copyStaticAssets = () => {
  return {
    name: 'copy-static-assets',
    writeBundle() {
      const srcDir = resolve(__dirname, 'src');
      const distDir = resolve(__dirname, 'dist');
      
      try {
        // Copy img directory
        fs.copySync(resolve(srcDir, 'img'), resolve(distDir, 'src/img'), {
          overwrite: true,
          preserveTimestamps: true
        });
        
        // Copy video directory
        fs.copySync(resolve(srcDir, 'video'), resolve(distDir, 'src/video'), {
          overwrite: true,
          preserveTimestamps: true
        });
        
        console.log('✅ Static assets copied successfully');
      } catch (error) {
        console.error('❌ Error copying static assets:', error);
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyStaticAssets()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
