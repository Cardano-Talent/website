<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Seo } from '$lib/components/seo';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
</script>

<Seo title="Thanks for your purchase! - Cardano Talent" />

<section
	class="w-full flex flex-col items-center justify-center gap-6 px-4 py-20 md:pt-36 md:pb-28 min-h-96"
>
	<div class="mx-auto max-w-lg text-center flex flex-col items-center gap-4">
		<LoaderCircle class="mx-auto h-12 w-12 text-primary animate-spin" />

		<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			Processing Payment...
		</h1>

		<p class="text-muted-foreground">
			Thank you for your purchase! Thanks for choosing us. Please be patient while we process your
			payment. This may take a few minutes. Once the payment is confirmed, we will promptly send an
			invoice to your email address. If you have any questions or need assistance, please feel free
			to contact our support team
		</p>

		<Badge variant="outline">
			The average time for crypto payments confirmation is between \ <strong> 10-30 minutes</strong>
		</Badge>
	</div>
</section>
