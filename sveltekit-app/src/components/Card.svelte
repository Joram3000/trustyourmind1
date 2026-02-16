<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { Post } from '$lib/sanity/queries';

	export let post: Post;
</script>

<a class="card" href={`/posts/${post.slug.current}`}>
	{#if post.mainImage}
		<enhanced:img
			class="card__cover"
			src={urlFor(post.mainImage.asset).width(500).height(300).url()}
			alt="Cover image for {post.title}"
		/>
	{:else}
		<div class="card__cover--none"></div>
	{/if}

	<div class="card__container">
		<h3 class="card__title">
			{post.title}
		</h3>
		{#if post.excerpt}
			<p class="card__excerpt">{post.excerpt}</p>
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		position: relative;
		text-decoration: none;
		gap: 1rem;
	}

	.card .card__container {
		display: flex;
		flex-direction: column;
		/* flex: 1; */
		justify-content: space-between;
	}

	.card__title {
		font-size: 2rem;
	}

	.card .card__cover {
		width: 100%;
		height: 231px;
		-o-object-fit: cover;
		object-fit: cover;
	}

	.card .card__cover--none {
		width: 100%;
		height: 231px;
		background: var(--black);
	}

	.card .card__excerpt {
		font-family: var(--font-family-serif);
		font-weight: 400;
		font-size: var(--font-size-4);
		line-height: var(--line-height-3);
		margin-top: 0;
	}

	.card:hover {
		opacity: 0.8;
		transition: 0.2s ease-in-out;
		border: 1px solid rgb(89, 40, 44);
		scale: 1.01;
	}
</style>
