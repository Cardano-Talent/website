<script lang="ts">
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Logo } from '$lib/components/ui/logo';
	import { Seo } from '$lib/components/seo';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import MailSearch from 'lucide-svelte/icons/mail-search';

	export let data: PageData;

	const { form, message, constraints, delayed, enhance } = superForm(data.form, {
		resetForm: true,
		autoFocusOnError: true,
		scrollToError: true
	});
</script>

<Seo title="Recover Account - Cardano Talent" />

<main class="flex min-h-svh items-center justify-center">
	<section class="mx-auto min-h-[590px] w-full max-w-md flex flex-col gap-4">
		<form method="POST" use:enhance>
			<Button href="/login" class="mb-4 opacity-75" variant="ghost">
				<ChevronLeft class="mr-2 h-4 w-4" />
				Login
			</Button>

			<Card.Root class="border-none shadow-none">
				<Card.Header class="space-y-1">
					<Logo type="symbol" size="w-12" />
					<Card.Title class="text-2xl">Reset password</Card.Title>

					<Card.Description>
						Include the email address associated with your account and we'll send you an email with
						instructions to reset your password.
					</Card.Description>
				</Card.Header>

				{#if $message}
					<Alert.Root>
						<MailSearch class="h-4 w-4" />
						<Alert.Title>Check your email</Alert.Title>
						<Alert.Description>
							If your email address exists in our database, you will receive a password recovery
							link at your email address in a few minutes
						</Alert.Description>
					</Alert.Root>
				{:else}
					<Card.Content class="grid gap-4">
						<div class="grid gap-2">
							<Label for="email">Send Reset Instructions</Label>

							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								bind:value={$form.email}
								{...$constraints.email}
							/>
						</div>
					</Card.Content>

					<Card.Footer>
						<Button disabled={$delayed} type="submit" class="w-full">Sign in</Button>
					</Card.Footer>
				{/if}
			</Card.Root>
		</form>
	</section>
</main>
