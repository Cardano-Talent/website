<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Prior to creating the Job Listing</Card.Title>

		<Card.Description>Please log in to your account</Card.Description>
	</Card.Header>

	<Card.Content class="flex items-center justify-start gap-8">
		<Button href="/login?r=/post-a-job/wizard?tier=prime" variant="outline" class="px-8">
			Log in
		</Button>

		<Badge variant="secondary" class="text-xs rounded-md">OR</Badge>

		<Button href="/sign-up/company" class="px-8">Create account</Button>
	</Card.Content>
</Card.Root>
