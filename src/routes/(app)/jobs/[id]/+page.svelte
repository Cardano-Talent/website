<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';
	import { formatDistanceToNow, differenceInBusinessDays } from 'date-fns';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
	import { JobsTierOptions } from '$lib/types/pocketbase-types';
	import { Separator } from '$lib/components/ui/separator';
	import { ApplyDialog } from './components/applyDialog';
	import { Icons } from '$lib/components/ui/icons';
	import { Seo } from '$lib/components/seo';

	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import BlocksIcon from 'lucide-svelte/icons/blocks';
	import ClockIcon from 'lucide-svelte/icons/clock';
	import MapPinIcon from 'lucide-svelte/icons/map-pin';
	import BriefCaseIcon from 'lucide-svelte/icons/briefcase-business';
	import GloveIcon from 'lucide-svelte/icons/earth';
	import MailIcon from 'lucide-svelte/icons/mail';
	import CopyIcon from 'lucide-svelte/icons/copy';
	import BriefCase from 'lucide-svelte/icons/briefcase-business';

	export let data: PageData;

	const { job } = data;

	const {
		id,
		username,
		name,
		tagline,
		profile_picture,
		purchased_post,
		size,
		website,
		twitter,
		telegram,
		discord,
		linkedIn,
		facebook,
		crunchbase
		// @ts-expect-error Unexpected company record
	} = job.expand.company;

	const companyUrl = `/company/${id}${username ? '-' + username : ''}`;
	const companyName = name;
	const jobTitle = job.title;
	const applicationMethod = job.application_method;
	const applicationMethodValue = job.application_method_value;

	const seoTitle = name
		? `${jobTitle} at ${name} - Cardano Talent`
		: `${jobTitle} - Cardano Talent`;

	const seoDescription = `Apply now to ${jobTitle}, ${job.category}, ${job.type} at ${name}`;

	const seoCanonicalImage = new URL('https://og.cardanoskills.com/api/og');
	seoCanonicalImage.searchParams.set('title', job.title);
	seoCanonicalImage.searchParams.set('subtitle', companyName);
	seoCanonicalImage.searchParams.set('company', id);
	seoCanonicalImage.searchParams.set('filename', profile_picture);
</script>

<Seo
	title={seoTitle}
	description={seoDescription}
	keywords={`${jobTitle} jobs, Cardano Talent ${job.category} jobs, ${job.type} jobs on Cardano, Ada ${job.type} jobs`}
	canonicalImgUrl={!!(job.tier === JobsTierOptions.prime && profile_picture)
		? seoCanonicalImage.href
		: undefined}
/>

<section class="w-full grid grid-cols-12 gap-4 max-w-screen-xl mx-auto py-8 px-4">
	<div class="col-span-12 xl:col-span-9 flex flex-col gap-8">
		<Card.Root>
			<Card.Header>
				<Card.Title>
					<h1 class="text-4xl mb-2">{job.title}</h1>
					{#if job?.salary_min && job?.salary_max && job?.salary_currency}
						<h6 class="text-xl mb-2 text-muted-foreground font-normal">
							{Intl.NumberFormat('en', { notation: 'compact' }).format(job.salary_min)}
							-
							{Intl.NumberFormat('en', { notation: 'compact' }).format(job.salary_max)}
							{job.salary_currency}
						</h6>
					{/if}
				</Card.Title>

				<Card.Description class="flex items-center gap-4 flex-wrap">
					{#if job?.salary_currency && job.salary_currency === 'ADA'}
						<Badge class="text-white">Pays in Cardano</Badge>
					{/if}

					<Badge variant="secondary">
						<ClockIcon class="w-4 h-4 mr-1" />
						Posted
						{formatDistanceToNow(job.created, { addSuffix: true })}
					</Badge>

					{#if differenceInBusinessDays(job.created, new Date()) <= 7}
						<Badge variant="outline">⭐ Recent</Badge>
					{/if}
				</Card.Description>
			</Card.Header>

			<Card.Content class="flex items-center flex-col xl:flex-row  gap-4">
				{#if job.location}
					<div class="flex items-center gap-1">
						<MapPinIcon class="w-4 h-4" />
						{job.location}

						{#if job.remote_only}
							<Badge class="text-xs" variant="outline">Remote only</Badge>
						{/if}
					</div>
				{/if}

				<div class="flex items-center gap-1">
					<BriefCaseIcon class="w-4 h-4" />
					{job.type}
				</div>

				<div class="flex items-center gap-1">
					<BlocksIcon class="w-4 h-4" />
					{job.category}
				</div>
			</Card.Content>

			<ApplyDialog {companyName} {jobTitle} {applicationMethod} {applicationMethodValue} />
		</Card.Root>

		<Card.Root>
			<Card.Header class="pb-4">
				<Card.Title class="text-muted-foreground">About this role</Card.Title>
			</Card.Header>

			<Separator />

			<div class="ql-snow">
				<div class="ql-editor !p-6">
					{@html job.description}
				</div>
			</div>

			<ApplyDialog {companyName} {jobTitle} {applicationMethod} {applicationMethodValue} />
		</Card.Root>
	</div>

	<div class="col-span-12 xl:col-span-3 relative">
		<section class="flex flex-col gap-8 lg:sticky lg:top-24">
			<Card.Root>
				<Card.Header class="flex flex-col items-start gap-2 pb-4">
					<a href={companyUrl}>
						<Avatar.Root class="w-16 h-16 rounded-md">
							{#if purchased_post}
								<Avatar.Image
									src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{id}/{profile_picture}?thumb=100x100"
								/>
							{/if}
							<Avatar.Fallback><BriefCase class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>
					</a>

					<div>
						<a href={companyUrl} class="font-medium text-base">
							{companyName}
						</a>

						{#if purchased_post}
							<p class="text-muted-foreground text-sm">
								{tagline}
							</p>

							{#if size}
								<p class="text-muted-foreground text-sm">
									Size: {size}
								</p>
							{/if}
						{/if}
					</div>
				</Card.Header>

				{#if purchased_post}
					<Separator class="mb-4" />

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
				{/if}
			</Card.Root>

			<Card.Root>
				<Card.Header class="pb-4">
					<Card.Title>Share this job</Card.Title>
				</Card.Header>

				<Card.Content class="flex items-center gap-3 justify-start flex-wrap">
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="mailto:?body={$page.url.href}&subject={companyName} is hiring a {jobTitle}"
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
									: companyName} is hiring a {jobTitle}&url={$page.url.href}"
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
								href="http://t.me/share/url?url={$page.url
									.href}&text={companyName} is hiring a {jobTitle}"
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
								href="https://www.linkedin.com/shareArticle/?summary={companyName} is hiring a {jobTitle}&mini=true&url={$page
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
