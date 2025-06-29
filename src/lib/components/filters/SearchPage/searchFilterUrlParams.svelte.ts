import { searchBrandState, searchModelState, searchFilterUtils } from './searchFilterState.svelte';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';
import { getBodyTypes } from '../cards/bodyTypeCard.svelte.js';
import { getBrandBySlug } from '$lib/api/brand/getBrandBySlug';
import { getModelBySlug } from '$lib/api/model/getModelBySlug';
import {
	getStringParam,
	getIntParam,
	setBrandParam,
	setModelParam,
	setBodyTypeParam,
	setRangeParams,
	extractFilterParams
} from '../shared/urlParamUtils';

/**
 * Handles URL parameter synchronization for search filters.
 * Manages both initialization from URL and generation of URL parameters from current filter state.
 */
export class SearchFilterUrlParams {
	/**
	 * Initializes filter states from URL search parameters.
	 * Loads brand/model data from API and sets all filter values from URL.
	 * @param searchParams - The URLSearchParams object to extract filter values from
	 */
	async initializeFromUrlParams(searchParams: URLSearchParams): Promise<void> {
		const filterParams = extractFilterParams(searchParams);

		// Initialize brand first
		if (filterParams.brand) {
			try {
				const { data: brand, error } = await getBrandBySlug(filterParams.brand);
				if (brand && !error) {
					searchFilterUtils.setBrand(brand);

					// Now that brand is set, initialize model if present
					if (filterParams.model) {
						try {
							const { data: model, error: modelError } = await getModelBySlug(filterParams.model);
							if (model && !modelError && model.brand_id === brand.id) {
								searchFilterUtils.setModel(model);
							} else if (modelError) {
								console.warn('Failed to load model from URL:', modelError);
							}
						} catch (error) {
							console.warn('Error loading model from URL:', error);
						}
					}
				} else if (error) {
					console.warn('Failed to load brand from URL:', error);
				}
			} catch (error) {
				console.warn('Error loading brand from URL:', error);
			}
		}

		// Initialize range filters using extracted values
		if (filterParams.year.from) yearInputSvelte.fromYear = filterParams.year.from;
		if (filterParams.year.to) yearInputSvelte.toYear = filterParams.year.to;

		if (filterParams.price.from) priceInputSvelte.fromPrice = filterParams.price.from;
		if (filterParams.price.to) priceInputSvelte.toPrice = filterParams.price.to;

		if (filterParams.range.from) rangeInputSvelte.fromRange = filterParams.range.from;
		if (filterParams.range.to) rangeInputSvelte.toRange = filterParams.range.to;

		if (filterParams.km.from) kmInputSvelte.fromKm = filterParams.km.from;
		if (filterParams.km.to) kmInputSvelte.toKm = filterParams.km.to;

		if (filterParams.power.from) powerInputSvelte.fromPower = filterParams.power.from;
		if (filterParams.power.to) powerInputSvelte.toPower = filterParams.power.to;

		// Initialize body type
		if (filterParams.bodyType) {
			const bodyType = getBodyTypes().find(
				(bt) => bt.value === filterParams.bodyType || bt.slug === filterParams.bodyType
			);
			if (bodyType) {
				bodyTypeInputSvelte.selectedBodyType = bodyType;
			}
		}
	}

	/**
	 * Generates URL search parameters from current filter states.
	 * Creates URLSearchParams object that reflects all current filter selections.
	 * @returns URLSearchParams object containing all active filter values
	 */
	generateUrlSearchParams(): URLSearchParams {
		const params = new URLSearchParams();

		// Add brand and model using utility functions
		setBrandParam(params, searchBrandState.selectedBrand);
		setModelParam(params, searchModelState.selectedModel);

		// Add range filters using utility functions
		setRangeParams(params, 'year', yearInputSvelte.values.from, yearInputSvelte.values.to);
		setRangeParams(params, 'price', priceInputSvelte.values.from, priceInputSvelte.values.to);
		setRangeParams(params, 'range', rangeInputSvelte.values.from, rangeInputSvelte.values.to);
		setRangeParams(params, 'km', kmInputSvelte.values.from, kmInputSvelte.values.to);
		setRangeParams(params, 'power', powerInputSvelte.values.from, powerInputSvelte.values.to);

		// Add body type using dedicated function
		setBodyTypeParam(params, bodyTypeInputSvelte.selectedBodyType);

		return params;
	}
}

// Export singleton instance
export const searchFilterUrlParams = new SearchFilterUrlParams();
