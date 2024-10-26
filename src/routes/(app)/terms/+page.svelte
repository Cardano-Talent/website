<script lang="ts">
	import { Seo } from '$lib/components/seo';
	import MarkdownIt from 'markdown-it';
	import my_markdown from './content.md?raw';

	const md = new MarkdownIt();

	const seoTitle = 'Terms of Service - Cardano Talent';
</script>

<Seo title="Terms of Service - Cardano Talent" />

<section
	class="w-full flex flex-col items-start justify-start gap-6 px-4 py-20 max-w-screen-xl mx-auto"
>
	{@html md.render(my_markdown)}
</section>
