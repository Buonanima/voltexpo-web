import type { Post } from '$lib/types/post';
import config from '$lib/config/env';
import { error } from '@sveltejs/kit';

export async function fetchPostById(id: string): Promise<Post | null> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/get-car-json/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			if (response.status === 404) {
				return null; // Car not found
			}
			console.error(`API Error: ${response.status} ${response.statusText}`);
			throw error(response.status, `Failed to fetch car: ${response.statusText}`);
		}

		const car = await response.json();
		return car;
	} catch (err) {
		console.error('Error fetching car by ID:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}

		throw error(500, 'Failed to fetch car from server');
	}
}