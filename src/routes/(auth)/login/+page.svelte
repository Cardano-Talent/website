<script lang="ts">
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Logo } from '$lib/components/ui/logo';
	import { Seo } from '$lib/components/seo';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';

	export let data: PageData;

	const { form, errors, constraints, delayed, enhance } = superForm(data.form, {
		resetForm: true,
		autoFocusOnError: true,
		scrollToError: true
	});
</script>

<Seo title="Log In - Cardano Talent" />

<main class="flex min-h-svh items-center justify-center">
	<section class="mx-auto min-h-[590px] w-full max-w-md flex flex-col gap-4">
		<form method="POST" use:enhance>
			<Button href="/" class="mb-4 opacity-75" variant="ghost">
				<ChevronLeft class="mr-2 h-4 w-4" />
				Home
			</Button>

			<Card.Root class="border-none shadow-none">
				<Card.Header class="space-y-1">
					<Logo type="symbol" size="w-12" />
					<Card.Title class="text-2xl">Log in to Cardano Talent</Card.Title>

					<Card.Description>
						Don't have an account?
						<a href="/sign-up/company" class="text-primary underline font-medium">Sign up</a>
					</Card.Description>
				</Card.Header>

				<Card.Content class="grid gap-4">
					<!-- <div class="grid grid-cols-2 gap-6">
						<Button disabled={$delayed} variant="outline">
							<Icons.github class="mr-2 h-4 w-4" />
							GitHub
						</Button>

						<Button disabled={$delayed} variant="outline">
							<Icons.google class="mr-2 h-4 w-4" />
							Google
						</Button>
					</div>

					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<span class="w-full border-t border-border/40" />
						</div>
						<div class="relative flex justify-center text-xs uppercase">
							<span class="bg-card text-muted-foreground px-2"> OR </span>
						</div>
					</div> -->

					{#if $errors.password}
						<span class="px-2 py-1 mb-4 text-red-600 border-l-2 border-red-500 dark:text-red-400">
							{$errors.password}
						</span>
					{/if}

					<div class="grid gap-2">
						<Label for="email">Email</Label>

						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							bind:value={$form.email}
							{...$constraints.email}
						/>
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
					</div>

					<a
						href="/login/recover"
						class="text-foreground/80 hover:text-primary transition-colors text-sm"
					>
						Forgot password?
					</a>
				</Card.Content>

				<Card.Footer>
					<Button disabled={$delayed} type="submit" class="w-full">Sign in</Button>
				</Card.Footer>
			</Card.Root>

			<p class="text-xs text-muted-foreground text-center">
				By signing in, you agree to our
				<a href="/terms" class="text-primary"> Terms of Service </a> and
				<a href="/privacy-policy" class="text-primary"> Privacy Policy </a>
			</p>
		</form>
	</section>
</main>
