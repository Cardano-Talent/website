<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge';
	import { Seo } from '$lib/components/seo';
	import * as Tabs from '$lib/components/ui/tabs';
	import Settings from 'lucide-svelte/icons/settings';
	import Lock from 'lucide-svelte/icons/lock';

	$: value = $page.url.pathname.replace('/dashboard/', '');

	const goToOverview = () => goto('/dashboard/overview');
	const goToAccountSettings = () => goto('/dashboard/profile');
	const goToSecuritySettings = () => goto('/dashboard/security');
	const goToFunding = () => goto('/dashboard/security');
</script>

<Seo title="Account Overview - Cardano Talent" />

<main
	class="w-full flex flex-col items-start justify-start max-w-screen-xl mx-auto gap-8 py-8 px-4"
>
	<Tabs.Root {value}>
		<Tabs.List>
			<Tabs.Trigger value="overview" class="gap-2" on:click={goToOverview} disabled>
				Overview <Badge>Soon</Badge>
			</Tabs.Trigger>

			<Tabs.Trigger value="funding" class="gap-2" on:click={goToFunding} disabled>
				Funding
				<Badge>Soon</Badge>
			</Tabs.Trigger>

			<Tabs.Trigger value="security" class="gap-2" on:click={goToSecuritySettings} disabled>
				Security
				<Badge>Soon</Badge>
			</Tabs.Trigger>

			<Tabs.Trigger value="profile" class="gap-2" on:click={goToAccountSettings}>
				Profile
				<Settings class="h-4 w-4" />
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>

	<div class="w-full flex flex-col gap-4 lg:px-4 space-y-6">
		<slot />
	</div>
</main>
