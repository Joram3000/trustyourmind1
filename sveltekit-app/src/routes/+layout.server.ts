import type { LayoutServerLoad } from './$types';
import {
	contactInfoQuery as query,
	headerQuery,
	type ContactInfo,
	type Header
} from '$lib/sanity/queries';
import { client } from '$lib/sanity/client';

export const load: LayoutServerLoad = async (event) => {
	const { preview } = event.locals;

	const contactInfo = await client.fetch<ContactInfo>(query);
	const header = await client.fetch<Header>(headerQuery);

	return { preview, contactInfo, header };
};
