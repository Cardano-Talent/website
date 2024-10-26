<script lang="ts">
	import type { JobsCategoryOptions } from '$lib/types/pocketbase-types';
	import { Badge } from '$lib/components/ui/badge';

	export let currentValue: JobsCategoryOptions;
	export let value: JobsCategoryOptions;
	export let onClick;
</script>

<span aria-hidden="true" on:click={onClick}>
	<Badge
		variant={currentValue === value ? 'default' : 'outline'}
		class="px-4 text-sm cursor-pointer"
	>
		{value}
	</Badge>
</span>
