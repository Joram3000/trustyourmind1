<script lang="ts">
	import type { ContactInfo } from '$lib/sanity/queries';

	export let data: ContactInfo;
</script>

<footer class="container">
	<div class="inner">
		<p>{data.name}</p>
		<p>Email: {data.email}</p>
		<p>Phone: {data.phoneNumber}</p>
	</div>
</footer>

<style>
	.container {
		background-color: var(--darkbrown);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}

	.inner {
		max-width: var(--max-width-1);
	}

	@media (min-width: 768px) {
	}
</style>
