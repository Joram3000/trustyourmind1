import type { LayoutServerLoad } from './$types';
import { contactInfoQuery as query, type ContactInfo } from '$lib/sanity/queries';
import { client } from '$lib/sanity/client';

export const load: LayoutServerLoad = async (event) => {
	const { preview } = event.locals;

	const contactInfo = await client.fetch<ContactInfo>(query);

	return { preview, contactInfo };
};
