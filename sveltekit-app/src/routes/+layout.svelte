<script lang="ts">
	import { isPreviewing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import { onMount, type ComponentType } from 'svelte';
	import type { ContactInfo, Header } from '$lib/sanity/queries';
	import Footer from '../components/Footer.svelte';
	import HeaderComponent from '../components/HeaderComponent.svelte'
	;
	let outlineEnabled = true;
	let VisualEditingComponent: ComponentType | null = null;

	export let data: { preview: boolean; contactInfo: ContactInfo | null; header: Header | null };

	onMount(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.shiftKey && e.key.toLowerCase() === 'o') {
				e.preventDefault();
				outlineEnabled = !outlineEnabled;

				if (outlineEnabled) {
					document.body.classList.remove('outline-enabled');
				} else {
					document.body.classList.add('outline-enabled');
				}
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	onMount(async () => {
		const mod = await import('@sanity/visual-editing/svelte');
		VisualEditingComponent = mod.VisualEditing;
	});
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="container">
	{#if data.header}
		<HeaderComponent data={data.header} />
	{/if}

	<main>
		<slot />
	</main>

	{#if data.contactInfo}
		<Footer data={data.contactInfo} />
	{/if}
</div>

{#if $isPreviewing && VisualEditingComponent}
	<svelte:component this={VisualEditingComponent} />
	<LiveMode />
{/if}

<style>
	.container {
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-top: var(--header-height);
	}

	@media (min-width: 768px) {
		main {
			margin-top: 0;
		}
	}

	.preview-toggle {
		backdrop-filter: blur(12px);
		border-radius: 0.25rem;
		bottom: 1rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		color: #1f2937;
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1rem;
		padding-bottom: 0.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		z-index: 50;
	}

	.preview-toggle:hover {
		background-color: #ef4444;
		color: #ffffff;
	}

	.preview-toggle span:first-child {
		display: block;
	}
	.preview-toggle:hover span:first-child {
		display: none;
	}

	.preview-toggle span:last-child {
		display: none;
	}
	.preview-toggle:hover span:last-child {
		display: block;
	}
</style>
