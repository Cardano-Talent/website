import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { JobsStatusOptions, PaymentsResourceOptions } from '$lib/types/pocketbase-types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { pbAdmin } from '$lib/server/pocketbase/admin';
import { getExpirationDateUtc } from '$lib/server/getExpirationDateUtc';
import { getUri } from '$lib/server/getUri';
import { createInvoice } from '$lib/server/nowpayments/admin';
import { schema } from './types/schema';
import { PaymentMethods } from '$lib/types/billing';

// V2
// Validate the 5,000 description length limit
// Fix minimum and maximum annual salary fields on client side instead of rely on input type number
// Make google index job listings
// On application method, verify if user is actually entering an URl or entering an Email
// Preview fields on Preview Component

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid || !locals.user) return fail(400, { form });

		const tier = url.searchParams.get('tier');

		const companyId = locals.user.id;
		const isCompanyNonProfit = locals.user.non_profit;

		if (tier !== 'free' && tier !== 'prime') redirect(303, '/post-a-job');

		const isFreeTier = tier === 'free';

		// TODO: Keep limit
		// if (isFreeTier) {
		// 	const admin = await pbAdmin();

		// 	const response = await admin
		// 		.collection('jobs')
		// 		.getFirstListItem(`(company="${companyId}" && tier="free")`)
		// 		.catch(() => {});

		// 	if (response && response.id) {
		// 		return setError(
		// 			form,
		// 			'application_method_value',
		// 			'⚠️ This account already published a free job listing ⚠️'
		// 		);
		// 	}
		// }

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = {
			company: companyId,
			tier,
			status: tier === 'free' ? JobsStatusOptions.active : JobsStatusOptions.inactive,
			expiration_date: getExpirationDateUtc(tier),
			uri: getUri(form.data.title),
			title: form.data.title,
			description: form.data.description_html,
			type: form.data.type,
			location: form.data.location,
			remote_only: form.data.remote_only,
			category: form.data.category,
			salary_min: form.data.salary_start,
			salary_max: form.data.salary_end,
			salary_currency: form.data.salary_currency,
			application_method: form.data.application_method,
			application_method_value: form.data.application_method_value
		};

		const admin = await pbAdmin();

		await admin
			.collection('jobs')
			.create(data)
			.then(async (response) => {
				const { id, uri } = response;

				if (isFreeTier) redirect(307, `/jobs/${id}-${uri}`);

				if (form.data.payment_method === PaymentMethods.card) {
					redirect(307, `/billing/card?resource=${PaymentsResourceOptions.job_listing}&id=${id}`);
				}

				if (form.data.payment_method === PaymentMethods.crypto) {
					const invoiceUrl = await createInvoice(
						PaymentsResourceOptions.job_listing,
						id,
						isCompanyNonProfit
					);

					if (invoiceUrl) redirect(307, invoiceUrl);
				}
			});
	}
};
