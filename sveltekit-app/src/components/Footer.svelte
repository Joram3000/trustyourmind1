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
		<a href="/disclaimer">Disclaimer</a>
	</div>
</footer>

<style>
	.container {
		background-color: var(--darkbrown);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		padding: 1rem;
		max-width: var(--max-width-1);
	}

	.inner {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.left,
	.right {
		flex: 1;
	}

	.right {
		text-align: right;
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
	}
</style>
