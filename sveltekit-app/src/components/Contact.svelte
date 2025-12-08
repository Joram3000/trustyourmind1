<script lang="ts">
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

			<p>your name</p>
			<p>emailaddress</p>
			<p>phone number</p>
			<button>submit</button>
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
		width: 100%;
		border: 1px dashed orange;
	}
</style>
