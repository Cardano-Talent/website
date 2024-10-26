<script lang="ts">
	import MainHeader from './main.svelte';
	import MobileHeader from './responsive.svelte';
</script>

<header
	class="flex items-center justify-between h-20 px-4 border-b w-full border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 backdrop-blur"
>
	<MainHeader />
	<MobileHeader />
</header>
