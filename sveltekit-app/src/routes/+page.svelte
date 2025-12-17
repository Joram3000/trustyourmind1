<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	import ServicesBlock from '../components/ServicesBlock.svelte';
	import ContactBlock from '../components/ContactBlock.svelte';
	import HeroBlock from '../components/HeroBlock.svelte';
	import UspBlock from '../components/UspBlock.svelte';

	export let data: PageData;
	export let form;
	const q = useQuery(data);

	$: ({ data: homePage } = $q);
	const { contactInfo } = data;
</script>

<section>
	<HeroBlock data={homePage.hero} />

	<UspBlock {homePage} />

	<ServicesBlock {homePage} />

	<ContactBlock {homePage} {form} {contactInfo} />
</section>
