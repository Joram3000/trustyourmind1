<script lang="ts">
	import type { HomePage } from '$lib/sanity/queries';
	import { PortableText } from '@portabletext/svelte';
	import Icon from './Icon.svelte';

	export let homePage: HomePage;
</script>

<div class="container">
	<div class="inner">
		<h2>{homePage.usp.title}</h2>
		<ul>
			{#each homePage.usp.cards as card}
				<li class="card">
					<Icon name={card.icon} color="var(--red)" size="3rem" />
					<h3>{card.title}</h3>
					<p>{card.content}</p>
				</li>{/each}
		</ul>

		<div class="content">
			<PortableText components={{}} value={homePage.usp.content} />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--brown);
		padding: 1rem;
		padding-block: var(--padding-block);
	}

	.inner {
		max-width: var(--max-width-1);
		display: flex;
		flex-direction: column;
	}

	.inner h2 {
		text-align: center;
	}

	.inner ul {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem 0;
		list-style: none;
	}

	.card {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}

	.card p {
		color: var(--muted-foreground);
		flex: 1;
	}

	.content {
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}

	@media (max-width: 767px) {
		.inner ul {
			flex-direction: column;
		}
	}
</style>
