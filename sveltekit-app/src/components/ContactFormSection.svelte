<script lang="ts">
	import ContactForm from './ContactForm.svelte';
	import type { ContactForm as ContactFormType } from '$lib/sanity/queries';

	export let data: ContactFormType;
</script>

<div class="container">
	<div class="inner">
		{#if data.title}
			<h2>{data.title}</h2>
		{/if}
		{#if data.subtitle}
			<p>{data.subtitle}</p>
		{/if}

		<ContactForm />
	</div>
</div>

<style>
	.container {
		display: flex;
		background-color: var(--darkbrown);
		justify-content: center;
		padding: 1rem;
		padding-block: var(--padding-block);
	}

	.inner {
		max-width: var(--max-width-1);
		text-align: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
	}
</style>
