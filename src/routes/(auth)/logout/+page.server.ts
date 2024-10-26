import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = null;
		redirect(303, '/');
	}
};
