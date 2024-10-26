import type { AuthModel } from 'pocketbase';
import type { CompaniesRecord } from '$lib/types/pocketbase-types';
import { writable } from 'svelte/store';

export const currentUser = writable<(AuthModel & CompaniesRecord) | undefined>();
