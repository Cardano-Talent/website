import { pb } from '$lib/pocketbase';
import { currentUser } from '$lib/stores/user';

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
	// @ts-expect-error TODO: research auth collection with custom fields
	currentUser.set(pb.authStore.model);
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
}, true);
