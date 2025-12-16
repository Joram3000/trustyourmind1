<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from './Icon.svelte';
	export let form;
</script>

<div class="container">
	<div class="inner">
		<h2>Get in Touch</h2>
		<p>Taking the first step can feel daunting. We're here to make it easier.</p>

		<div class="content">
			<div class="contact-info">
				<h3>Contact Information</h3>
				<div class="contact-item">
					<Icon name="phone" color="var(--red)" size="1.5rem" />
					<p>Phone: +123 456 7890</p>
				</div>
				<div class="contact-item">
					<Icon name="mail" color="var(--red)" size="1.5rem" />

					<p>Email: contact@trustyourmind.com</p>
				</div>
				<div class="contact-item">
					<Icon name="MapPin" color="var(--red)" size="1.5rem" />
					<p>Address: 123 Mindful Lane, Wellness City, Country</p>
				</div>
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
						<p>All inquiries are confidential and will be responded to within 24 hours.</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		background-color: var(--brown);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}

	.inner {
		max-width: var(--max-width-1);
		width: 100%;
		text-align: center;
	}

	.inner h2 {
		width: 100%;
	}

	.inner p {
		color: var(--muted-foreground);
	}

	.content {
		display: flex;
		flex-direction: row;
		width: 100%;
		text-align: left;
		gap: 1rem;
	}

	.contact-info,
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.contact-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1rem;
	}

	.contact-item p {
		width: 80%;
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
