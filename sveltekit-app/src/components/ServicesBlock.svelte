<script lang="ts">
	import type { HomePage } from '$lib/sanity/queries';
	import Icon from './Icon.svelte';

	export let homePage: HomePage;
</script>

<div class="container">
	<div class="inner">
		<h2>{homePage.services.headline}</h2>
		<p>
			{homePage.services.subheadline}
		</p>
		<ul>
			{#each homePage.services.cards as card}
				<li class="card">
					<Icon name={card.icon} color="var(--red)" size="2rem" />
					<h3>{card.title}</h3>
					<p>{card.content}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.container {
		display: flex;
		background-color: var(--darkbrown);
		justify-content: center;
		padding: 1rem;
	}

	.inner {
		max-width: var(--max-width-1);
		text-align: center;
	}

	.inner p {
		color: var(--muted-foreground);
		flex: 1;
	}

	.inner ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		padding: 1rem 0;
		list-style: none;
		text-align: left;
	}

	.card {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.04);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
