<script lang="ts">
	import '../app.css';
	import 'quill/dist/quill.snow.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { currentUser } from '$lib/stores/user';

	// Set the current user from the data passed in from the server
	export let data;
	// @ts-expect-error TODO: research auth collection with custom fields
	$: currentUser.set(data.user);
</script>

<ModeWatcher />
<Toaster />
<slot />
