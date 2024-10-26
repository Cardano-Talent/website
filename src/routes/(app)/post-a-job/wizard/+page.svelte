<script lang="ts">
	import type { PageData } from './$types.js';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { currentUser } from '$lib/stores/user';
	import { Preview } from './components/preview';
	import { Auth } from './components/auth';
	import { MissingData } from './components/missingData';
	import { schema } from './types/schema';
	import { jobTypes, jobCategories } from '$lib/types/job';
	import { currencies } from '$lib/types/currency';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { CategoryPicker } from './components/categoryPicker';
	import { Editor } from './components/editor';
	import { Switch } from '$lib/components/ui/switch';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import BookPlus from 'lucide-svelte/icons/book-plus';
	import CreditCardIcon from 'lucide-svelte/icons/credit-card';
	import BanknoteIcon from 'lucide-svelte/icons/banknote';

	export let data: PageData;

	const form = superForm(data.form, {
		autoFocusOnError: true,
		scrollToError: true,
		validators: zodClient(schema),
		dataType: 'json',
		validationMethod: 'oninput'
	});

	const { form: formData, enhance, delayed, errors } = form;

	$: tier = $page.url.searchParams.get('tier');
</script>

<main
	class="w-full flex flex-col items-start justify-start max-w-screen-lg mx-auto gap-8 py-8 px-4"
