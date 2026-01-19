import { homePageQuery as query, type HomePage } from '$lib/sanity/queries';
import { contactFormAction } from '$lib/server/contactFormAction';
import type { PageServerLoad, Actions } from './$types';

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

export const actions: Actions = {
	contactForm: contactFormAction
} satisfies Actions;
