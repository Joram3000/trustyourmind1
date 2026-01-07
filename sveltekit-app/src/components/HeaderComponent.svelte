<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { type Header } from '$lib/sanity/queries';

	export let data: Header | null;

	$: items = data?.items ?? [];

	let menuOpen = false;

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

	$: pathname = $page.url.pathname;
	$: params = $page.params;

	function isActive(route: string) {
		if (route === '/') return pathname === '/';
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<header class="container">
	<button
		class="menu-button"
		on:click={toggleMenu}
		aria-expanded={menuOpen}
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		aria-controls="site-navigation"
	>
		{#if menuOpen}
			<X size="1.75rem" />
		{:else}
			<Menu size="1.75rem" />
		{/if}
	</button>

	<nav id="site-navigation" class:open={menuOpen} hidden={!menuOpen}>
		{#each items as item}
			<a
				class="header__title"
				href={item.link}
				class:active={isActive(item.link)}
				aria-current={isActive(item.link) ? 'page' : undefined}
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
	}

	.menu-button {
		background: transparent;
		border: none;
		color: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0rem;
		border-radius: 0;
	}

	nav {
		display: none;
	}

	nav a {
		font-size: 1.25rem;
	}

	nav a:hover {
		opacity: 0.8;
		scale: 1.04;
	}

	nav a.active {
		text-decoration: underline;
	}

	nav.open {
		display: block;
		flex-direction: column;
		gap: 1rem;
		display: flex;
		position: absolute;
		top: var(--header-height);
	}

	@media (min-width: 768px) {
		nav {
			display: block;
			flex-direction: row;
			gap: 1rem;
			display: flex;
		}

		.menu-button {
			display: none;
		}
	}
</style>
