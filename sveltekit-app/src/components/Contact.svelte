<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="container">
	<h2>Get in Touch</h2>
	<p>Taking the first step can feel daunting. We're here to make it easier.</p>

	<div class="inner">
		<div class="contact-info">
			<h3>Contact Information</h3>
			<p>Email: contact@trustyourmind.com</p>
			<p>Phone: +123 456 7890</p>
			<p>Address: 123 Mindful Lane, Wellness City, Country</p>
		</div>

		<div class="contact-form">
			<h3>Contact Form</h3>
			{#if form?.success}
				<p>Successfully submitted the form!</p>
			{:else}
				<form method="POST" action="?/contactForm" use:enhance>
					<div>
						{#if form?.errors?.name}<p class="error">{form.errors.name}</p>{/if}
						<label>
							Name
							<input name="name" type="text" value={form?.values?.name ?? ''} />
						</label>
					</div>
					<div>
						{#if form?.errors?.email}<p class="error">{form.errors.email}</p>{/if}
						<label>
							Email
							<input name="email" type="email" value={form?.values?.email ?? ''} />
						</label>
					</div>
					<button type="submit">Submit</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		background-color: var(--brown);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.inner {
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: var(--max-width-1);
	}

	.contact-info,
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.contact-form form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-form label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.contact-form input {
		width: 100%;
		flex: 2;
	}

	.error {
		color: red;
		font-style: italic;
	}
</style>
