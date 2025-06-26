import { error } from '@sveltejs/kit';
import config from '$lib/config/env.js';
import type { Car } from '$lib/types/car.js';

export async function fetchCarList(): Promise<Car[]> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/get-car-list-json`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			console.error(`API Error: ${response.status} ${response.statusText}`);
			throw error(response.status, `Failed to fetch cars: ${response.statusText}`);
		}

		return await response.json();
	} catch (err) {
		console.error('Error fetching cars:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}

		throw error(500, 'Failed to fetch cars from server');
	}
}

export async function fetchCarById(id: string): Promise<Car | null> {
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
