<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Hero } from '$lib/sanity/queries';
	import Icon from './Icon.svelte';
	import Popup from './Popup.svelte';

	export let data: Hero;

	let popupOpen = false;
</script>

<div class="container">
	{#if data.backgroundImage}
		<img src={urlFor(data.backgroundImage).url()} alt="" class="background-image" />
	{/if}
	<div class="inner">
		<h1>{data.headline}</h1>

		{#if data.subheadline}<p class="subheadline">{data.subheadline}</p>{/if}

		{#if data.excerpt}
			<p class="excerpt">
				{data.excerpt}
			</p>{/if}

		{#if data.callToAction}
			<a data-koalendar-widget href="https://koalendar.com/e/meet-with-prace-music">
				<button>{data.callToAction.label} <Icon name={'ArrowRight'} /></button></a
			>{/if}

		{#if data.callToAction}
			<button on:click={() => (popupOpen = true)}
				>{data.callToAction.label} <Icon name={'ArrowRight'} /></button
			>
		{/if}
	</div>

	<Popup bind:open={popupOpen}>
		<iframe
			title="Schedule Appointment"
			src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ZOSR5MBVHL-tWejOhupJmBs9a4JNUUhwsNz-XlLvpJVWNQ62b3TjqcYNuJ9BR4nMy2_0Ekpbx?gv=true"
			style="border: 0;"
			width="100%"
			height="600"
			frameborder="0"
		></iframe>
	</Popup>
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
