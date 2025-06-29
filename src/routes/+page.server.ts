import type { PageServerLoad } from './$types';
import { extractCarIds } from '$lib/api/post/fetchPostList/excludeIDsHelpers';
import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
import {
	OrderDirection,
	OrderField,
	OrderingHelpers
} from '$lib/api/post/fetchPostList/orderingHelpers';
import { getBrandsList } from '$lib/api/brand/getBrandsList';
import type { Brand } from '$lib/components/filters/types';

export const load: PageServerLoad = async () => {
	try {
		// Fetch all data in parallel for better performance
		const [popularCarsResult, recentCarsResult, brandsResult] = await Promise.allSettled([
			fetchPostList({
				ordering: OrderingHelpers.byFieldAndDirection(OrderField.VIEWS, OrderDirection.DESC),
				limit: 4
			}),
			fetchPostList({
				ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC),
				limit: 4
			}),
			getBrandsList()
		]);

		// Extract popular cars
		const popularCars = popularCarsResult.status === 'fulfilled' ? popularCarsResult.value : [];

		// Extract recent cars, excluding popular ones
		const popularCarIds = extractCarIds(popularCars);
		const recentCarsTemp = recentCarsResult.status === 'fulfilled' ? recentCarsResult.value : [];
		const recentCars = recentCarsTemp.filter((car) => !popularCarIds.includes(car.id));

		// Extract IDs from recent cars
		const recentCarIds = extractCarIds(recentCars);

		// Combine all excluded IDs for the discover more section
		const excludedIds = [...popularCarIds, ...recentCarIds];

		// Fetch all cars, excluding both popular and recent ones
		const allCars = await fetchPostList({
			excludedIds: excludedIds
		});

		// Extract brands data
		let availableBrands: Brand[] = [];
		if (brandsResult.status === 'fulfilled') {
			const { data: brands, error } = brandsResult.value;
			if (brands && !error) {
				availableBrands = brands;
			} else if (error) {
				console.warn('Failed to load brands for homepage:', error);
			}
		} else {
			console.warn('Error loading brands for homepage:', brandsResult.reason);
		}

		return {
			popularCars,
			recentCars,
			allCars,
			// Pre-loaded brands for filter components (eliminates client-side API calls)
			availableBrands
		};
	} catch (err) {
		console.error('Error in page load:', err);
		return {
			popularCars: [],
			recentCars: [],
			allCars: [],
			availableBrands: []
		};
	}
};
