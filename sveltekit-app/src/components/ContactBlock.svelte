<script lang="ts">
	import type { ContactInfo, HomePage } from '$lib/sanity/queries';
	import { PortableText } from '@portabletext/svelte';
	import ContactForm from './ContactForm.svelte';
	import Icon from './Icon.svelte';

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

					{#if contactInfo.address}
						<div class="contact-item">
							<Icon name="MapPin" color="var(--red)" size="1.5rem" />
							<p>Address: {contactInfo.address}</p>
						</div>
					{/if}

					{#if homePage.contact.officeHours}
						<div class="contact-item">
							<Icon name="Clock" color="var(--red)" size="1.5rem" />
							<PortableText value={homePage.contact.officeHours} />
						</div>
					{/if}
				</div>
			{/if}
			<div class="contact-form">
				<h3>Contact Form</h3>
				<ContactForm />
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
		padding-block: var(--padding-block);
	}

	.inner {
		max-width: var(--max-width-1);
		width: 100%;
		text-align: center;
	}

	.inner h2 {
		width: 100%;
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
		gap: 1rem;
	}

	.contact-item :global(svg) {
		flex: 0 0 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
	}

	@media (max-width: 767px) {
		.content {
			flex-direction: column;
		}
	}
</style>
