<script lang="ts">
	import { page } from '$app/stores';
	import { defaultTitle, defaultDescription } from '$lib/types/metatags';

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let canonicalImgUrl: string | undefined = undefined;
	export let keywords: string | undefined = undefined;

	const seoTitle = title || defaultTitle;
	const seoDescription = description || defaultDescription;
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="title" content={seoTitle} />
	<meta property="og:title" content={seoTitle} />
	<meta property="twitter:title" content={seoTitle} />

	<meta name="description" content={seoDescription} />
	<meta name="og:description" content={seoDescription} />
	<meta name="twitter:description" content={seoDescription} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="cardanotalent.com" />

	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />

	<meta name="author" content="Otekdo" />

	<meta name="robots" content="all" />

	<meta name="distribution" content="global" />

	<link rel="canonical" href={`https://cardanotalent.com${$page.url.pathname}`} />

	{#if keywords}
		<meta property="keywords" content={keywords} />
	{/if}

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"alternateName": "Cardano Talent",
			"url": "https://cardanotalent.com/"
		}
	</script>

	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="2417dbe9-07f7-4469-bc36-fd47d00d2ec5"
	></script>
</svelte:head>
