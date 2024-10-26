import { z } from 'zod';
import {
	JobsTypeOptions,
	JobsCategoryOptions,
	JobsApplicationMethodOptions,
	JobsBenefitsOptions
} from '$lib/types/pocketbase-types';
import { PaymentMethods } from '$lib/types/billing';

export const schema = z.object({
	title: z
		.string({ required_error: 'The title is required' })
		.trim()
		.min(1, { message: 'You must enter the title' })
		.max(64, { message: 'Title must be 64 or fewer characters long' }),
	description: z
		.string()
		.trim()
		.min(1, { message: 'You must enter the description' })
		.max(10000, { message: 'Description must be 10,000 or fewer characters long' }),
	description_html: z.string().trim(),
	type: z.nativeEnum(JobsTypeOptions, {
		message: 'Invalid Type',
		required_error: 'You must select a type'
	}),
	category: z.nativeEnum(JobsCategoryOptions, {
		message: 'Invalid Category',
		required_error: 'You must select a category'
	}),
	salary_start: z.string().optional(),
	salary_end: z.string().optional(),
	salary_currency: z.string().trim().nullable(),
	location: z
		.string({ required_error: 'Job location is required' })
		.trim()
		.min(1, { message: 'You must enter the job location' })
		.max(128, { message: 'Job location must be 128 or fewer characters long' }),
	remote_only: z.boolean(),
	application_method: z.nativeEnum(JobsApplicationMethodOptions, {
		message: 'Invalid method',
		required_error: 'You must select a method'
	}),
	application_method_value: z
		.string({ required_error: 'This field is required' })
		.trim()
		.min(1, { message: 'You must complete this field' }),
	benefits: z.nativeEnum(JobsBenefitsOptions).array().optional(),
	payment_method: z.nativeEnum(PaymentMethods, {
		message: 'Invalid payment method',
		required_error: 'You must select a payment method'
	})
});

export type JobFormSchema = typeof schema;
