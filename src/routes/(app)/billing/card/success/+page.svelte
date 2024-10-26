<script lang="ts">
	import { Seo } from '$lib/components/seo';
	import BadgeCheck from 'lucide-svelte/icons/badge-check';
</script>

<Seo title="Thanks for your purchase! - Cardano Talent" />

<section
	class="w-full flex flex-col items-center justify-center gap-6 px-4 py-20 md:pt-36 md:pb-28 min-h-96"
>
	<div class="mx-auto max-w-lg text-center">
		<BadgeCheck class="mx-auto h-12 w-12 text-green-500" />
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			Payment Confirmed
		</h1>

		<p class="mt-4 text-muted-foreground">
			Thank you for your purchase! Thanks for choosing us. Please be patient while we process your
			payment. This may take a few moments. Once the payment is completed, we will promptly send an
			invoice to your email address. If you have any questions or need assistance, please feel free
			to contact our support team
		</p>
	</div>
</section>