>
	<section class="w-full grid grid-cols-12 gap-4">
		<div class="col-span-12 xl:col-span-8 order-2 xl:order-1">
			{#if !$currentUser}
				<Auth />
			{:else if !$currentUser.name}
				<MissingData />
			{:else}
				<form method="POST" use:enhance>
					<Card.Root>
						<Card.Header>
							<Card.Title>Basic details</Card.Title>
						</Card.Header>

						<Card.Content class="flex flex-col gap-2">
							<Form.Field {form} name="title">
								<Form.Control let:attrs>
									<Form.Label>Job Title <span class="text-destructive">*</span></Form.Label>

									<Input
										placeholder="Enter the job title"
										bind:value={$formData.title}
										{...attrs}
									/>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<section class="flex flex-col gap-2">
								<span class="text-sm font-semibold">
									Job Description <span class="text-destructive">*</span>
								</span>

								<main class="editor-container relative w-full">
									<Editor
										on:input={(event) => {
											$formData.description = event.detail.text;
											$formData.description_html = event.detail.container;
										}}
									/>
								</main>

								{#if $errors.description}
									<Alert.Root variant="destructive" class="my-1">
										<CircleAlert class="h-4 w-4" />
										<Alert.Title>Error</Alert.Title>
										<Alert.Description>{$errors.description}</Alert.Description>
									</Alert.Root>
								{/if}

								<span class="text-muted-foreground text-sm">
									Write a few sentences about the role, what the requirements are, and what it's
									like to work here
								</span>
							</section>
						</Card.Content>

						<Separator />

						<Card.Content class="flex flex-col gap-2 mt-4">
							<Form.Field {form} name="type">
								<Form.Control let:attrs>
									<Form.Label>Employment Type <span class="text-destructive">*</span></Form.Label>

									<Select.Root
										selected={{
											label: $formData.type,
											value: $formData.type
										}}
										onSelectedChange={(s) => {
											s && ($formData.type = s.value);
										}}
									>
										<Select.Trigger {...attrs}>
											<Select.Value placeholder="Select a type" />
										</Select.Trigger>

										<Select.Content>
											{#each jobTypes as type}
												<Select.Item value={type} label={type} />
											{/each}
										</Select.Content>
									</Select.Root>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field {form} name="category">
								<Form.Control let:attrs>
									<Form.Label>Job Category <span class="text-destructive">*</span></Form.Label>

									<div class="flex items-center gap-2 flex-wrap">
										{#each jobCategories as category}
											<CategoryPicker
												onClick={() => ($formData.category = category)}
												currentValue={$formData.category}
												value={category}
											/>
										{/each}
									</div>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Card.Content>

						<Separator />

						<Card.Content class="flex flex-col gap-1 mt-4">
							<Form.Field {form} name="location">
								<Form.Control let:attrs>
									<Form.Label>Job Location <span class="text-destructive">*</span></Form.Label>

									<Input
										placeholder="Enter the job location"
										bind:value={$formData.location}
										{...attrs}
									/>
								</Form.Control>

								<Form.Description>
									Specify the location relevant to this role. If the open position is based in
									London, list the location as 'London, UK'. For location-specific hiring (e.g.,
									Europe, U.S., Japan), indicate the region. Otherwise, use "Worldwide"
								</Form.Description>

								<Form.FieldErrors />
							</Form.Field>

							<Form.Field
								{form}
								name="remote_only"
								class="flex flex-row items-center justify-between rounded-lg border border-border/40 p-4"
							>
								<Form.Control let:attrs>
									<div class="space-y-0.5">
										<Form.Label class="text-base">Remote only</Form.Label>
										<Form.Description>Is this position remote only?</Form.Description>
									</div>
									<Switch includeInput {...attrs} bind:checked={$formData.remote_only} />
								</Form.Control>
							</Form.Field>
						</Card.Content>

						<Separator />

						<Card.Content class="flex flex-col gap-1 mt-4">
							<section class="flex flex-col gap-2 mb-4">
								<span class="text-sm font-semibold"> Annual salary </span>

								<div class="grid grid-cols-12 gap-4">
									<div class="col-span-4">
										<Form.Field {form} name="salary_start">
											<Form.Control let:attrs>
												<Form.Label>Minimum</Form.Label>

												<Input
													placeholder="Minimum"
													type="number"
													bind:value={$formData.salary_start}
													{...attrs}
												/>
											</Form.Control>
											<Form.FieldErrors />
										</Form.Field>
									</div>

									<div class="col-span-4">
										<Form.Field {form} name="salary_end">
											<Form.Control let:attrs>
												<Form.Label>Maximum</Form.Label>

												<Input
													placeholder="Maximum"
													type="number"
													bind:value={$formData.salary_end}
													{...attrs}
												/>
											</Form.Control>
											<Form.FieldErrors />
										</Form.Field>
									</div>

									<div class="col-span-4">
										<Form.Field {form} name="salary_currency">
											<Form.Control let:attrs>
												<Form.Label>Currency</Form.Label>

												<div class="flex items-center gap-2 flex-wrap">
													<select
														class="w-full border border-border/80 h-10 rounded-md"
														bind:value={$formData.salary_currency}
													>
														<option value="" selected disabled> Pick a currency</option>

														{#each currencies as currency}
															<option value={currency}>
																{currency}
															</option>
														{/each}
													</select>
												</div>
											</Form.Control>
											<Form.FieldErrors />
										</Form.Field>
									</div>
								</div>
							</section>

							<Form.Fieldset {form} name="application_method">
								<Form.Legend>What is your preferred method for the candidate to apply?</Form.Legend>

								<Form.Control>
									<RadioGroup.Root bind:value={$formData.application_method}>
										<div class="flex flex-row items-center justify-start gap-4 py-2">
											<div class="flex items-center space-x-3">
												<Form.Control let:attrs>
													<RadioGroup.Item value="url" {...attrs} />
													<Form.Label>Website (URL)</Form.Label>
												</Form.Control>
											</div>

											<div class="flex items-center space-x-3">
												<Form.Control let:attrs>
													<RadioGroup.Item value="email" {...attrs} />
													<Form.Label>Email</Form.Label>
												</Form.Control>
											</div>

											<RadioGroup.Input name="application_method" />
										</div>
									</RadioGroup.Root>
								</Form.Control>
							</Form.Fieldset>

							<Form.Field {form} name="application_method_value">
								<Form.Control let:attrs>
									<Form.Label>
										{$formData.application_method === 'url' ? 'Enter Website URL' : 'Enter E-mail'}
										<span class="text-destructive">*</span>
									</Form.Label>

									<Input bind:value={$formData.application_method_value} {...attrs} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Card.Content>

						{#if tier === 'prime'}
							<Separator />

							<Card.Content class="flex flex-col gap-2 mt-4">
								<Form.Fieldset {form} name="payment_method">
									<Form.Legend>What is your preferred payment method?</Form.Legend>

									<Form.Control>
										<RadioGroup.Root bind:value={$formData.payment_method}>
											<div class="flex flex-row items-center justify-start gap-4 py-2">
												<!-- <div class="flex items-center space-x-3">
													<Form.Control let:attrs>
														<RadioGroup.Item value="card" {...attrs} />
														<Form.Label class="flex items-center gap-1">
															<CreditCardIcon class="w-4 h-4" /> Card
														</Form.Label>
													</Form.Control>
												</div> -->

												<div class="flex items-center space-x-3">
													<Form.Control let:attrs>
														<RadioGroup.Item value="crypto" {...attrs} />
														<Form.Label class="flex items-center gap-1">
															<BanknoteIcon class="w-4 h-4" /> Crypto
														</Form.Label>
													</Form.Control>
												</div>

												<RadioGroup.Input name="payment_method" />
											</div>
										</RadioGroup.Root>
									</Form.Control>
								</Form.Fieldset>
							</Card.Content>
						{/if}

						<Card.Footer>
							<Form.Button class="px-8 w-full" disabled={$delayed || !$errors}>
								<BookPlus class="w-4 h-4 mr-2" /> Post Job
							</Form.Button>
						</Card.Footer>
					</Card.Root>
				</form>
			{/if}
		</div>

		<div class="col-span-12 xl:col-span-4 order-1 xl:order-2 relative">
			<Preview />
		</div>
	</section>
</main>
