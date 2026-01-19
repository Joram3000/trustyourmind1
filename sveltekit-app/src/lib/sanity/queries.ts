import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const contactInfoQuery = groq`*[_type == "contactInformation"][0]`;
export const headerQuery = groq`*[_type == "header"][0]`;

export const homePageQuery = groq`*[_type == "homePage"][0]`;
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`;

export const customPageQuery = groq`*[_type == "customPage" && slug.current == $slug][0]`;
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;
export const postsPageQuery = groq`*[_type == "postsPage"][0]{
	...,
	posts[]->{
		_id,
		_type,
		_createdAt,
		title,
		slug,
		excerpt,
		mainImage,
	}
}`;

export interface SanityImage {
	_type: 'image';
	asset: ImageAsset;
	alt?: string;
	hotspot?: { x: number; y: number; height: number; width: number };
	crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: SanityImage;
	body?: PortableTextBlock[];
	seo?: SEO;
}

export interface ContactInfo {
	_type: 'contactInformation';
	name: string;
	email: string;
	phoneNumber: string;
	address?: string;
	kvk?: string;
}

export interface AboutPage {
	_type: 'aboutPage';
	title?: string;
	sections: Sections;
	seo: SEO;
}

export interface CustomPage {
	_type: 'customPage';
	title?: string;
	slug: Slug;
	sections: Sections;
	seo: SEO;
}

export interface PostsPage {
	_type: 'postsPage';
	title: string;
	posts: Post[];
	seo: SEO;
}

export interface HomePage {
	_type: 'homePage';
	hero: Hero;
	usp: {
		title: string;
		subheadline?: string;
		cards: Card[];
		content: PortableTextBlock[];
	};
	services: {
		headline: string;
		subheadline?: string;
		cards: Card[];
		content?: PortableTextBlock[];
	};
	contact: {
		title: string;
		subtitle: string;
		officeHours: PortableTextBlock[];
	};
	seo: SEO;
}

export interface Button {
	label: string;
	url: string;
	openInNewTab?: boolean;
}

export interface Card {
	icon: string;
	title: string;
	content: string;
}

export type Sections = (Hero | TextBlock | Gallery | ContactForm)[];

export interface Hero {
	_type: 'hero';
	_key: string;
	headline: string;
	subheadline?: string;
	excerpt?: string;
	callToAction?: Button;
	backgroundImage?: SanityImage;
}

export interface Gallery {
	_type: 'imageGallery';
	_key: string;
	images: SanityImage[];
}

export interface TextBlock {
	_type: 'textBlock';
	_key: string;
	title?: string;
	body: PortableTextBlock[];
}

export interface ContactForm {
	_type: 'contactForm';
	_key: string;
	title: string;
	subtitle?: string;
}

export interface SEO {
	title: string;
	description?: string;
	canonical?: string;
}

export interface Header {
	items: { label: string; link: string }[];
}
