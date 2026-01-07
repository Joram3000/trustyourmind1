<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import Sections from '../../components/Sections.svelte';

	export let data: PageData;
	const q = useQuery(data);
	$: ({ data: customPage } = $q);
</script>

<section>
	<div class="inner">
		{#if customPage.title}
			<h1>{customPage.title}</h1>
		{/if}

		{#if customPage.sections.length === 0}
			<p>Sections unavailable.</p>
		{:else}
			<div class="sections">
				<Sections data={customPage.sections} />
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
	}

	h1 {
		text-align: center;
		width: 100%;
	}

	.inner {
		width: 100%;
	}
</style>
