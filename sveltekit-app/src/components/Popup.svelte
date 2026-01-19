<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void }>();

	/** Controls visibility of the popup */
	export let open = false;
	/** Allow closing the popup when the lightbox background is clicked */
	export let closeOnOverlayClick = true;

	const close = () => {
		if (!open) return;
		open = false;
		dispatch('close');
	};

	const handleOverlayInteraction = (event: MouseEvent | KeyboardEvent) => {
		if (event.type === 'click' && event.currentTarget !== event.target) return;
		if (event instanceof KeyboardEvent && !['Escape', 'Enter', ' '].includes(event.key)) {
			return;
		}

		event.preventDefault();
		if (closeOnOverlayClick) close();
	};
</script>

{#if open}
	<div
		class="overlay"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		on:click={handleOverlayInteraction}
		on:keydown={handleOverlayInteraction}
	>
		<div class="popup" role="document" tabindex="-1">
			<slot />
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: color-mix(in srgb, black 70%, transparent);
		backdrop-filter: blur(5px);
		z-index: 999;
	}

	.popup {
		position: absolute;
		width: clamp(500px, 80vw, 1100px);
		max-width: calc(100% - 2rem);
		/* max-height: calc(80vh - 2rem); */
		overflow: auto;
		color: var(--black);
		border-radius: 12px;
		padding: 1.25rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
	}

	/* Ensure embedded content like iframes can expand */
	.popup :global(iframe) {
		display: block;
		width: 100%;
		height: min(80vh, 650px);
		border: none;
		border-radius: 12px;
		background: #fff;
	}
</style>
