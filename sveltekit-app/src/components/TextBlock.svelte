<script lang="ts">
	import type { TextBlock } from '$lib/sanity/queries';
	import { PortableText } from '@portabletext/svelte';

	export let data: TextBlock;
</script>

<div class="container">
	<div class="inner">
		{#if data.title}<h2>{data.title}</h2>{/if}

		<PortableText components={{}} value={data.body} />
	</div>
</div>

<style>
	.container {
		max-width: var(--max-width-1);
		margin: 0 auto;
		padding: 1rem;
		padding-block: var(--padding-block);
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
