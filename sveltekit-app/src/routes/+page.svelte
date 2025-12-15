<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	import Services from '../components/Services.svelte';
	import Contact from '../components/Contact.svelte';
	import Hero from '../components/Hero.svelte';
	import Usp from '../components/Usp.svelte';

	export let data: PageData;
	export let form;
	const q = useQuery(data);

	$: ({ data: homePage } = $q);
</script>

<section>
	<Hero data={homePage.hero} />

	<Usp {homePage} />

	<Services {homePage} />

	<Contact {form} />
</section>
