<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/components/ui/icons';
	import { JobListing } from '$lib/components/jobListing';
	import { Seo } from '$lib/components/seo';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import User from 'lucide-svelte/icons/user';
	import GloveIcon from 'lucide-svelte/icons/earth';
	import MailIcon from 'lucide-svelte/icons/mail';
	import CopyIcon from 'lucide-svelte/icons/copy';
	import HandShakeIcon from 'lucide-svelte/icons/heart-handshake';
	import MapPinIcon from 'lucide-svelte/icons/map-pin';

	export let data: PageData;

	const { company, companyJobs } = data;

	const {
		id,
		name,
		tagline,
		about,
		location,
		non_profit,
		profile_picture,
		purchased_post,
		size,
		website,
		twitter,
		discord,
		telegram,
		linkedIn,
		facebook,
		crunchbase
	} = company;

	const { totalItems, items } = companyJobs;

	const seoTitle = name && `${name} - Cardano Talent`;
	const seoDescription = name && `Find open positions from ${name} on Cardano Talent, apply now!`;

	const seoCanonicalImage = new URL('https://og.cardanoskills.com/api/og');
	seoCanonicalImage.searchParams.set('title', name);
	seoCanonicalImage.searchParams.set('subtitle', tagline);
	seoCanonicalImage.searchParams.set('company', id);
	seoCanonicalImage.searchParams.set('filename', profile_picture);
</script>

<Seo
	title={seoTitle}
	description={seoDescription}
	keywords={`${name} jobs, Cardano Talent ${name} jobs, ${name} jobs on Cardano, Ada ${name} jobs`}
	canonicalImgUrl={!!(purchased_post && profile_picture) ? seoCanonicalImage.href : undefined}
/>

<section class="w-full grid grid-cols-12 gap-4 max-w-screen-lg mx-auto py-8 px-4">
	<div class="col-span-12 xl:col-span-8 flex flex-col gap-8">
		<Card.Root>
			<Card.Header class="flex flex-row items-start gap-2">
				<Avatar.Root class="w-16 h-16 rounded-md">
					<Avatar.Image
						src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{id}/{profile_picture}?thumb=100x100"
					/>
					<Avatar.Fallback><User class="w-6 h-6 opacity-75" /></Avatar.Fallback>
				</Avatar.Root>

				<Card.Title>
					{#if name}
						<h1 class="text-3xl">{name}</h1>
					{/if}

					<h6 class="text-lg text-muted-foreground font-normal pl-1">
						{tagline}
					</h6>
				</Card.Title>
			</Card.Header>

			{#if about}
				<Separator />

				<Card.Content class="whitespace-pre-wrap pt-4">
					<p class="text-muted-foreground">
						{about}
					</p>
				</Card.Content>
			{/if}
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-4">
				<Card.Title class="text-muted-foreground">
					Jobs <Badge variant="secondary" class="ml-1 rounded-md">{totalItems}</Badge>
				</Card.Title>
			</Card.Header>

			<Separator />

			{#each items as item}
				<JobListing job={item} companyData={company} />
			{/each}
		</Card.Root>
	</div>

	<div class="col-span-12 xl:col-span-4 relative">
		<section class="flex flex-col gap-8 lg:sticky lg:top-24">
			<Card.Root>
				<Card.Header>
					<div class="flex flex-row justify-start items-center flex-wrap gap-2">
						{#if non_profit}
							<Badge class="text-white bg-green-500">
								<HandShakeIcon class="w-4 h-4 mr-1" /> Non-profit
							</Badge>
						{/if}

						{#if size}
							<Badge variant="secondary">
								Size: {size}
							</Badge>
						{/if}

						{#if location}
							<Badge variant="secondary">
								<MapPinIcon class="w-4 h-4 mr-1" />
								{location}
							</Badge>
						{/if}
					</div>
				</Card.Header>

				<Card.Content class="flex items-center justify-start flex-wrap gap-4">
					{#if website}
						<Button href={website} target="_blank" rel="noopener noreferrer" variant="outline">
							<GloveIcon class="h-4 w-4 mr-2" />
							Website
						</Button>
					{/if}

					{#if twitter}
						<Button
							href="https://x.com/{twitter}"
							target="_blank"
							rel="noopener noreferrer"
							variant="outline"
						>
							<Icons.twitter class="h-4 w-4 mr-2" />
							Twitter
						</Button>
					{/if}

					{#if discord}
						<Button href={discord} target="_blank" rel="noopener noreferrer" variant="outline">
							<Icons.discord class="h-4 w-4 mr-2" /> Discord
						</Button>
					{/if}

					{#if telegram}
						<Button
							href="https://t.me/{telegram}"
							target="_blank"
							rel="noopener noreferrer"
							variant="outline"
						>
							<Icons.telegram class="h-4 w-4 mr-2" />
							Telegram
						</Button>
					{/if}

					{#if linkedIn}
						<Button href={linkedIn} target="_blank" rel="noopener noreferrer" variant="outline">
							<Icons.linkedIn class="h-4 w-4 mr-2" /> LinkedIn
						</Button>
					{/if}

					{#if facebook}
						<Button href={facebook} target="_blank" rel="noopener noreferrer" variant="outline">
							<Icons.facebook class="h-4 w-4 mr-2" /> Facebook
						</Button>
					{/if}

					{#if crunchbase}
						<Button href={crunchbase} target="_blank" rel="noopener noreferrer" variant="outline">
							<Icons.crunchbase class="h-4 w-4 mr-2" /> Crunchbase
						</Button>
					{/if}
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="pb-4">
					<Card.Title>Share this company</Card.Title>
				</Card.Header>

				<Card.Content class="flex items-center gap-3 justify-start flex-wrap">
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="mailto:?body={$page.url.href}&subject={name} on Cardano Talent"
								target="_blank"
								rel="noopener noreferrer"
								variant="outline"
								size="icon"
							>
								<MailIcon class="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Share via email</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="http://twitter.com/share?text={twitter
									? `@${twitter}`
									: name} on Cardano Talent&url={$page.url.href}"
								target="_blank"
								rel="noopener noreferrer"
								variant="outline"
								size="icon"
							>
								<Icons.twitter class="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Share via X (Twitter)</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="http://t.me/share/url?url={$page.url.href}&text={name} on Cardano Talent"
								target="_blank"
								rel="noopener noreferrer"
								variant="outline"
								size="icon"
							>
								<Icons.telegram class="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Share via Telegram</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="http://facebook.com/sharer/sharer.php?u={$page.url.href}"
								target="_blank"
								rel="noopener noreferrer"
								variant="outline"
								size="icon"
							>
								<Icons.facebook class="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Share via Facebook</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="https://www.linkedin.com/shareArticle/?summary={name} on Cardano Talent&mini=true&url={$page
									.url.href}"
								target="_blank"
								rel="noopener noreferrer"
								variant="outline"
								size="icon"
							>
								<Icons.linkedIn class="h-4 w-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Share via LinkedIn</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<Button
						class="w-full"
						variant="ghost"
						on:click={() => {
							navigator.clipboard.writeText($page.url.href);
							toast.success('Link has been copied to your clipboard!');
						}}
					>
						<CopyIcon class="h-4 w-4 mr-2" /> Copy Link
					</Button>
				</Card.Content>
			</Card.Root>
		</section>
	</div>
</section>
