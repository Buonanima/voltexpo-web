// State for BodyTypeCard component using Svelte 5 runes

export interface BodyType {
	id: number;
	value: string;
	slug: string;
}

// Static body type data based on available icons
const BODY_TYPES: BodyType[] = [
	{ id: 1, value: 'Break', slug: 'break' },
	{ id: 2, value: 'SUV', slug: 'suv' },
	{ id: 3, value: 'Sedan', slug: 'sedan' },
	{ id: 4, value: 'Hatchback', slug: 'hatchback' },
	{ id: 5, value: 'Coupe', slug: 'coupe' },
	{ id: 6, value: 'Cabriolet', slug: 'cabriolet' },
	{ id: 7, value: 'Passenger Transport', slug: 'passenger-transport' }
];

export const bodyTypeCardSvelte = $state<{
	bodyTypes: BodyType[];
	isOpen: boolean;
}>({
	bodyTypes: BODY_TYPES,
	isOpen: false
});

export function getBodyTypes(): BodyType[] {
	return bodyTypeCardSvelte.bodyTypes;
}