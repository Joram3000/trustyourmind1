<script lang="ts">
	import type { Sections } from '$lib/sanity/queries';
	import Gallery from './Gallery.svelte';
	import HeroBlock from './HeroBlock.svelte';
	import TextBlock from './TextBlock.svelte';
	import ContactFormComponent from './ContactFormComponent.svelte';

	export let data: Sections | undefined;
	const sections = data ?? [];
</script>

<div class="container">
	{#each sections as section (section._key)}
		{#if section._type === 'hero'}
			<HeroBlock data={section} />
		{:else if section._type === 'textBlock'}
			<TextBlock data={section} />
		{:else if section._type === 'imageGallery'}
			<Gallery data={section} />
		{:else if section._type === 'contactForm'}
			<ContactFormComponent data={section} />
		{:else}
			<div>
				<p>Unknown section type</p>
			</div>
		{/if}
	{/each}
</div>

<style>
	.container {
		width: 100%;
	}
</style>
