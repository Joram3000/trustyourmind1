<script lang="ts">
	import type { TextBlock } from '$lib/sanity/queries';
	import { PortableText } from '@portabletext/svelte';

	export let data: TextBlock;
</script>

<div class="container">
	<div class="inner">
		{#if data.title}<h1>{data.title}</h1>{/if}

		<PortableText components={{}} value={data.body} />
	</div>
</div>

<style>
	.container {
		max-width: var(--max-width-1);
		margin: 0 auto;
	}

	.inner {
		padding: 1rem;
	}
</style>
