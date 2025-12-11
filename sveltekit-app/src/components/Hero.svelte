<script lang="ts">
	import type { HomePage } from '$lib/sanity/queries';

	export let homePage: HomePage;
</script>

<div class="container">
	<div class="inner">
		<h1>{homePage.hero.headline}</h1>
		<p>{homePage.hero.subheadline}</p>
		<p>
			{homePage.hero.excerpt}
		</p>
		<button>{homePage.hero.callToAction.label}</button>
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
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 2rem;
		max-width: var(--max-width-1);
		padding: 1rem;
		/* margin: 1rem; */
	}
</style>
