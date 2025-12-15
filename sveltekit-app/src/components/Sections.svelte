<script lang="ts">
	import type { Sections } from '$lib/sanity/queries';
	import Gallery from './Gallery.svelte';
	import Hero from './Hero.svelte';
	import TextBlock from './TextBlock.svelte';

	export let data: Sections | undefined;

	const sections = data ?? [];
</script>

<div class="container">
	{#each sections as section (section._key)}
		{#if section._type === 'hero'}
			<Hero data={section} />
		{:else if section._type === 'textBlock'}
			<TextBlock data={section} />
		{:else if section._type === 'imageGallery'}
			<Gallery data={section} />
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
