<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import Sections from '../../components/Sections.svelte';

	export let data: PageData;
	const q = useQuery(data);
	$: ({ data: aboutPage } = $q);
</script>

<svelte:head>
	<title>{aboutPage.seo?.title ?? 'About Niko Malafek'}</title>
	<meta name="description" content={aboutPage.seo?.description} />

	<link rel="canonical" href={aboutPage.seo?.canonical} />
</svelte:head>

<section>
	<div class="inner">
		{#if aboutPage.title}
			<h1>{aboutPage.title}</h1>
		{/if}

		{#if aboutPage.sections.length === 0}
			<p>Sections unavailable.</p>
		{:else}
			<div class="sections">
				<Sections data={aboutPage.sections} />
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		background-color: var(--brown);
		height: 100%;
		display: flex;
		justify-content: center;
		flex: 1;
		padding-block-end: var(--padding-block);
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
