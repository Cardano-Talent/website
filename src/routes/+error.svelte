<script lang="ts">
	import { Header } from '$lib/components/layout/header';
	import { Footer } from '$lib/components/layout/footer';
	import { Button } from '$lib/components/ui/button';
</script>

<Header />
<section
	class="w-full flex flex-col items-center justify-center gap-6 px-4 py-20 md:pt-36 md:pb-28 min-h-96"
>
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			Oops, page not found!
		</h1>

		<p class="mt-2 mb-4 text-muted-foreground">
			The page you're looking for doesn't exist. Let's get you back on track.
		</p>

		<div class="mt-6">
			<Button href="/">Go to Homepage</Button>
		</div>
	</div>
</section>
<Footer />
