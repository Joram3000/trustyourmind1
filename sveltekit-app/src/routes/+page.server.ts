import { homePageQuery as query, type HomePage } from '$lib/sanity/queries';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { Resend } from 'resend';
import { EMAIL_TO, RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const parentDataPromise = event.parent();
	const initialPromise = loadQuery<HomePage>(query);

	const [initial, parentData] = await Promise.all([initialPromise, parentDataPromise]);

	// We pass the data in a format that is easy for `useQuery` to consume in the
	// corresponding `+page.svelte` file, but you can return the data in any
	// format you like.
	return {
		query,
		options: { initial },
		contactInfo: parentData.contactInfo
	};
};

export const actions = {
	contactForm: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const message = formData.get('message')?.toString().trim() ?? '';
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const errors = {
			name: name ? null : 'Name is required',
			email: email
				? emailRegex.test(email)
					? null
					: 'Invalid email address.'
				: 'Email is required',
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
	}
} satisfies Actions;
