<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Prior to creating the Job Listing</Card.Title>

		<Card.Description>
			Please update the company's profile to include the name, social media platforms, and any other
			relevant information. Thank you.
		</Card.Description>
	</Card.Header>

	<Card.Content class="flex items-center justify-start gap-8">
		<Button href="/dashboard/profile" variant="outline" class="flex-1">
			Visit profile Settings
		</Button>
	</Card.Content>
</Card.Root>
