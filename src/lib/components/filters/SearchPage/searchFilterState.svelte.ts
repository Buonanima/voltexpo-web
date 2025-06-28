import type { FilterParams } from '$lib/api/post/fetchPostList/types';
import { brandInputSvelte } from '../FilterHome/inputs/brandInput.svelte.js';
import { modelInputSvelte } from '../FilterHome/inputs/modelInput.svelte.js';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';

export class SearchFilterState {
	// Aggregated filter state using $derived
	get currentFilters(): FilterParams {
		const filters: FilterParams = {};

		// Brand filter
		if (brandInputSvelte.selectedBrand) {
			filters.brand = {
				id: brandInputSvelte.selectedBrand.id,
				value: brandInputSvelte.selectedBrand.brand_name,
				slug: brandInputSvelte.selectedBrand.slug
			};
		}

		// Model filter
		if (modelInputSvelte.selectedModel) {
			filters.model = {
				id: modelInputSvelte.selectedModel.id,
				value: modelInputSvelte.selectedModel.model_name,
				slug: modelInputSvelte.selectedModel.slug
			};
		}

		// Year filter
		if (yearInputSvelte.hasValues) {
			filters.year = {
				from: yearInputSvelte.values.from?.toString(),
				to: yearInputSvelte.values.to?.toString()
			};
		}

		// Price filter
		if (priceInputSvelte.hasValues) {
			filters.price = {
				from: priceInputSvelte.values.from?.toString(),
				to: priceInputSvelte.values.to?.toString()
			};
		}

		// Range filter
		if (rangeInputSvelte.hasValues) {
			filters.range = {
				from: rangeInputSvelte.values.from?.toString(),
				to: rangeInputSvelte.values.to?.toString()
			};
		}

		// Body type filter
		if (bodyTypeInputSvelte.selectedBodyType) {
			filters.bodyType = {
				value: bodyTypeInputSvelte.selectedBodyType,
				slug: bodyTypeInputSvelte.selectedBodyType
			};
		}

		// Km filter
		if (kmInputSvelte.hasValues) {
			filters.km = {
				from: kmInputSvelte.values.from?.toString(),
				to: kmInputSvelte.values.to?.toString()
			};
		}

		// Power filter
		if (powerInputSvelte.hasValues) {
			filters.power = {
				from: powerInputSvelte.values.from?.toString(),
				to: powerInputSvelte.values.to?.toString()
			};
		}

		return filters;
	}
}

// Export singleton instance
export const searchFilterState = new SearchFilterState();