import { EMAIL_TO, RESEND_API_KEY } from '$env/static/private';
import { fail, type Action } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const contactFormAction: Action = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get('name')?.toString().trim() ?? '';
	const email = formData.get('email')?.toString().trim() ?? '';
	const message = formData.get('message')?.toString().trim() ?? '';
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const errors = {
		name: name ? null : 'Name is required',
		email: email ? (emailRegex.test(email) ? null : 'Invalid email address.') : 'Email is required',
		message: message.length > 10 ? null : 'Message must be longer than 10 characters'
	};

	if (errors.name || errors.email || errors.message) {
		return fail(400, { success: false, values: { name, email, message }, errors });
	}

	try {
		const { error } = await resend.emails.send({
			from: 'Contactform Trust Your Mind <contactform@trustyourmind.nl>',
			replyTo: email,
			to: [EMAIL_TO],
			subject: `New message from ${name} (${email}) via contact form`,
			html: `<p>${message} ${email}</p>`
		});

		if (error) {
			console.error('Resend error', error);
			return fail(502, {
				success: false,
				values: { name, email, message },
				errors: { message: 'Sending failed.' }
			});
		}
	} catch (err) {
		console.error('Resend exception', err);
		return fail(502, {
			success: false,
			values: { name, email, message },
			errors: { message: 'Unknown error while sending.' }
		});
	}

	return { success: true };
};
