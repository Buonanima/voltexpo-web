import type { PageServerLoad } from './$types';
import { fetchCarList } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
	try {
		const cars = await fetchCarList();

		return {
			cars
		};
	} catch (err) {
		console.error('Error in page load:', err);
		// Return empty array as fallback
		return {
			cars: []
		};
	}
};
