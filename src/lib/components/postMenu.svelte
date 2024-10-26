<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<slot />
	</HoverCard.Trigger>

	<HoverCard.Content class="w-80 grid gap-1">
		<a
			href="/post-a-job"
			class="hover:bg-accent hover:text-accent-foreground flex items-center space-x-4 rounded-md p-2 pt-4 transition-all"
		>
			<CirclePlus class="mt-px h-5 w-5" />
			<p class="text-sm font-medium leading-none">Post a Job</p>
		</a>

		<span
			class="hover:bg-accent hover:text-accent-foreground flex items-start space-x-4 rounded-md p-2 pt-4 transition-all"
		>
			<div class="space-y-1">
				<p class="text-sm font-medium leading-none flex gap-2 items-center">
					Post a Gig <Badge class="text-xs">Soon</Badge>
				</p>

				<p class="text-muted-foreground text-sm">
					Soon, you'll have the opportunity to participate in bounties or apply for freelance
					projects with top-tier Cardano companies, all through a single, streamlined profile.
				</p>
			</div>
		</span>
	</HoverCard.Content>
</HoverCard.Root>
