import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import { extractBeforeHyphen } from '$lib/extractBeforeHyphen';

export const load = async ({ params }) => {
	if (!params.id) return error(404);

	try {
		const companyId = extractBeforeHyphen(params.id);
		const company = await pb.collection('companies').getOne(companyId, { expand: 'company' });
		const companyJobs = await pb.collection('jobs').getList(1, 50, {
			filter: pb.filter('company ~ {:companyId}', {
				companyId
			})
		});

		return { company, companyJobs };

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return error(404);
	}
};
