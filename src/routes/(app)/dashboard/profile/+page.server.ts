import { message, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { pbAdmin } from '$lib/server/pocketbase/admin';
import { profile_schema, picture_schema } from './schema';

export const load = async ({ locals }) => {
	const pictureForm = await superValidate(zod(picture_schema));
	const profileForm = await superValidate(zod(profile_schema));

	if (!locals.pb.authStore.isValid || !locals.user) redirect(303, '/');

	profileForm.data = {
		about: locals.user.about,
		crunchbase: locals.user.crunchbase,
		discord: locals.user.discord,
		facebook: locals.user.facebook,
		linkedIn: locals.user.linkedIn,
		location: locals.user.location,
		name: locals.user.name,
		size: locals.user.size,
		source: locals.user.source,
		tagline: locals.user.tagline,
		telegram: locals.user.telegram,
		twitter: locals.user.twitter,
		website: locals.user.website
	};

	return { profileForm, pictureForm };
};

export const actions: Actions = {
	profile: async ({ locals, request }) => {
		const form = await superValidate(request, zod(profile_schema));

		if (!form.valid || !locals.user) return fail(400, { form });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = {
			name: form.data.name,
			tagline: form.data.tagline,
			about: form.data.about,
			size: form.data.size,
			location: form.data.location,
			linkedIn: form.data.linkedIn,
			twitter: form.data.twitter,
			facebook: form.data.facebook,
			crunchbase: form.data.crunchbase,
			discord: form.data.discord,
			telegram: form.data.telegram,
			website: form.data.website,
			source: form.data.source
		};

		try {
			const admin = await pbAdmin();

			return await admin
				.collection('companies')
				.update(locals.user.id, data)
				.then(() => message(form, 'complete'));

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			return fail(500, { form });
		}
	},
	picture: async ({ locals, request }) => {
		const form = await superValidate(request, zod(picture_schema));

		if (!form.valid || !locals.user) return fail(400, { form });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = {
			profile_picture: form.data.profile_picture
		};

		try {
			const admin = await pbAdmin();

			return await admin
				.collection('companies')
				.update(locals.user.id, data)
				.then(() => message(form, 'complete'));

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			return fail(500, { form });
		}
	}
};
