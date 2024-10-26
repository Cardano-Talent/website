import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({ runtime: 'edge', regions: ['fra1'] }),
		csp: {
			directives: {
				'default-src': [
					'self',
					'https://cardanoskills.com ',
					'https://*.cardanoskills.com',
					'https://cardanotalent.com ',
					'https://*.cardanotalent.com',
					'https://*.umami.is',
					'https://*.umami.dev'
				],
				'img-src': ['self', 'https:'],
				'style-src': ['self', 'unsafe-inline'],
				'script-src': ['self', 'https://*.umami.is', 'https://*.umami.dev']
			}
		}
	}
};

export default config;