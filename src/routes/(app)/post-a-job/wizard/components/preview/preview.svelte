<script lang="ts">
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/user';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
	import { freeJobDurationInDays, primeJobDurationInDays } from '$lib/types/billing';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import User from 'lucide-svelte/icons/user';
	import CheckIcon from 'lucide-svelte/icons/check';
	import HandShakeIcon from 'lucide-svelte/icons/heart-handshake';

	$: tier = $page.url.searchParams.get('tier');
</script>

{#if $currentUser}
	<Card.Root class="lg:sticky lg:top-24">
		<Card.Header class="w-full flex flex-row gap-2 items-center">
			<Avatar.Root>
				<Avatar.Image
					src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{$currentUser.id}/{$currentUser.profile_picture}?thumb=100x100"
				/>
				<Avatar.Fallback><User class="w-6 h-6 opacity-75" /></Avatar.Fallback>
			</Avatar.Root>

			<div class="flex flex-col items-start">
				{#if $currentUser.name}
					<p class="font-medium text-sm">
						{$currentUser.name}
					</p>
				{/if}

				<p class="text-sm text-muted-foreground">
					{$currentUser.email}
				</p>

				<p class="text-xs text-muted-foreground">This e-mail is always <b>PRIVATE</b></p>

				{#if $currentUser.non_profit}
					<Badge class="text-white bg-green-500 mt-1">
						<HandShakeIcon class="w-4 h-4 mr-1" /> Non-profit
					</Badge>
				{/if}
			</div>
		</Card.Header>

		<Separator class="mb-4" />

		<Card.Content class="flex flex-col gap-2">
			<p class="font-semibold">
				Listing tier <Badge class="text-xs rounded-md capitalize" variant="secondary">{tier}</Badge>
			</p>

			{#if tier === 'prime'}
				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">
						Duration <strong>{primeJobDurationInDays} days</strong>
					</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">Post branded with company's logo</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">Custom social card with company's logo</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">Dedicated support</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">And more...</span>
				</div>
			{:else}
				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">
						Duration <strong>{freeJobDurationInDays} days</strong>
					</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">Default banner for social cards</span>
				</div>

				<div class="flex items-center space-x-2">
					<CheckIcon class="h-4 w-4 text-primary" />
					<span class="text-xs">Free posts are limited to one per account </span>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
{/if}
