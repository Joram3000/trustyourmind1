<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let form;
	$: form = $page.form;
</script>

<div class="contact-form">
	{#if form?.success}
		<p>Successfully submitted the form.</p>
	{:else}
		<form method="POST" action="?/contactForm" use:enhance>
			<div>
				{#if form?.errors?.name}<p class="error">{form.errors.name}</p>{/if}
				<label>
					<span class="label-text">Name</span>
					<input placeholder="Your Name" name="name" type="text" value={form?.values?.name ?? ''} />
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

<style>
	.contact-form {
		display: flex;
		flex-direction: column;

		gap: 0.5rem;
		width: 100%;
	}

	.contact-form {
		flex: 3;
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

	.contact-form input::placeholder,
	.contact-form textarea::placeholder,
	.contact-form textarea {
		font-family: var(--font-family-crimson);
		font-size: 1rem;
	}

	button:hover {
		scale: none;
	}

	.error {
		color: red;
		font-style: italic;
	}
</style>
