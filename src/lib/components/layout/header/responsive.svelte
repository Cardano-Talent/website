<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Logo } from '$lib/components/ui/logo';
	import Options from './options.svelte';

	const defaultNavClasses =
		'flex items-center hover:text-foreground/80 transition-colors font-bold';

	import Menu from 'lucide-svelte/icons/menu';
</script>

<div class="w-full flex md:hidden items-center justify-between max-w-screen-xl mx-auto">
	<a href="/">
		<Logo />
	</a>

	<div>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" size="icon">
					<Menu class="h-6 w-6 opacity-70" />
				</Button>
			</Sheet.Trigger>

			<Sheet.Content side="top">
				<Sheet.Header>
					<Logo />
				</Sheet.Header>

				<Sheet.Close asChild let:builder>
					<nav class="flex flex-col justify-center items-center text-2xl gap-6 py-8">
						<Button href="/jobs" variant="ghost" class="w-full" builders={[builder]}>Jobs</Button>

						<Button href="/terms" variant="ghost" class="w-full" builders={[builder]}>
							Terms of Service
						</Button>

						<Button href="/privacy-policy" variant="ghost" class="w-full" builders={[builder]}>
							Privacy Policy
						</Button>

						<Button
							href="https://veil-comma-4dc.notion.site/Cardano-Skills-Roadmap-a5e958f481ef4806ba1c474389c3fd38"
							target="_blank"
							variant="ghost"
							class="w-full"
							builders={[builder]}
						>
							Roadmap
						</Button>
					</nav>
				</Sheet.Close>

				<Sheet.Footer class="flex flex-col items-center justify-center gap-4 w-full">
					<Separator class="my-2" />

					<Options />
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</div>
