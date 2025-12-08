<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import { onMount } from 'svelte';
	import type { ContactInfo } from '$lib/sanity/queries';
	import Footer from '../components/Footer.svelte';
	let outlineEnabled = true;

	export let data: { preview: boolean; contactInfo: ContactInfo | null };

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
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="container">
	<!-- <header class="header">
		<a class="header__title" href="/">Home</a>
	</header> -->
	<main>
		<slot />
	</main>

	{#if data.contactInfo}
		<Footer data={data.contactInfo} />
	{/if}
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style>
	.container {
		margin: 0 auto;
	}

	main {
		margin-top: 45px;
	}

	.header {
		display: flex;
		padding: 0 4px;
		border-bottom: 1px solid #ced2d9;

		z-index: 10;
		background: var(--white);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}

	@media (min-width: 768px) {
		.container {
			/* max-width: var(--max-width-1); */
		}

		main {
			margin-top: unset;
		}

		.header {
			position: unset;
			border-bottom: none;
			margin: 12px 0;
			padding: 8px 0;
			background: unset;
		}

		.header .header__title {
			margin: 12px 0 8px;
			font-size: 20px;
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
