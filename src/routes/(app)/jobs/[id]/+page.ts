import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import { extractBeforeHyphen } from '$lib/extractBeforeHyphen';

// V3
// Show company's other available positions

export const load = async ({ params }) => {
	if (!params.id) return error(404);

	try {
		const jobId = extractBeforeHyphen(params.id);
		const job = await pb.collection('jobs').getOne(jobId, { expand: 'company' });

		return { job };

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return error(404);
	}
};
