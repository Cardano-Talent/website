<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Icons } from '$lib/components/ui/icons';
	import MailIcon from 'lucide-svelte/icons/mail';

	const contactEmail = 'cardanotalent@gmail.com';

	const copyEmail = () => {
		navigator.clipboard.writeText(contactEmail);
		toast.success('Email has been copied to your clipboard!');
	};
</script>

<footer
	class="py-4 w-full bg-background/95 supports-[backdrop-filter]:bg-background/60 mt-8 md:mt-20 flex flex-col"
>
	<section
		class="pb-2 px-4 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 items-center md:justify-between flex-wrap mb-4 md:mb-0"
	>
		<p class="text-muted-foreground text-center text-sm leading-loose md:text-left">
			Legal

			<a href="/terms" class="font-medium underline underline-offset-4"> Terms of Service </a>
			|
			<a href="/privacy-policy" class="font-medium underline underline-offset-4">
				Privacy Policy
			</a>
		</p>

		<div class="flex items-center gap-8 md:gap-4">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						href="mailto:{contactEmail}"
						on:click={copyEmail}
						builders={[builder]}
						variant="outline"
						size="icon"
					>
						<MailIcon class="h-4 w-4" />
					</Button>
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Contact us</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						href="https://x.com/CardanoTalent"
						target="_blank"
						rel="noopener noreferrer"
						builders={[builder]}
						variant="outline"
						size="icon"
					>
						<Icons.twitter class="h-4 w-4" />
					</Button>
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Go to X (Formerly Twitter)</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						href="https://discord.gg/MsSYMwBfgd"
						target="_blank"
						rel="noopener noreferrer"
						builders={[builder]}
						variant="outline"
						size="icon"
					>
						<Icons.discord class="h-4 w-4" />
					</Button>
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Go to Discord</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</section>

	<Separator />

	<section
		class="pt-2 px-4 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between"
	>
		<p class="text-muted-foreground text-center text-sm leading-loose md:text-left">
			Copyright © {new Date().getFullYear()} Cardano Talent. All rights reserved
		</p>

		<p class="text-muted-foreground text-center text-sm leading-loose md:text-right">
			Crafted with ❤️ by <a
				class="underline font-bold"
				href="https://cardano-talent.vercel.app/"
				target="_blank"
			>
				Cardano Talent
			</a>
		</p>
	</section>
</footer>
