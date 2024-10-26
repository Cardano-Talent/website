import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { pbAdmin } from '$lib/server/pocketbase/admin';

const schema = z.object({
	email: z.string({ message: 'Email is required' }).email({ message: 'Enter a valid email' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'You must enter a password' })
		.min(8, { message: 'Passowrd is too short' })
});

export const load = async ({ locals }) => {
	const form = await superValidate(zod(schema));

	if (locals.pb.authStore.isValid) redirect(303, '/');

	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) return fail(400, { form });

		try {
			const data = await locals.pb
				.collection('companies')
				.authWithPassword(form.data.email, form.data.password);

			if (!data.record.verified) {
				const admin = await pbAdmin();

				await admin.collection('companies').requestVerification(form.data.email);
				locals.pb.authStore.clear();
				return setError(
					form,
					'password',
					'You must verify your email before you can login\nPlease go check your inbox'
				);
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			return setError(form, 'password', 'Invalid Email or Password');
		}

		const r = url.searchParams.get('r');

		if (r) redirect(303, r);

		redirect(303, '/');
	}
};
