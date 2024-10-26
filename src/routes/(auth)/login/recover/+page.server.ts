import { message, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	email: z.string({ message: 'Email is required' }).email({ message: 'Enter a valid email' })
});

export const load = async ({ locals }) => {
	const form = await superValidate(zod(schema));

	if (locals.pb.authStore.isValid) redirect(303, '/');

	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) return fail(400, { form });

		return await locals.pb
			.collection('companies')
			.requestPasswordReset(form.data.email)
			.then(() => message(form, 'complete'));
	}
};
