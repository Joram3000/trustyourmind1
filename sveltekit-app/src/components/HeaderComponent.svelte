<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { type Header } from '$lib/sanity/queries';

	export let data: Header | null;

	$: items = data?.items ?? [];

	let menuOpen = false;
	let loaded = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) {
			closeMenu();
		}
	}

	function handleItemClick() {
		if (menuOpen) closeMenu();
	}

	$: pathname = $page.url.pathname;

	function isActive(route: string) {
		if (route === '/') return pathname === '/';
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		const t = setTimeout(() => (loaded = true), 20);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			clearTimeout(t);
		};
	});
</script>

<header class="container" class:loaded>
	<button
		class="menu-button"
		on:click={toggleMenu}
		aria-expanded={menuOpen}
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		aria-controls="mobile-navigation"
	>
		{#if menuOpen}
			<X size="1.75rem" />
		{:else}
			<Menu size="1.75rem" />
		{/if}
	</button>

	{#if menuOpen}
		<nav
			id="mobile-navigation"
			class="nav nav--mobile"
			aria-label="Primary navigation"
			in:fly={{ y: -12, duration: 180, easing: quintOut }}
			out:fade={{ duration: 120 }}
		>
			{#each items as item}
				<a
					class="header__title"
					href={item.link}
					class:active={isActive(item.link)}
					aria-current={isActive(item.link) ? 'page' : undefined}
					on:click={handleItemClick}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	{/if}

	<nav class="nav nav--desktop" aria-label="Primary navigation">
		{#each items as item}
			<a
				class="header__title"
				href={item.link}
				class:active={isActive(item.link)}
				aria-current={isActive(item.link) ? 'page' : undefined}
				on:click={handleItemClick}
			>
				{item.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	.container {
		display: flex;
		z-index: 10;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: var(--header-height);
		align-items: center;
		margin: 0;
		padding: 1rem;
		background-color: var(--darkbrown);
		border-bottom: 2px solid var(--darkbrown);
		opacity: 0;
		transform: translateY(-0.25rem);
		transition:
			opacity 360ms ease,
			transform 360ms ease;
	}

	.container.loaded {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.container,
		.container.loaded {
			transition: none;
			transform: none;
			opacity: 1;
		}
	}

	.menu-button {
		background: transparent;
		border: none;
		color: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		border-radius: 0;
	}

	.nav {
		display: flex;
		gap: 1rem;
	}

	.nav--mobile {
		position: absolute;
		left: 0;
		right: 0;
		top: var(--header-height);
		padding: 1rem;
		flex-direction: column;
		background: var(--darkbrown);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
		z-index: 9;
	}

	.nav--desktop {
		display: none;
	}

	.nav a {
		font-size: 1.25rem;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		transform-origin: center;
		transition:
			transform 160ms ease,
			opacity 160ms ease,
			color 160ms ease;
		-webkit-tap-highlight-color: transparent;
	}

	.nav a:hover {
		opacity: 0.8;
	}

	.nav a:focus {
		outline: none;
	}

	.nav a:focus-visible {
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
	}

	.nav a.active {
		text-decoration: underline;
	}

	@media (min-width: 768px) {
		.container {
			background-color: transparent;
			border-bottom: none;
		}

		.nav--mobile {
			display: none;
		}

		.nav--desktop {
			display: flex;
			position: static;
			padding: 0;
			flex-direction: row;
			gap: 3rem;
		}

		.menu-button {
			display: none;
		}

		.nav a:hover {
			transform: scale(1.04);
		}
	}
</style>
