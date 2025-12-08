<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Card from '../components/Card.svelte';
	import type { PageData } from './$types';
	import Hero from '../components/Hero.svelte';
	import Usp from '../components/Usp.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: posts } = $q);
</script>

<section>
	<!-- {#if posts.length}
		{#each posts as post}
			<Card {post} />
		{/each}
	{:else}
		<p>Welkom op de home pagina van Niko</p>
	{/if} -->

	<Hero />

	<Usp />
</section>
