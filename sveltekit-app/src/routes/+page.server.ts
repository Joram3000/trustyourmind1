import { homePageQuery as query, type HomePage } from '$lib/sanity/queries';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<HomePage>(query);

	// We pass the data in a format that is easy for `useQuery` to consume in the
	// corresponding `+page.svelte` file, but you can return the data in any
	// format you like.
	return {
		query,
		options: { initial }
	};
};

export const actions = {
	contactForm: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const errors = {
			name: name ? null : 'Naam is verplicht', // COPY: NEEDS TRANSLATION
			email: email
				? emailRegex.test(email)
					? null
					: 'Ongeldig e-mailadres.' // COPY: NEEDS TRANSLATION
				: 'Email is verplicht' // COPY: NEEDS TRANSLATION
		};

		if (errors.name || errors.email) {
			return fail(400, { success: false, values: { name, email }, errors });
		}

		return { success: true };
	}
} satisfies Actions;
