// State for BodyTypeCard component using Svelte 5 runes

export interface BodyType {
	id: number;
	name: string;
	value: string;
	slug: string;
}

// Static body type data based on available icons
const BODY_TYPES: BodyType[] = [
	{ id: 1, name: 'Break', value: 'Break', slug: 'break' },
	{ id: 2, name: 'SUV', value: 'SUV', slug: 'suv' },
	{ id: 3, name: 'Sedan', value: 'Sedan', slug: 'sedan' },
	{ id: 4, name: 'Hatchback', value: 'Hatchback', slug: 'hatchback' },
	{ id: 5, name: 'Coupe', value: 'Coupe', slug: 'coupe' },
	{ id: 6, name: 'Cabriolet', value: 'Cabriolet', slug: 'cabriolet' },
	{ id: 7, name: 'Passenger Transport', value: 'Passenger Transport', slug: 'passenger-transport' }
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