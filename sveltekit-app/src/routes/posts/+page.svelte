<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import Card from '../../components/Card.svelte';

	export let data: PageData;
	const q = useQuery({ query: data.query, options: data.options });
	$: ({ data: postsPage } = $q);
	$: posts = postsPage?.posts ?? [];
</script>

<svelte:head>
	<title>Posts by Niko Malafek</title>
	<meta name="description" content={postsPage.seo?.description} />
	<link rel="canonical" href={postsPage.seo?.canonical} />
</svelte:head>

<section>
	<div class="inner">
		{#if posts.length === 0}
			<p>Posts unavailable.</p>
		{:else}
			<h1>Posts</h1>

			{#each posts as post}
				<Card {post} />
			{/each}
		{/if}
	</div>
</section>

<style>
	section {
		background-color: var(--brown);
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-block-end: var(--padding-block);
	}

	.inner {
		width: 100%;
		max-width: var(--max-width-1);
		margin: 0 auto 0;
		height: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		text-align: center;
		width: 100%;
		padding: 1rem;
	}

	.inner {
		width: 100%;
	}

	@media (min-width: 768px) {
		.inner {
			margin: var(--header-height) auto 0;
		}
	}
</style>
