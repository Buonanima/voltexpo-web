import type { PageServerLoad } from './$types';
import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
import { OrderDirection, OrderField, OrderingHelpers } from '$lib/api/post/fetchPostList/orderingHelpers';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const brand = url.searchParams.get('brand');
		const model = url.searchParams.get('model');

		// Fetch cars based on search parameters
		const searchResults = await fetchPostList({
			ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC),
			// TODO: Add brand and model filtering when API supports it
			// brandFilter: brand,
			// modelFilter: model,
		});

		return {
			searchResults,
			filters: {
				brand,
				model
			}
		};
	} catch (err) {
		console.error('Error in electric-cars page load:', err);
		return {
			searchResults: [],
			filters: {
				brand: null,
				model: null
			}
		};
	}
};