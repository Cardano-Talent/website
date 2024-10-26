<script lang="ts">
	import type { PageData } from './$types.js';
	import { goto, invalidate } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator';
	import { JobListing } from '$lib/components/jobListing';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema, allCategories } from './schema';
	import { Seo } from '$lib/components/seo';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	export let data: PageData;

	$: items = data.jobs.items;
	$: totalItems = data.jobs.totalItems;

	const form = superForm(data.form, {
		autoFocusOnError: true,
		scrollToError: true,
		validators: zodClient(schema)
	});

	const { form: formData } = form;

	$: seoTitle = `Find ${$formData.category || ''} jobs on Cardano Talent`;
	$: seoDescription = `Cardano Talent is the best portal for finding ${$formData.category} jobs for Cardano`;
</script>

<Seo
	title={seoTitle}
	description={seoDescription}
	keywords={`${$formData.category} jobs, Cardano Talent ${$formData.category} jobs, ${$formData.category} jobs on Cardano, Ada ${$formData.category} jobs`}
/>

<section class="w-full flex flex-col jobs-center justify-center gap-6 px-4 py-20">
	<div class="flex flex-col items-center gap-4 md:gap-6">
		<h1
			class="text-center text-2xl md:text-6xl font-bold leading-tight tracking-tighter lg:leading-[1.1] max-w-3xl"
		>
			Find the best <span class="text-primary">Cardano</span> jobs
		</h1>

		<p class="max-w-xl text-center text-lg text-muted-foreground">
			Get hired in a next generation web3 company
		</p>
	</div>
</section>

<section class="w-full max-w-screen-md mx-auto px-4">
	<Card.Root>
		<Card.Header class="flex flex-row items-start gap-2">
			<Form.Field {form} name="category">
				<Form.Control>
					<Form.Label>Category</Form.Label>

					<div class="flex items-center gap-2 flex-wrap">
						<select
							class="w-full border border-border/80 rounded-md py-2 px-4"
							bind:value={$formData.category}
							on:change={async (e) => {
								const newValue = e.currentTarget.value;

								await goto(newValue === 'All' ? '/jobs' : `/jobs?category=${newValue}`, {
									replaceState: true
								}).then(() => invalidate('/jobs'));
							}}
						>
							<option value="" selected disabled> Pick a category</option>

							{#each allCategories as category}
								<option value={category}>
									{category}
								</option>
							{/each}
						</select>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Header>

		<Separator />

		{#if totalItems}
			{#each items as item}
				<JobListing job={item} />
			{/each}
		{:else}
			<section class="flex flex-col items-center justify-center gap-6 py-12 md:py-24">
				<div class="space-y-2 text-center">
					<h2 class="text-xl font-bold tracking-tighter sm:text-4xl">No Results Yet</h2>

					<p class="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
						No results found for your search
					</p>
				</div>
			</section>
		{/if}
	</Card.Root>
</section>
