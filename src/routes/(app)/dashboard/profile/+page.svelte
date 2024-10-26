<script lang="ts">
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profile_schema, picture_schema, JOINED_ACCEPTED_IMAGE_TYPES } from './schema';
	import { currentUser } from '$lib/stores/user';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { Icons } from '$lib/components/ui/icons';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import SaveIcon from 'lucide-svelte/icons/save';
	import GloveIcon from 'lucide-svelte/icons/earth';

	export let data: PageData;

	const successFeedback = () => {
		toast.success('Successful change', {
			description: 'The account was updated successfully!',
			position: 'bottom-center'
		});

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const picture_form = superForm(data.pictureForm, {
		autoFocusOnError: true,
		scrollToError: true,
		validators: zodClient(picture_schema),
		dataType: 'json',
		onResult: ({ result: { type } }) => type === 'success' && successFeedback()
	});

	const {
		enhance: pictureEnhance,
		errors: pictureErrors,
		delayed: pictureDelayed,
		tainted: pictureTainted
	} = picture_form;

	const file = fileProxy(picture_form, 'profile_picture');

	const profile_form = superForm(data.profileForm, {
		autoFocusOnError: true,
		scrollToError: true,
		validators: zodClient(profile_schema),
		dataType: 'json',
		onResult: ({ result: { type } }) => type === 'success' && successFeedback()
	});

	const { form: formData, enhance, delayed, tainted } = profile_form;
</script>

<div>
	<h3 class="text-xl font-medium">Profile Settings</h3>
	<p class="text-muted-foreground">
		Update the company's essential information, including the avatar, description, social media
		links, and other relevant details
	</p>
</div>

{#if $currentUser}
	<Card.Root>
		<Card.Header>
			<Card.Title>Private data</Card.Title>

			<Card.Description>
				The following information will NEVER be shared with others
			</Card.Description>
		</Card.Header>

		<Card.Content class="flex flex-col gap-2">
			<div>
				<span class="font-medium text-sm">Email</span>
				<Badge variant="outline">{$currentUser.email}</Badge>
			</div>

			<div>
				<span class="font-medium text-sm">Email verified</span>
				<Badge variant="outline">{!!$currentUser.verified ? 'Yes' : 'No'}</Badge>
			</div>
		</Card.Content>
	</Card.Root>
{/if}

<form method="POST" action="?/picture" enctype="multipart/form-data" use:pictureEnhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>Company logo</Card.Title>
			<Card.Description>
				Adding the company logo is optional but strongly recommended
			</Card.Description>
		</Card.Header>

		<Card.Content>
			<div class="flex flex-col gap-2">
				<input
					name="profile_picture"
					type="file"
					accept={JOINED_ACCEPTED_IMAGE_TYPES}
					class="p-4 border border-border/80 rounded-md"
					bind:files={$file}
					disabled={$pictureDelayed}
				/>

				{#if $pictureErrors.profile_picture}
					<Alert.Root variant="destructive" class="my-1">
						<CircleAlert class="h-4 w-4" />
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>{$pictureErrors.profile_picture}</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="flex gap-1 flex-wrap">
					<span class="text-muted-foreground text-sm">Insert company's logo -</span>
					<Badge variant="secondary">
						We suggest using a square image, ideally 400x400. Similar to your social media profile
						picture
					</Badge>
					<Badge variant="secondary">Max file size limit: 2MB</Badge>
					<Badge variant="secondary">Only .jpg .jpeg .png .webp files allowed</Badge>
				</div>
			</div>
		</Card.Content>

		<Card.Footer>
			<Form.Button class="px-8" disabled={$pictureDelayed || !$pictureTainted}>
				<SaveIcon class="w-4 h-4 mr-2" /> Save Picture
			</Form.Button>
		</Card.Footer>
	</Card.Root>
</form>

<form method="POST" action="?/profile" class="flex flex-col gap-8" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>Basic details</Card.Title>
		</Card.Header>

		<Card.Content>
			<Form.Field form={profile_form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Company Name <span class="text-destructive">*</span></Form.Label>
					<Input placeholder="Enter the name" bind:value={$formData.name} {...attrs} />
				</Form.Control>
				<Form.Description>This the public display name</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="tagline">
				<Form.Control let:attrs>
					<Form.Label>Company Slogan or Tagline <span class="text-destructive">*</span></Form.Label>
					<Input placeholder="Enter the slogan" bind:value={$formData.tagline} {...attrs} />
				</Form.Control>
				<Form.Description>
					Summarize your company's mission in 75 characters or less
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="about">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.about} />
				</Form.Control>
				<Form.Description>
					Share with everyone a little bit more about the company's values and objectives
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>

		<Separator />

		<Card.Header>
			<Card.Title>Location and company size</Card.Title>
		</Card.Header>

		<Card.Content>
			<Form.Field form={profile_form} name="location">
				<Form.Control let:attrs>
					<Form.Label>
						Location <span class="text-muted-foreground text-xs">(optional)</span>
					</Form.Label>
					<Input
						placeholder="Enter the company location"
						bind:value={$formData.location}
						{...attrs}
					/>
				</Form.Control>
				<Form.Description>
					You can input either both the city and country, or just the country
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="size">
				<Form.Control let:attrs>
					<Form.Label>
						Company size <span class="text-muted-foreground text-xs">(optional)</span>
					</Form.Label>
					<Input placeholder="How big is the company?" bind:value={$formData.size} {...attrs} />
				</Form.Control>
				<Form.Description>You can enter a whole number or just a range</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>

		<Separator />

		<Card.Header>
			<Card.Title>Social platforms</Card.Title>
			<Card.Description>The following fields are optional</Card.Description>
		</Card.Header>

		<Card.Content class="flex flex-col gap-2">
			<Form.Field form={profile_form} name="website">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<GloveIcon class="w-4 h-4" /> Official Website
					</Form.Label>
					<Input
						placeholder="Company's official website"
						bind:value={$formData.website}
						{...attrs}
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="twitter">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.twitter class="w-4 h-4" /> Twitter (username/handle)
					</Form.Label>
					<Input placeholder="E.g: helloEarth" bind:value={$formData.twitter} {...attrs} />
				</Form.Control>
				<Form.Description>Enter only the handle, example: cardanotalent</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="telegram">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.telegram class="w-4 h-4" /> Telegram (username/handle)
					</Form.Label>
					<Input placeholder="E.g: helloEarth" bind:value={$formData.telegram} {...attrs} />
				</Form.Control>
				<Form.Description>Enter only the handle, example: cardanotalent</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="discord">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.discord class="w-4 h-4" /> Discord
					</Form.Label>
					<Input
						placeholder="E.g: https://discord.gg/MsSYMwBfgd"
						bind:value={$formData.discord}
						{...attrs}
					/>
				</Form.Control>
				<Form.Description>Enter company's discord invite link</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="linkedIn">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.linkedIn class="w-4 h-4" /> LinkedIn
					</Form.Label>
					<Input
						placeholder="E.g: https://www.linkedin.com/company/cardano-foundation"
						bind:value={$formData.linkedIn}
						{...attrs}
					/>
				</Form.Control>
				<Form.Description>Enter the company's LinkedIn page URL</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="facebook">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.facebook class="w-4 h-4" /> Facebook page
					</Form.Label>
					<Input
						placeholder="E.g: https://www.facebook.com/groups/CardanoCommunity"
						bind:value={$formData.facebook}
						{...attrs}
					/>
				</Form.Control>
				<Form.Description>Enter the company's Facebook page URL</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={profile_form} name="crunchbase">
				<Form.Control let:attrs>
					<Form.Label class="flex items-center gap-1">
						<Icons.crunchbase class="w-4 h-4" /> Crunchbase page
					</Form.Label>
					<Input
						placeholder="E.g: https://www.crunchbase.com/organization/cardano-foundation"
						bind:value={$formData.crunchbase}
						{...attrs}
					/>
				</Form.Control>
				<Form.Description>Enter the company's Crunchbase page URL</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>

		<Separator />

		<Card.Header>
			<Card.Title>Update</Card.Title>

			<Card.Description>
				Save all changes made to the company's profile. The more fields you fill, you increment your
				reach and increase chances for hiring talents
			</Card.Description>
		</Card.Header>

		<Card.Content>
			<Form.Button class="px-8" disabled={$delayed || !$tainted}>
				<SaveIcon class="w-4 h-4 mr-2" /> Save Changes
			</Form.Button>
		</Card.Content>
	</Card.Root>
</form>
