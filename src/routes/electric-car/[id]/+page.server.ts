import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPostById } from '$lib/api/posts/fetchPostById';


export const load: PageServerLoad = async ({ params }) => {
	const car = await fetchPostById(params.id);

	if (!car) {
		throw error(404, 'Car not found');
	}

	return {
		car
	};
};
