<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
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

	// nieuw: sluit menu met animatie en navigeer daarna
	function handleItemClick(e: MouseEvent, href?: string) {
		if (!menuOpen || !href) return; // als menu niet open is gewoon doorlaten
		// alleen voor mobiele ervaring: sluit menu eerst zodat de reverse CSS transition speelt
		// voorkom directe navigatie
		e.preventDefault();

		// start sluit-animatie
		closeMenu();

		// CSS gebruikt 320ms voor de nav-transitions; voeg kleine buffer toe
		const NAV_CLOSE_DELAY = 340;

		// interne routes via SvelteKit goto, externe links via location
		const isInternal = href.startsWith('/');

		setTimeout(() => {
			if (isInternal) {
				goto(href);
			} else {
				window.location.href = href;
			}
		}, NAV_CLOSE_DELAY);
	}

	$: pathname = $page.url.pathname;
	$: params = $page.params;

	function isActive(route: string) {
		if (route === '/') return pathname === '/';
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		// korte timeout zodat de browser de initiële stijl registreert en de transition loopt
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
		aria-controls="site-navigation"
	>
		{#if menuOpen}
			<X size="1.75rem" />
		{:else}
			<Menu size="1.75rem" />
		{/if}
	</button>

	<nav id="site-navigation" class:open={menuOpen} class:tre={menuOpen} aria-hidden={!menuOpen}>
		{#each items as item}
			<a
				class="header__title"
				href={item.link}
				class:active={isActive(item.link)}
				aria-current={isActive(item.link) ? 'page' : undefined}
				on:click={(e) => handleItemClick(e, item.link)}
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
		background: var(--darkbrown);
		border-bottom: 2px solid var(--darkbrown);
		/* fade-in start */
		opacity: 0;
		transform: translateY(-0.25rem);
		transition:
			opacity 360ms ease,
			transform 360ms ease;
	}

	/* eindstaat na mount */
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

	/* ---------------------------
       Mobile menu: slide & fade
       --------------------------- */
	nav {
		/* keep in DOM so transitions can run */
		display: flex;
		flex-direction: column;
		gap: 1rem;

		position: absolute;
		left: 0;
		right: 0;
		top: var(--header-height);
		overflow: hidden;

		/* closed state */
		max-height: 0;
		padding: 0 1rem;
		opacity: 0;
		transform: translateY(-0.5rem);
		transition:
			max-height 320ms cubic-bezier(0.2, 0.9, 0.2, 1),
			opacity 320ms ease,
			transform 320ms ease,
			padding 320ms ease;
		pointer-events: none;
	}

	/* open state on mobile */
	nav.open {
		max-height: 80vh; /* enough for menu items */
		padding: 1rem;
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	/* background class for mobile (tre) */
	nav.tre {
		/* use a variable or fallback */
		background: var(--darkbrown);
		backdrop-filter: blur(6px);
	}

	nav a {
		font-size: 1.25rem;

		/* voorkom layout-shift bij hover/click */
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

	nav a:hover {
		opacity: 0.8;
	}

	/* behoud toegankelijke focus zonder layout shift */
	nav a:focus {
		outline: none;
	}
	nav a:focus-visible {
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
		/* border-radius: 4px; */
	}
	nav a.active {
		text-decoration: underline;
	}

	/* ---------------------------
       Desktop overrides
       --------------------------- */
	@media (min-width: 768px) {
		.container {
			background-color: transparent;
			border-bottom: none;
		}
		nav {
			position: static;
			overflow: visible;
			max-height: none;
			padding: 0;
			opacity: 1;
			transform: none;
			pointer-events: auto;
			display: block;
			flex-direction: row;
			gap: 3rem;
			display: flex;
			flex-direction: row;
			gap: 3rem;
			transition: none;
		}

		.menu-button {
			display: none;
		}

		/* don't apply mobile background on desktop */
		nav.tre {
			background: transparent;
			backdrop-filter: none;
		}

		nav a:hover {
			transform: scale(1.04);
		}
	}
</style>
