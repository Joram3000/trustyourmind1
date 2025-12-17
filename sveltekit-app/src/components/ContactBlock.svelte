<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ContactInfo, HomePage } from '$lib/sanity/queries';
	import Icon from './Icon.svelte';
	export let form;

	export let homePage: HomePage;
	export let contactInfo: ContactInfo | null = null;
</script>

<div class="container">
	<div class="inner">
		<h2>{homePage.contact.title}</h2>
		<p>{homePage.contact.subtitle}</p>

		<div class="content">
			{#if !contactInfo}
				<p>Loading contact information...</p>
			{:else}
				<div class="contact-info">
					<h3>Contact Information</h3>
					<div class="contact-item">
						<Icon name="phone" color="var(--red)" size="1.5rem" />
						<a href={`tel:${contactInfo.phoneNumber}`}>{contactInfo.phoneNumber}</a>
					</div>
					<div class="contact-item">
						<Icon name="mail" color="var(--red)" size="1.5rem" />
						<a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
					</div>
					<div class="contact-item">
						<Icon name="MapPin" color="var(--red)" size="1.5rem" />
						<p>Address: {contactInfo.address}</p>
					</div>
				</div>
			{/if}

			<div class="contact-form">
				<h3>Contact Form</h3>
				{#if form?.success}
					<p>Successfully submitted the form.</p>
				{:else}
					<form method="POST" action="?/contactForm" use:enhance>
						<div>
							{#if form?.errors?.name}<p class="error">{form.errors.name}</p>{/if}
							<label>
								<span class="label-text">Name</span>
								<input
									placeholder="Your Name"
									name="name"
									type="text"
									value={form?.values?.name ?? ''}
								/>
							</label>
						</div>
						<div>
							{#if form?.errors?.email}<p class="error">{form.errors.email}</p>{/if}
							<label>
								<span class="label-text">Email</span>
								<input
									name="email"
									type="email"
									value={form?.values?.email ?? ''}
									placeholder="your@emailaddress"
								/>
							</label>
						</div>
						<div>
							{#if form?.errors?.message}<p class="error">{form.errors.message}</p>{/if}
							<label>
								<span class="label-text">Message</span>
								<textarea name="message" rows="8" placeholder="Your message"
									>{form?.values?.message ?? ''}</textarea
								>
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
	}

	.content {
		display: flex;
		flex-direction: row;
		width: 100%;
		text-align: left;
		gap: 1rem;
		padding: 1rem 0;
	}

	.contact-info,
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.contact-info {
		flex: 2;
	}

	.contact-form {
		flex: 3;
	}

	.contact-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1rem;
	}

	.contact-item :global(svg) {
		flex: 0 0 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
	}

	.contact-form form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-form label {
		display: flex;

		gap: 1rem;
	}

	.label-text {
		display: none;
		width: 4rem;
		flex-shrink: 0;
		font-weight: 600;
	}

	.contact-form p {
		text-align: center;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		flex: 1;
		padding: 0.5rem;
	}

	button:hover {
		scale: none;
	}

	.error {
		color: red;
		font-style: italic;
	}
</style>
