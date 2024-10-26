<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Logo } from '$lib/components/ui/logo';
	import { Seo } from '$lib/components/seo';

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import MailSearch from 'lucide-svelte/icons/mail-search';
	import BriefCase from 'lucide-svelte/icons/briefcase-business';

	export let data: PageData;

	const { form, message, errors, constraints, delayed, enhance } = superForm(data.form, {
		autoFocusOnError: true,
		scrollToError: true
	});

	$: {
		if ($message) setTimeout(() => goto('/login', { replaceState: true }), 20000);
	}
</script>

<Seo title="Sign Up - Cardano Talent" />

<main class="flex min-h-svh items-center justify-center">
	<section class="mx-auto min-h-[590px] w-full max-w-md flex flex-col gap-4">
		<form method="POST" use:enhance>
			<Button href="/" class="mb-4 opacity-75" variant="ghost">
				<ChevronLeft class="mr-2 h-4 w-4" />
				Home
			</Button>

			{#if $message}
				<Card.Root class="border-none shadow-none">
					<Card.Header class="space-y-1">
						<Logo type="symbol" size="w-12" />

						<Card.Title class="text-2xl">Check your email</Card.Title>

						<Card.Description class="text-base">
							For security purposes you need to verify your account email, we sent you a
							verification message to your inbox
						</Card.Description>

						<Card.Description class="text-foreground">
							You will be redirected to the login page in a few seconds
						</Card.Description>
					</Card.Header>

					<Card.Content>
						<Alert.Root>
							<MailSearch class="h-4 w-4" />

							<Alert.Description>
								Go check <Badge variant="secondary">{$message}</Badge> inbox
							</Alert.Description>
						</Alert.Root>
					</Card.Content>
				</Card.Root>
			{:else}
				<Card.Root class="border-none shadow-none mb-4">
					<Alert.Root>
						<BriefCase class="h-4 w-4" />
						<Alert.Title>Are you looking for a Gig, Bounty or a Job?</Alert.Title>
						<Alert.Description>
							<p>
								We are actively building a Gigs and Talent Pool for Cardanians. Follow our social
								media channels for the latest updates!
							</p>
							<Button href="/job-alert" variant="secondary" class="mt-2 text-xs">Learn more</Button>
						</Alert.Description>
					</Alert.Root>
				</Card.Root>

				<Card.Root class="border-none shadow-none">
					<Card.Header class="space-y-1">
						<Logo type="symbol" size="w-12" />
						<Card.Title class="text-2xl">Sign Up as an Employer</Card.Title>

						<Card.Description>
							Already have an account?
							<a href="/login" class="text-primary underline font-medium">Log in</a>
						</Card.Description>
					</Card.Header>

					<Card.Content class="grid gap-4">
						<!-- <div class="grid grid-cols-2 gap-6">
							<Button disabled={$delayed} variant="outline">
								<Icons.github class="mr-2 h-4 w-4" />
								Sign up with GitHub
							</Button>

							<Button disabled={$delayed} variant="outline">
								<Icons.google class="mr-2 h-4 w-4" />
								Sign up with Google
							</Button>
						</div>

						<div class="relative w-full">
							<div class="absolute inset-0 flex items-center">
								<span class="w-full border-t border-border/40" />
							</div>
							<div class="relative flex justify-center text-xs uppercase">
								<span class="bg-card text-muted-foreground px-2"> OR </span>
							</div>
						</div> -->

						<div class="grid gap-2">
							<Label for="email">Company Email</Label>

							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								bind:value={$form.email}
								{...$constraints.email}
							/>

							{#if $errors.email}
								<span class="px-2 mb-4 text-red-600 border-l-2 border-red-500 dark:text-red-400">
									{$errors.email}
								</span>
							{/if}
						</div>

						<div class="grid gap-2">
							<Label for="password">Password</Label>

							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Enter the password"
								bind:value={$form.password}
								{...$constraints.password}
							/>

							{#if $errors.password}
								<span class="px-2 mb-4 text-red-600 border-l-2 border-red-500 dark:text-red-400">
									{$errors.password}
								</span>
							{/if}
						</div>

						<div class="grid gap-2">
							<Label for="confirm">Password Confirmation</Label>

							<Input
								id="confirm"
								name="confirm"
								type="password"
								placeholder="Confirm the password"
								bind:value={$form.confirm}
								{...$constraints.confirm}
							/>

							{#if $errors.confirm}
								<span class="px-2 mb-4 text-red-600 border-l-2 border-red-500 dark:text-red-400">
									{$errors.confirm}
								</span>
							{/if}
						</div>
					</Card.Content>

					<Card.Footer class="flex flex-col gap-4">
						<p class="text-xs text-muted-foreground text-center">
							By signing up, you agree to our
							<a href="/terms" class="text-primary"> Terms of Service </a> and our
							<a href="/privacy-policy" class="text-primary"> Privacy Policy </a>
						</p>

						<Button disabled={$delayed} type="submit" class="w-full">Sign Up</Button>
					</Card.Footer>
				</Card.Root>
			{/if}
		</form>
	</section>
</main>
