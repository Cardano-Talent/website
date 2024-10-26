<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/components/ui/icons';
	import { Separator } from '$lib/components/ui/separator';
	import { Seo } from '$lib/components/seo';
	import MailIcon from 'lucide-svelte/icons/mail';
</script>

<Seo title="Job Alerts - Cardano Talent" />

<main
	class="container mx-auto px-4 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center gap-12"
>
	<div class="max-w-3xl text-center space-y-4">
		<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">
			Stay informed with job alerts and latest news via our newsletter
		</h1>

		<p class="text-muted-foreground text-lg md:text-xl text-center">
			Receive the latest job opportunities directly in your inbox or follow us
		</p>
	</div>

	<div class="w-full max-w-xl space-y-4">
		<div class="flex justify-between items-center gap-2">
			<Button
				href="https://x.com/CardanoTalent"
				target="_blank"
				rel="noopener noreferrer"
				variant="outline"
				class="flex-1"
			>
				<Icons.twitter class="mr-2 h-4 w-4" />
				Follow us on Twitter
			</Button>

			<Button
				href="https://discord.gg/MsSYMwBfgd"
				target="_blank"
				rel="noopener noreferrer"
				variant="outline"
				class="flex-1"
			>
				<Icons.discord class="mr-2 h-4 w-4" />
				Join our Discord
			</Button>
		</div>
	</div>
</main>
