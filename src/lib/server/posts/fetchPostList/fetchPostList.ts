import type { Post } from '$lib/types/post';
import config from '$lib/config/env';
import { error } from '@sveltejs/kit';
import type { FetchPostListOptions, PostsRequestBody } from '$lib/server/posts/fetchPostList/types';

export async function fetchPostList(options: FetchPostListOptions = {}): Promise<Post[]> {
	try {
		// Prepare request body
		const requestBody: PostsRequestBody = {};

		// Log the received options
		console.log('Received options:', options);

		if (options.filters && Object.keys(options.filters).length > 0) {
			requestBody.filters = options.filters;
			// Log applied filters
			console.log('Applied filters:', requestBody.filters);
		}

		if (options.ordering) {
			requestBody.ordering = options.ordering;
			// Log ordering
			console.log('Ordering:', requestBody.ordering);
		}

		if (options.excludedIds && options.excludedIds.length > 0) {
			requestBody.excludedIds = options.excludedIds;
			// Log excluded IDs
			console.log('Excluded IDs:', requestBody.excludedIds);
		}

		if (options.limit !== undefined) {
			requestBody.limit = options.limit;
			// Log limit
			console.log('Limit:', requestBody.limit);
		}

		// Make the request using POST method
		const response = await fetch(`${config.API_BASE_URL}/get-car-list-json`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
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
