<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import NotebookPen from 'lucide-svelte/icons/notebook-pen';
	import GlobeLock from 'lucide-svelte/icons/globe-lock';
	import SquareArrowOutUpRight from 'lucide-svelte/icons/square-arrow-out-up-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import FolderKanban from 'lucide-svelte/icons/folder-kanban';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Logo } from '$lib/components/ui/logo';
	import Options from './options.svelte';

	const defaultNavClasses = 'flex items-center hover:text-foreground transition-colors font-medium';
</script>

<div class="w-full hidden md:flex items-center justify-between max-w-screen-xl mx-auto">
	<section class="flex items-center gap-4">
		<a href="/">
			<Logo />
		</a>

		<nav class="flex items-center gap-6 text-sm">
			<a
				href="/jobs"
				class={cn(
					defaultNavClasses,
					$page.url.pathname.startsWith('/jobs') ? 'text-foreground' : 'text-foreground/70'
				)}
			>
				Jobs
			</a>

			<!-- <a
				href="/company"
				class={cn(
					defaultNavClasses,
					$page.url.pathname.startsWith('/company') ? 'text-foreground' : 'text-foreground/70'
				)}
			>
				Companies
			</a> -->

			<a
				href="/job-alert"
				class={cn(
					defaultNavClasses,
					$page.url.pathname.startsWith('/job-alert') ? 'text-foreground' : 'text-foreground/70'
				)}
			>
				Career alerts
			</a>

			<HoverCard.Root>
				<HoverCard.Trigger class={cn(defaultNavClasses, 'text-foreground/70')}>
					Resources <ChevronDown class="ml-1 h-4 w-4" />
				</HoverCard.Trigger>

				<HoverCard.Content class="w-80 grid gap-1">
					<a
						href="https://veil-comma-4dc.notion.site/Cardano-Skills-Roadmap-a5e958f481ef4806ba1c474389c3fd38"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-accent hover:text-accent-foreground flex items-start space-x-4 rounded-md p-2 pt-4 transition-all"
					>
						<FolderKanban class="mt-px h-5 w-5" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">Roadmap</p>
							<p class="text-muted-foreground text-sm">Get a sneak peek at what's next!</p>
						</div>
					</a>

					<a
						href="/terms"
						class="hover:bg-accent hover:text-accent-foreground flex items-start space-x-4 rounded-md p-2 pt-4 transition-all"
					>
						<NotebookPen class="mt-px h-5 w-5" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">Terms of Service</p>
							<p class="text-muted-foreground text-sm">Visit our terms of service</p>
						</div>
					</a>

					<a
						href="/privacy-policy"
						class="hover:bg-accent hover:text-accent-foreground flex items-start space-x-4 rounded-md p-2 pt-4 transition-all"
					>
						<GlobeLock class="mt-px h-5 w-5" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">Privacy Policy</p>
							<p class="text-muted-foreground text-sm">Visit our privacy policy</p>
						</div>
					</a>

					<a
						href="https://cardanofoundation.org/blog/introduction-cardano-blockchain"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-accent hover:text-accent-foreground flex items-start space-x-4 rounded-md p-2 pt-4 transition-all"
					>
						<SquareArrowOutUpRight class="mt-px h-5 w-5" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">What is Cardano?</p>
							<p class="text-muted-foreground text-sm">Learn more about this blockchain</p>
						</div>
					</a>
				</HoverCard.Content>
			</HoverCard.Root>
		</nav>
	</section>

	<section class="flex gap-2">
		<Options />

		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</section>
</div>
