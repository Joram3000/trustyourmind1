<script lang="ts">
	import { asset } from '$app/paths';
	import { urlFor } from '$lib/sanity/image';
	import type { Gallery } from '$lib/sanity/queries';

	export let data: Gallery;
</script>

<div class="container">
	<div class="inner">
		{#each data.images as image, i (i)}
			<enhanced:img class="gallery-image" src={urlFor(image.asset).url()} alt={image.alt} />
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: var(--max-width-1);
		margin: 0 auto;
	}

	.inner {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		flex-wrap: wrap;
	}

	.gallery-image {
		width: 100%;
		min-width: 150px; /* Ensure images don't get too small */
		object-fit: cover;
		border-radius: var(--border-radius);
	}
</style>
