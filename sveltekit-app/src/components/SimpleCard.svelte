<script lang="ts">
	// simple card, brown with a border,
	//with isSecureContext, title and content
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		border: 1px solid var(--border-color, #ff00ff);
	}
</style>
