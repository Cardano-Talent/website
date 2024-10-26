import { z } from 'zod';
import { jobCategories } from '$lib/types/job';

export const allCategories = ['All', ...jobCategories] as const;

export const schema = z.object({
	category: z.enum(allCategories, {
		message: 'Invalid Category',
		required_error: 'You must select a category'
	})
});

export type JobSearchSchema = typeof schema;
