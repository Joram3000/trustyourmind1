<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: post } = $q);
</script>

<svelte:head>
	<title>{post.title ?? 'Post by Niko Malafek'}</title>
	<meta name="description" content={post.seo?.description} />

	<link rel="canonical" href={post.seo?.canonical} />
</svelte:head>

<section>
	<div class="post">
		{#if post.mainImage}
			<img
				class="post__cover"
				src={urlFor(post.mainImage).url()}
				alt="Cover image for {post.title}"
			/>
		{:else}
			<div class="post__cover--none"></div>
		{/if}
		<div class="post__container">
			<h1>{post.title}</h1>
			{#if post.excerpt}
				<p class="post__excerpt">{post.excerpt}</p>
			{/if}
			<p class="post__date">
				{formatDate(post._createdAt)}
			</p>
			{#if post.body}
				<div class="post__content">
					<PortableText components={{}} value={post.body} />
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	section {
		background-color: var(--brown);
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-block-end: var(--padding-block);
	}

	.post {
		width: 100%;
		max-width: var(--max-width-1);
		margin: var(--header-height) auto 0;
		height: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1rem;
	}

	.post .post__cover,
	.post .post__cover--none {
		width: 100%;
		height: 200px;
		-o-object-fit: cover;
		object-fit: cover;
	}

	.post .post__cover--none {
		background: var(--black);
		width: 100%;
	}

	:global(.post .post__content blockquote) {
		/* /border-left: 5px solid var(--black); */
		padding: 1rem;
	}

	:global(.post .post__content a) {
		color: var(--blue-600);
		text-decoration: none;
	}

	.post .post__excerpt {
		font-family: var(--font-family-serif);
		font-size: var(--font-size-5);
		line-height: var(--line-height-4);
		margin-top: 0;
		font-weight: 400;
	}

	.post .post__date {
		font-family: var(--font-family-sans);
		font-weight: 600;
		font-family: var(--font-family-sans);
		font-size: var(--font-size-1);
		line-height: var(--line-height-1);
		margin-top: var(--space-4);
		text-align: right;
	}

	@media (min-width: 800px) {
		.post .post__cover,
		.post .post__cover--none {
			width: 100%;
			height: 380px;
		}

		.post .post__excerpt {
			font-size: var(--font-size-5);
			line-height: var(--line-height-5);
			margin-top: var(--space-3);
			margin-bottom: var(--space-3);
		}

		.post .post__date {
			font-size: var(--font-size-3);
			line-height: var(--line-height-2);
			margin-top: var(--space-0);
		}
	}
</style>
