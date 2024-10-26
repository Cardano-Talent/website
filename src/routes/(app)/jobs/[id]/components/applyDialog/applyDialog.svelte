<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { JobsApplicationMethodOptions } from '$lib/types/pocketbase-types';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import MessageSquareShare from 'lucide-svelte/icons/message-square-share';
	import CopyIcon from 'lucide-svelte/icons/copy';
	import ExternalLinkIcon from 'lucide-svelte/icons/external-link';
	import MailIcon from 'lucide-svelte/icons/mail';

	export let companyName: string;
	export let jobTitle: string;
	export let applicationMethod: JobsApplicationMethodOptions;
	export let applicationMethodValue: string;
</script>

<Separator />

<Card.Footer class="mt-4 flex flex-col items-start">
	<Dialog.Root>
		<Dialog.Trigger class="w-full xl:w-auto">
			<Button class="w-full xl:w-auto px-16 mb-2">
				<MessageSquareShare class="w-4 h-4 mr-1" /> Apply for this job
			</Button>
		</Dialog.Trigger>

		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Apply to {companyName}</Dialog.Title>
				<Dialog.Description>
					{jobTitle}
				</Dialog.Description>
			</Dialog.Header>

			<Separator />

			{#if applicationMethod === JobsApplicationMethodOptions.email}
				<div class="grid gap-2 py-2">
					<p class="font-medium">To apply, send your information to this email</p>

					<Badge variant="outline" class="text-center text-base mb-4 select-text">
						{applicationMethodValue}
					</Badge>

					<p class="text-xs">
						Tip: Reach out to {companyName} and introduce yourself. Let them know a bit about you, what
						you're seeking, or what drew you to {companyName}
					</p>

					<span class="text-xs text-muted-foreground">
						We wish you the best of luck with your application and hope for a positive outcome.
						Mentioning <strong>Cardano Talent</strong> when applying helps us attract more companies.
						Thanks!
					</span>
				</div>

				<Dialog.Footer>
					<Button
						variant="outline"
						class="flex-1"
						on:click={() => {
							navigator.clipboard.writeText(applicationMethodValue);
							toast.success('Email has been copied to your clipboard!');
						}}
					>
						<CopyIcon class="w-4 h-4 mr-1" /> Copy
					</Button>

					<Button
						class="flex-1 text-white"
						rel="noopener noreferrer"
						href="mailto:{applicationMethodValue}"
					>
						<MailIcon class="w-4 h-4 mr-1" /> Contact
					</Button>
				</Dialog.Footer>
			{:else}
				<div class="grid gap-2 py-2">
					<p class="font-medium">You'll be redirected to an external site to apply</p>

					<span class="text-xs text-muted-foreground">
						We are not responsible for privacy and security on third party sites
					</span>

					<span class="text-xs text-muted-foreground">
						We wish you the best of luck with your application and hope for a positive outcome.
						Mentioning <strong>Cardano Talent</strong> when applying helps us attract more companies.
						Thanks!
					</span>
				</div>

				<Dialog.Footer>
					<Button
						href={applicationMethodValue}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full text-white"
					>
						<ExternalLinkIcon class="w-4 h-4 mr-1" /> Proceed
					</Button>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>

	<span class="text-center xl:text-start text-xs text-muted-foreground">
		Mentioning <strong>Cardano Talent</strong> when applying helps us attract more companies. Thanks!
	</span>
</Card.Footer>
