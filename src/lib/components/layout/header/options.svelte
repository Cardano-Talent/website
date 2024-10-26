<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { currentUser } from '$lib/stores/user';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { pb } from '$lib/pocketbase';
	import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import PostMenu from '$lib/components/postMenu.svelte';

	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import LogOut from 'lucide-svelte/icons/log-out';
	import User from 'lucide-svelte/icons/user';
	import Settings from 'lucide-svelte/icons/settings';
	import UserSearchIcon from 'lucide-svelte/icons/user-search';
	import HandShakeIcon from 'lucide-svelte/icons/heart-handshake';
</script>

<!-- Cases -->

<!-- #1 unauthenticated -->
{#if !$currentUser}
	<Button href="/login" variant="ghost" class="w-full md:w-auto">Log in</Button>

	<Button href="/sign-up/company" variant="outline" class="w-full md:w-auto">Sign Up</Button>

	<PostMenu>
		<Button class="px-8 w-full md:w-auto">
			<CirclePlus class="mr-2 h-4 w-4" /> Post
		</Button>
	</PostMenu>
{/if}

<!-- #2 authenticated as Company -->
{#if $currentUser}
	<PostMenu>
		<Button class="px-8 w-full md:w-auto">
			<CirclePlus class="mr-2 h-4 w-4" /> Post
		</Button>
	</PostMenu>

	<Popover.Root>
		<Popover.Trigger class="!outline-none w-full md:w-auto">
			<Button variant="outline" class="flex md:hidden items-center gap-2 p-2 py-10 w-full">
				<div class="flex flex-col items-start">
					{#if $currentUser.name}
						<p class="font-medium text-sm inline-block md:hidden">
							{$currentUser.name}
						</p>
					{/if}

					<p class="text-muted-foreground font-medium text-sm inline-block md:hidden">
						{$currentUser.email}
					</p>

					{#if $currentUser.non_profit}
						<Badge class="text-white bg-green-500">
							<HandShakeIcon class="w-4 h-4 mr-1" /> Non-profit
						</Badge>
					{/if}
				</div>

				<Avatar.Root class="mr-4 cursor-pointer !outline-none rounded-md">
					<Avatar.Image
						src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{$currentUser.id}/{$currentUser.profile_picture}?thumb=100x100"
					/>
					<Avatar.Fallback><User class="w-6 h-6 opacity-75" /></Avatar.Fallback>
				</Avatar.Root>
			</Button>

			<Avatar.Root class="hidden md:flex mr-4 cursor-pointer !outline-none">
				<Avatar.Image
					src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{$currentUser.id}/{$currentUser.profile_picture}?thumb=100x100"
				/>
				<Avatar.Fallback><User class="w-6 h-6 opacity-75" /></Avatar.Fallback>
			</Avatar.Root>
		</Popover.Trigger>

		<Popover.Content class="mt-4 grid gap-2 border-border/40">
			<div class="hidden md:flex flex-col items-start">
				{#if $currentUser.name}
					<p class="font-medium text-sm">
						{$currentUser.name}
					</p>
				{/if}

				<p class="text-sm text-muted-foreground">
					{$currentUser.email}
				</p>

				{#if $currentUser.non_profit}
					<Badge class="text-white bg-green-500 mt-1">
						<HandShakeIcon class="w-4 h-4 mr-1" /> Non-profit
					</Badge>
				{/if}
			</div>

			<Popover.Close>
				<Button disabled variant="ghost" class="pl-1 w-full flex justify-between items-center">
					<span>Dashboard</span>

					<!-- <LayoutPanelLeft class="h-4 w-4" /> -->
					<Badge>Coming Soon</Badge>
				</Button>
			</Popover.Close>

			<Popover.Close>
				<Button
					href={`/company/${$currentUser.id}${$currentUser.username ? '-' + $currentUser.username : ''}`}
					variant="ghost"
					class="pl-1 w-full flex justify-between items-center"
				>
					<span>View Company Profile</span>

					<UserSearchIcon class="h-4 w-4" />
				</Button>
			</Popover.Close>

			<Popover.Close>
				<Button
					href="/dashboard/profile"
					variant="ghost"
					class="pl-1 w-full flex justify-between items-center"
				>
					<span>Profile Settings</span>

					<Settings class="h-4 w-4" />
				</Button>
			</Popover.Close>

			<Separator />

			<form
				method="POST"
				action="/logout"
				use:enhance={() => {
					return async ({ result }) => {
						pb.authStore.clear();
						await applyAction(result);
					};
				}}
			>
				<Popover.Close class="w-full">
					<Button
						type="submit"
						variant="ghost"
						class="pl-1 w-full flex justify-between items-center"
					>
						<span>Log Out</span>

						<LogOut class="h-4 w-4" />
					</Button>
				</Popover.Close>
			</form>
		</Popover.Content>
	</Popover.Root>
{/if}

<!-- TODO: #3 authenticated as Talent -->
