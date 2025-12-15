<script lang="ts">
	import type { Hero } from '$lib/sanity/queries';

	export let data: Hero;
</script>

<div class="container">
	<div class="inner">
		<h1>{data.headline}</h1>

		{#if data.subheadline}<p>{data.subheadline}</p>{/if}

		{#if data.excerpt}<p>
				{data.excerpt}
			</p>{/if}
		{#if data.callToAction}<button>{data.callToAction.label}</button>{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90vh;
		background-color: var(--darkbrown);
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 2rem;
		max-width: var(--max-width-1);
		padding: 1rem;
	}
</style>
