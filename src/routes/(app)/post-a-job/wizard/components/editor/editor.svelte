<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let editor: HTMLDivElement;

	let quill: any;

	onMount(async () => {
		// @ts-ignore
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			theme: 'snow'
		});

		const container = editor.getElementsByClassName('ql-editor')[0];

		quill.on('text-change', () => {
			dispatch('input', { container: container.innerHTML, text: quill.getText() });
		});
	});

	onDestroy(() => {
		quill = null;
	});
</script>

<div bind:this={editor} />
