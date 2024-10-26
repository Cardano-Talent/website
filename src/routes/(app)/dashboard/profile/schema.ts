import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const JOINED_ACCEPTED_IMAGE_TYPES = ACCEPTED_IMAGE_TYPES.join(', ');

export const MAX_MARKETS_LIMIT = 10;

export const picture_schema = z.object({
	profile_picture: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 2000_000, 'Max image size is 2MB')
		.refine(
			(f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		)
});

export const profile_schema = z.object({
	name: z
		.string({ required_error: 'The company name is required' })
		.trim()
		.min(1, { message: 'You must enter the Company Name' })
		.max(64, { message: 'Company name must be 64 or fewer characters long' }),
	tagline: z
		.string({ required_error: 'The tagline or slogan is required' })
		.trim()
		.min(1, { message: 'Please enter a very short description' })
		.max(128, { message: 'This must be 128 or fewer characters long' }),
	about: z
		.string()
		.trim()
		.max(1000, { message: 'Description must be 1,000 or fewer characters long' })
		.optional()
		.or(z.literal('')),
	size: z
		.string()
		.trim()
		.max(32, { message: 'Location must be 32 or fewer characters long' })
		.optional()
		.or(z.literal('')),
	location: z
		.string()
		.trim()
		.max(64, { message: 'Location must be 64 or fewer characters long' })
		.optional()
		.or(z.literal('')),
	linkedIn: z
		.string()
		.trim()
		.max(128)
		.url({ message: 'Enter a valid URL' })
		.optional()
		.or(z.literal('')),
	twitter: z
		.string()
		.trim()
		.max(128)
		.regex(/^[^@]*$/, {
			message: "You can not include the '@', just enter the username"
		})
		.optional()
		.or(z.literal('')),
	facebook: z
		.string()
		.trim()
		.max(128)
		.url({ message: 'Enter a valid URL' })
		.optional()
		.or(z.literal('')),
	crunchbase: z
		.string()
		.trim()
		.max(128)
		.url({ message: 'Enter a valid URL' })
		.optional()
		.or(z.literal('')),
	discord: z
		.string()
		.trim()
		.max(128)
		.url({ message: 'Enter a valid URL' })
		.optional()
		.or(z.literal('')),
	telegram: z
		.string()
		.trim()
		.max(128)
		.regex(/^[^@]*$/, {
			message: "You can not include the '@', just enter the username"
		})
		.optional()
		.or(z.literal('')),
	website: z
		.string()
		.trim()
		.max(128)
		.url({ message: 'Enter a valid URL' })
		.optional()
		.or(z.literal('')),
	source: z.string().trim().max(128).optional().or(z.literal(''))
});

export type ProfileFormSchema = typeof profile_schema;
