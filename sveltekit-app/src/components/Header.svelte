<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// function openMenu() {
	// 	menuOpen = true;
	// }

	function closeMenu() {
		menuOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) {
			closeMenu();
		}
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
			<X class="icon" />
		{:else}
			<Menu class="icon" />
		{/if}
	</button>

	<!-- Example nav (toggle visibility via menuOpen). Replace or hook into your actual nav as needed -->
	<nav id="site-navigation" class:open={menuOpen} hidden={!menuOpen}>
		<!-- nav items go here -->

		<a class="header__title" href="/">Home</a>
		<a class="header__title" href="/about">About</a>
	</nav>
</header>

<style>
	.container {
		display: flex;
		/* padding-left: 0 1rem; */
		background-color: rgba(0, 0, 0, 0.743);

		z-index: 10;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: var(--header-height);
		align-items: center;
		gap: 1rem;
		margin: 0;
		padding: 0rem 1rem;
	}

	.menu-button {
		background: transparent;
		border: none;
		color: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		cursor: pointer;
	}

	:global(svg) {
		width: 1.75rem;
		height: 1.75rem;
	}

	nav {
		/* simple hidden-by-default nav for mobile; adapt to your layout */
		display: none;
	}

	nav.open {
		display: block;
	}

	@media (min-width: 768px) {
		.container {
			position: unset;
			border-bottom: none;
			/* margin: 12px 0; */
			/* padding: 8px 0; */
			/* background: unset; */
		}

		/* show nav by default on larger screens */
		nav {
			display: block;
		}
	}
</style>
