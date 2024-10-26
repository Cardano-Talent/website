<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import { Badge } from '$lib/components/ui/badge';
	import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
	import {
		type JobsResponse,
		type CompaniesResponse,
		JobsTierOptions
	} from '$lib/types/pocketbase-types';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import BriefCase from 'lucide-svelte/icons/briefcase-business';

	export let job: JobsResponse;
	export let companyData: CompaniesResponse | undefined = undefined;

	let companyId: string;
	let companyProfilePicture: string;
	let companyName: string;

	if (companyData) {
		companyId = companyData.id;
		companyProfilePicture = companyData.profile_picture;
		companyName = companyData.name;
	} else {
		// @ts-expect-error Pocketbase typegen does not support expanded relations
		companyId = job?.expand?.company?.id;
		// @ts-expect-error Pocketbase typegen does not support expanded relations
		companyProfilePicture = job?.expand?.company?.profile_picture;
		// @ts-expect-error Pocketbase typegen does not support expanded relations
		companyName = job?.expand?.company?.name;
	}
</script>

<a
	href={`/jobs/${job.id}-${job.uri}`}
	class="flex border-b border-border/40 pt-6 hover:bg-accent hover:text-accent-foreground transition-all"
>
	<Card.Content class="flex gap-2 items-start justify-start w-full">
		<Avatar.Root class="w-12 h-12 rounded-md">
			{#if job.tier === JobsTierOptions.prime}
				<Avatar.Image
					src="{PUBLIC_POCKETBASE_HOST}/api/files/2qcuepcq93wnvr5/{companyId}/{companyProfilePicture}?thumb=100x100"
				/>
			{/if}

			<Avatar.Fallback class="rounded-md">
				<BriefCase class="w-6 h-6 opacity-30" />
			</Avatar.Fallback>
		</Avatar.Root>

		<div class="flex flex-col flex-1 justify-between items-start gap-2">
			<div class="flex justify-between items-start w-full flex-wrap">
				<div class="flex flex-col">
					<p class="font-semibold">{job.title}</p>

					<p class="text-sm text-muted-foreground">
						{job.tier === JobsTierOptions.prime ? companyName : job.category}
					</p>
				</div>

				<p class="text-muted-foreground text-sm">
					{formatDistanceToNow(job.created, { addSuffix: true })}
				</p>
			</div>

			<div class="flex justify-between items-center w-full flex-wrap">
				<div class="flex items-center gap-1">
					{#if job.location}
						<p class="text-sm">{job.location}</p>

						{#if job.remote_only}
							<Badge variant="secondary">Remote</Badge>
						{/if}
					{:else}
						<p class="text-sm text-muted-foreground">Remote</p>
					{/if}
				</div>

				<div class="flex items-center gap-1">
					<Badge variant="outline">{job.type}</Badge>

					{#if job.tier === JobsTierOptions.prime}
						<Badge variant="outline">{job.category}</Badge>
					{/if}
				</div>
			</div>
		</div>
	</Card.Content>
</a>
