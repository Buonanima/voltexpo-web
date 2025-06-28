import type { PageServerLoad } from './$types';
import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
import { OrderDirection, OrderField, OrderingHelpers } from '$lib/api/post/fetchPostList/orderingHelpers';
import type { FilterParams } from '$lib/api/post/fetchPostList/types';

// Helper function to parse URL parameters into FilterParams
function parseFiltersFromUrl(searchParams: URLSearchParams): FilterParams {
	const filters: FilterParams = {};

	// Brand filter
	const brand = searchParams.get('brand');
	if (brand) {
		filters.brand = { slug: brand, value: brand };
	}

	// Model filter
	const model = searchParams.get('model');
	if (model) {
		filters.model = { slug: model, value: model };
	}

	// Year filter
	const yearFrom = searchParams.get('yearFrom');
	const yearTo = searchParams.get('yearTo');
	if (yearFrom || yearTo) {
		filters.year = {
			from: yearFrom || undefined,
			to: yearTo || undefined
		};
	}

	// Price filter
	const priceFrom = searchParams.get('priceFrom');
	const priceTo = searchParams.get('priceTo');
	if (priceFrom || priceTo) {
		filters.price = {
			from: priceFrom || undefined,
			to: priceTo || undefined
		};
	}

	// Range filter
	const rangeFrom = searchParams.get('rangeFrom');
	const rangeTo = searchParams.get('rangeTo');
	if (rangeFrom || rangeTo) {
		filters.range = {
			from: rangeFrom || undefined,
			to: rangeTo || undefined
		};
	}

	// Km filter
	const kmFrom = searchParams.get('kmFrom');
	const kmTo = searchParams.get('kmTo');
	if (kmFrom || kmTo) {
		filters.km = {
			from: kmFrom || undefined,
			to: kmTo || undefined
		};
	}

	// Power filter
	const powerFrom = searchParams.get('powerFrom');
	const powerTo = searchParams.get('powerTo');
	if (powerFrom || powerTo) {
		filters.power = {
			from: powerFrom || undefined,
			to: powerTo || undefined
		};
	}

	// Body type filter
	const bodyType = searchParams.get('bodyType');
	if (bodyType) {
		filters.bodyType = { slug: bodyType, value: bodyType };
	}

	return filters;
}

export const load: PageServerLoad = async ({ url }) => {
	try {
		// Parse all filters from URL parameters
		const filters = parseFiltersFromUrl(url.searchParams);
		
		// Legacy support for basic brand/model display
		const brand = url.searchParams.get('brand');
		const model = url.searchParams.get('model');

		// Fetch cars based on all filter parameters
		const searchResults = await fetchPostList({
			filters: Object.keys(filters).length > 0 ? filters : undefined,
			ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC)
		});

		return {
			searchResults,
			filters: {
				brand,
				model
			},
			allFilters: filters
		};
	} catch (err) {
		console.error('Error in electric-cars page load:', err);
		return {
			searchResults: [],
			filters: {
				brand: null,
				model: null
			},
			allFilters: {}
		};
	}
};