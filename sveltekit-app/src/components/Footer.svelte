<script lang="ts">
	import type { ContactInfo } from '$lib/sanity/queries';

	export let data: ContactInfo;
</script>

<footer class="container">
	<div class="inner left">
		<p>{data.name}</p>
		<a href={`mailto:${data.email}`}>Email: {data.email}</a>
		<a href={`tel:${data.phoneNumber}`}>Phone: {data.phoneNumber}</a>
		{#if data.kvk}
			<p>KVK: {data.kvk}</p>
		{/if}
		{#if data.nip}
			<p>NIP: {data.nip}</p>
		{/if}
	</div>
	<div class="right">
		<a href="https://nip.nl/" target="_blank" rel="noopener noreferrer">
			<img src="/NIPlogo.webp" alt="nip-logo" width="80" height="auto" />
		</a>
		<a href="/disclaimer">Disclaimer</a>
	</div>
</footer>

<style>
	.container {
		background-color: var(--darkbrown);
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		padding: 1rem;
		max-width: var(--max-width-1);
		gap: 1rem;
	}

	.inner {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.left,
	.right {
		flex: 1;
	}

	.right {
		text-align: right;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	p,
	a {
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			padding: 1rem 0;
		}

		.right {
			flex-direction: column;
			align-items: flex-end;
		}
	}
</style>
