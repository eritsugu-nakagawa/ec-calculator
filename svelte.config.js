import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      prependData: `@use './src/styles/global.scss';`,
    },
  }),
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          '@lib': path.resolve('./src/lib'),
          '@store': path.resolve('./src/store'),
          '@components': path.resolve('./src/components'),
        },
      },
    },
  },
};

export default config;
