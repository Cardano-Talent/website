import { message, setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { CompaniesStatusOptions } from '$lib/types/pocketbase-types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { pbAdmin } from '$lib/server/pocketbase/admin';

const schema = z
	.object({
		email: z.string({ message: 'Email is required' }).email({ message: 'Enter a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(1, { message: 'You must enter a password' })
			.min(8, { message: 'Password must be at least 8 characters' }),
		confirm: z.string()
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export const load = async ({ locals }) => {
	const form = await superValidate(zod(schema));

	if (locals.pb.authStore.isValid) redirect(303, '/');

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) return fail(400, { form });

		const data = {
			status: CompaniesStatusOptions.active,
			email: form.data.email,
			password: form.data.password,
			passwordConfirm: form.data.confirm
		};

		try {
			const admin = await pbAdmin();

			await admin.collection('companies').create(data);

			return await admin
				.collection('companies')
				.requestVerification(data.email)
				.then(() => message(form, data.email));

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			if (e?.response?.data?.email?.code === 'validation_invalid_email') {
				return setError(form, 'email', 'The email is invalid or already in use');
			}

			return setError(form, 'confirm', 'Invalid request');
		}
	}
};
