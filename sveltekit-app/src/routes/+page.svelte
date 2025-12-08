<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	import Services from '../components/Services.svelte';
	import Contact from '../components/Contact.svelte';
	import Hero from '../components/Hero.svelte';
	import Usp from '../components/Usp.svelte';
	export let data: PageData;
	const q = useQuery(data);

	// $: ({ data: posts } = $q);
</script>

<section>
	<Hero />

	<Usp />

	<Services />

	<Contact />
</section>
