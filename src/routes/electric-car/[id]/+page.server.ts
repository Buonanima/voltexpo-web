import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchCarById } from '$lib/server/posts';

export const load: PageServerLoad = async ({ params }) => {
	const car = await fetchCarById(params.id);

	if (!car) {
		throw error(404, 'Car not found');
	}

	return {
		car
	};
};
