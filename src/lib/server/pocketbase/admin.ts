import { createInstance } from '$lib/pocketbase';
import {
	SECRET_POCKETBASE_ADMIN_EMAIL,
	SECRET_POCKETBASE_ADMIN_PASSWORD
} from '$env/static/private';

export const pbAdmin = async () => {
	const pb = createInstance();

	await pb.admins.authWithPassword(
		SECRET_POCKETBASE_ADMIN_EMAIL,
		SECRET_POCKETBASE_ADMIN_PASSWORD,
		{
			cache: 'no-store'
		}
	);

	return pb;
};
