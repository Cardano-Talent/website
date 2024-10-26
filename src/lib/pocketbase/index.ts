import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$lib/types/pocketbase-types';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';

export const createInstance = () => {
	return new PocketBase(PUBLIC_POCKETBASE_HOST) as TypedPocketBase;
};

export const pb = createInstance();
