import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema, allCategories } from './schema';

export const load = async ({ url }) => {
	try {
		const form = await superValidate(zod(schema));

		const category = url.searchParams.get('category');

		let filter = '';

		// @ts-expect-error Possible unsupported category
		if (category && allCategories.includes(category)) {
			// @ts-expect-error Possible unsupported category
			form.data.category = category;

			filter = pb.filter('category ~ {:category}', {
				category
			});
		}

		const jobs = await pb.collection('jobs').getList(1, 50, { filter, expand: 'company' });

		return { dependencies: ['/jobs'], form, jobs };

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return error(404);
	}
};
