import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export const contactInfoQuery = groq`*[_type == "contact"][0]`;

export const homePageQuery = groq`*[_type == "homePage"][0]`;

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export interface ContactInfo {
	_type: 'contact';
	_createdAt: string;
	name: string;
	email: string;
	phoneNumber: string;
	address?: string;
	kvk?: string;
}

export interface HomePage {
	_type: 'homePage';
	hero: {
		headline: string;
		subheadline: string;
		excerpt: string;
		callToAction: Button;
		backgroundImage?: ImageAsset;
	};
	usp: {
		title: string;
		cards: Card[];
		content: PortableTextBlock[];
	};
	services: {
		headline: string;
		subheadline: string;
		cards: Card[];
	};
}

export interface Button {
	label: string;
	// add URL
}

export interface Card {
	icon: string;
	title: string;
	content: string;
}
