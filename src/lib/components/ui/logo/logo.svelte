<script lang="ts">
	import { mode } from 'mode-watcher';

	export let type: 'symbol' | 'full' = 'full';

	$: src = type === 'full' ? ($mode === 'light' ? '/light.svg' : '/dark.svg') : '/symbol.svg';

	export let size = 'size-12';
</script>

<div class="flex items-center gap-1">
	<!-- <img {src} alt="Cardano Talent Logo" class={size} /> -->

	{#if type === 'full'}
		<span class="font-medium"> Cardano Talent </span>
	{/if}
</div>
