import type { PageServerLoad } from './$types';
import { extractCarIds } from '$lib/api/post/fetchPostList/excludeIDsHelpers';
import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
import { OrderDirection, OrderField, OrderingHelpers } from '$lib/api/post/fetchPostList/orderingHelpers';


export const load: PageServerLoad = async () => {
	try {
		// First, fetch popular cars
		const popularCars = await fetchPostList({
			ordering: OrderingHelpers.byFieldAndDirection(OrderField.VIEWS, OrderDirection.DESC),
			limit: 4
		});

		// Extract IDs from popular cars to exclude from recent cars
		const popularCarIds = extractCarIds(popularCars);

		// Fetch recent cars, excluding popular ones
		const recentCars = await fetchPostList({
			ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC),
			excludedIds: popularCarIds,
			limit: 4
		});

		// Extract IDs from recent cars
		const recentCarIds = extractCarIds(recentCars);

		// Combine all excluded IDs for the discover more section
		const excludedIds = [...popularCarIds, ...recentCarIds];

		// Fetch all cars, excluding both popular and recent ones
		const allCars = await fetchPostList({
			excludedIds: excludedIds
		});

		return {
			popularCars,
			recentCars,
			allCars
		};
	} catch (err) {
		console.error('Error in page load:', err);
		return {
			popularCars: [],
			recentCars: [],
			allCars: []
		};
	}
};
