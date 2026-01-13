<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let form;
	$: form = $page.form;
</script>

<div class="contact-form">
	<!-- keep the form in the DOM so its height is preserved,
         show a success-panel absolutely on top when submitted -->
	<div class="form-inner">
		<form
			method="POST"
			action="?/contactForm"
			use:enhance
			aria-hidden={form?.success ? 'true' : 'false'}
			class:hidden={form?.success}
		>
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

		<div
			class="success-panel"
			aria-hidden={form?.success ? 'false' : 'true'}
			class:visible={form?.success}
		>
			<p class="success-message">Successfully submitted the form.</p>
		</div>
	</div>
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
		transition: opacity 160ms ease;
	}

	/* keep form in flow but hide its visuals when submitted so container height is preserved */
	.contact-form form.hidden,
	.contact-form form[aria-hidden='true'] {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
	}

	/* wrapper that preserves height because the form remains in the DOM */
	.form-inner {
		position: relative;
	}

	/* success panel is positioned on top of the preserved form area */
	.success-panel {
		position: absolute;
		inset: 0;
		display: flex;
		place-items: center;
		justify-content: center;
		padding: 1rem;
		pointer-events: none;
		opacity: 0;
		transition: opacity 160ms ease;
	}

	.success-panel.visible,
	.success-panel[aria-hidden='false'] {
		opacity: 1;
		pointer-events: auto;
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
