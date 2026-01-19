import { customPageQuery as query, type CustomPage } from '$lib/sanity/queries';
import { contactFormAction } from '$lib/server/contactFormAction';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<CustomPage>(query, params);

	// We pass the data in a format that is easy for `useQuery` to consume in the
	// corresponding `+page.svelte` file, but you can return the data in any
	// format you like.
	return {
		query,
		params,
		options: { initial }
	};
};

export const actions: Actions = {
	contactForm: contactFormAction
};
