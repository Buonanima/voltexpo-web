import type { PageServerLoad } from './$types';
import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
import { OrderDirection, OrderField, OrderingHelpers } from '$lib/api/post/fetchPostList/orderingHelpers';
import type { FilterParams } from '$lib/api/post/fetchPostList/types';
import { getBrandBySlug } from '$lib/api/brand/getBrandBySlug';
import { getModelBySlug } from '$lib/api/model/getModelBySlug';
import type { Brand, Model } from '$lib/components/filters/types';

// Helper function to resolve brand and model objects from slugs
async function resolveBrandAndModel(searchParams: URLSearchParams): Promise<{ brand: Brand | null; model: Model | null; errors: string[] }> {
	const brandSlug = searchParams.get('brand');
	const modelSlug = searchParams.get('model');
	const errors: string[] = [];
	
	let brand: Brand | null = null;
	let model: Model | null = null;

	// Load brand by slug if provided
	if (brandSlug) {
		try {
			const { data, error } = await getBrandBySlug(brandSlug);
			if (data && !error) {
				brand = data;
			} else {
				errors.push(`Brand "${brandSlug}" not found`);
			}
		} catch (error) {
			errors.push(`Error loading brand: ${error}`);
		}
	}

	// Load model by slug if provided
	if (modelSlug) {
		try {
			const { data, error } = await getModelBySlug(modelSlug);
			if (data && !error) {
				model = data;
			} else {
				errors.push(`Model "${modelSlug}" not found`);
			}
		} catch (error) {
			errors.push(`Error loading model: ${error}`);
		}
	}

	return { brand, model, errors };
}

// Helper function to parse URL parameters into FilterParams
async function parseFiltersFromUrl(searchParams: URLSearchParams): Promise<{ filters: FilterParams; resolvedBrand: Brand | null; resolvedModel: Model | null; errors: string[] }> {
	const filters: FilterParams = {};
	
	// Resolve brand and model objects
	const { brand, model, errors } = await resolveBrandAndModel(searchParams);

	// Brand filter - use complete Brand object if resolved
	if (brand) {
		filters.brand = {
			id: brand.id,
			value: brand.brand_name,
			slug: brand.slug
		};
	}

	// Model filter - use complete Model object if resolved
	if (model) {
		filters.model = {
			id: model.id,
			value: model.model_name,
			slug: model.slug
		};
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

	return { filters, resolvedBrand: brand, resolvedModel: model, errors };
}

export const load: PageServerLoad = async ({ url }) => {
	try {
		// Parse all filters from URL parameters (now async)
		const { filters, resolvedBrand, resolvedModel, errors } = await parseFiltersFromUrl(url.searchParams);
		
		// Log any errors (invalid slugs) but continue
		if (errors.length > 0) {
			console.warn('Filter resolution errors:', errors);
		}

		// Fetch cars based on all filter parameters
		const searchResults = await fetchPostList({
			filters: Object.keys(filters).length > 0 ? filters : undefined,
			ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC)
		});

		return {
			searchResults,
			filters: {
				brand: resolvedBrand?.brand_name || null,
				model: resolvedModel?.model_name || null
			},
			allFilters: filters,
			// Pass complete objects for client-side initialization
			resolvedBrandObject: resolvedBrand,
			resolvedModelObject: resolvedModel,
			filterErrors: errors
		};
	} catch (err) {
		console.error('Error in electric-cars page load:', err);
		return {
			searchResults: [],
			filters: {
				brand: null,
				model: null
			},
			allFilters: {},
			resolvedBrandObject: null,
			resolvedModelObject: null,
			filterErrors: []
		};
	}
};