<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	import ServicesBlock from '../components/ServicesBlock.svelte';
	import ContactBlock from '../components/ContactBlock.svelte';
	import HeroBlock from '../components/HeroBlock.svelte';
	import UspBlock from '../components/UspBlock.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: homePage } = $q);
	const { contactInfo } = data;
</script>

<svelte:head>
	<title>{homePage.seo?.title ?? 'Trust Your Mind'}</title>
	<meta name="description" content={homePage.seo?.description} />

	<link rel="canonical" href={homePage.seo?.canonical} />
</svelte:head>

<section>
	<HeroBlock data={homePage.hero} />

	<UspBlock {homePage} />

	<ServicesBlock {homePage} />

	<ContactBlock {homePage} {contactInfo} />
</section>
