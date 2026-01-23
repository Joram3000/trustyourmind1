<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Hero } from '$lib/sanity/queries';
	import Icon from './Icon.svelte';
	import Popup from './Popup.svelte';
	import { onMount } from 'svelte';

	export let data: Hero;

	let popupOpen = false;

	let objectPosition = '50% 50%';

	function calcObjectPosition() {
		const hotspot = data.backgroundImage?.hotspot as { x?: number; y?: number } | undefined;
		const x = typeof hotspot?.x === 'number' ? hotspot.x : 0.5;
		let y = typeof hotspot?.y === 'number' ? hotspot.y : 0.5;

		if (typeof window !== 'undefined' && window.innerWidth <= 640) {
			const min = 0.1;
			const max = 0.9;
			y = Math.min(max, Math.max(min, y));
		}

		objectPosition = `${x * 100}% ${y * 100}%`;
	}

	onMount(() => {
		calcObjectPosition();
		const onResize = () => calcObjectPosition();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	$: calcObjectPosition();
</script>

<div class="container">
	{#if data.backgroundImage}
		<enhanced:img
			src={urlFor(data.backgroundImage.asset).fit('crop').auto('format').url()}
			alt={data.backgroundImage.alt || 'Background Image'}
			style="object-position: {objectPosition};"
			class="background-image"
			sizes="min(1280px, 100vw)"
		/>
	{/if}
	<div class="inner">
		{#if data.logo}
			<enhanced:img
				class="logo"
				src={urlFor(data.logo.asset)
					.fit('max')
					.width(data.logo?.sizeWidth ?? 100)
					.auto('format')
					.url()}
				alt={data.logo.alt || 'Logo Trust Your Mind'}
			/>
		{/if}

		<h1 style="color: {data.textColors?.headlineColor?.hex}">{data.headline}</h1>

		{#if data.subheadline}<p
				class="subheadline"
				style="color: {data.textColors?.subheadlineColor?.hex}	"
			>
				{data.subheadline}
			</p>{/if}

		{#if data.excerpt}
			<p class="excerpt" style="color: {data.textColors?.excerptColor?.hex}">
				{data.excerpt}
			</p>{/if}

		{#if data.callToAction?.label}
			<button on:click={() => (popupOpen = true)}
				>{data.callToAction.label} <Icon name={'ArrowRight'} /></button
			>

			<Popup bind:open={popupOpen}>
				<!-- Google Calendar Appointment Scheduling begin -->
				<iframe
					title="Schedule Appointment"
					src={data.callToAction.url}
					style="border: 0"
					width="100%"
					height="100%"
					frameborder="0"
				></iframe>
				<!-- end Google Calendar Appointment Scheduling -->
			</Popup>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 90vh;
		background-color: var(--darkbrown);
		position: relative;
	}

	.background-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background-image: linear-gradient(
			to right,
			hsl(25 15% 12% / 0.95),
			hsl(25 15% 12% / 0.85),
			hsl(25 15% 12% / 0.6)
		);
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
		max-width: var(--max-width-1);
		padding: 1rem;
		z-index: 1;
		width: 100%;
	}

	.subheadline {
		font-size: 1.5rem;
		font-style: italic;
	}

	.excerpt {
		font-size: 1.25rem;
		color: var(--muted-foreground);
	}
</style>
