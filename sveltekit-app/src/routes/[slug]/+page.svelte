<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import Sections from '../../components/Sections.svelte';

	export let data: PageData;

	let q;
	let customPage;

	$: q = useQuery(data);
	$: ({ data: customPage } = $q);
</script>

<section>
	<div class="inner">
		{#if customPage?.title}
			<h1>{customPage.title}</h1>
		{/if}

		{#if !customPage || customPage.sections.length === 0}
			<p>Sections unavailable.</p>
		{:else}
			{#key data.params.slug}
				<div class="sections">
					<Sections data={customPage.sections} />
				</div>
			{/key}
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
