import type { Brand, Model, FilterParams } from '../types';
import { createBrandUpdate, createModelUpdate, createResetState } from '../shared/brandModelUtils';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';

// Search page scoped brand filter state
export const searchBrandState = $state<{
	selectedBrand: Brand | null;
}>({
	selectedBrand: null
});

// Search page scoped model filter state
export const searchModelState = $state<{
	selectedModel: Model | null;
	disabled: boolean;
}>({
	selectedModel: null,
	disabled: true
});

/**
 * Main search filter state aggregator.
 * Provides a reactive currentFilters getter that combines all individual filter states
 * into a unified FilterParams object for API consumption.
 */
export const searchFilterState = {
	/**
	 * Reactive getter that aggregates all filter states into a single FilterParams object.
	 * Automatically updates when any individual filter state changes.
	 * @returns Current filter values from all input components
	 */
	get currentFilters(): FilterParams {
		return {
			brand: searchBrandState.selectedBrand
				? {
						id: searchBrandState.selectedBrand.id,
						value: searchBrandState.selectedBrand.brand_name,
						slug: searchBrandState.selectedBrand.slug
					}
				: undefined,
			model: searchModelState.selectedModel
				? {
						id: searchModelState.selectedModel.id,
						value: searchModelState.selectedModel.model_name,
						slug: searchModelState.selectedModel.slug
					}
				: undefined,
			year:
				yearInputSvelte.values.from || yearInputSvelte.values.to
					? {
							from: yearInputSvelte.values.from?.toString(),
							to: yearInputSvelte.values.to?.toString()
						}
					: undefined,
			price:
				priceInputSvelte.values.from || priceInputSvelte.values.to
					? {
							from: priceInputSvelte.values.from?.toString(),
							to: priceInputSvelte.values.to?.toString()
						}
					: undefined,
			range:
				rangeInputSvelte.values.from || rangeInputSvelte.values.to
					? {
							from: rangeInputSvelte.values.from?.toString(),
							to: rangeInputSvelte.values.to?.toString()
						}
					: undefined,
			km:
				kmInputSvelte.values.from || kmInputSvelte.values.to
					? {
							from: kmInputSvelte.values.from?.toString(),
							to: kmInputSvelte.values.to?.toString()
						}
					: undefined,
			power:
				powerInputSvelte.values.from || powerInputSvelte.values.to
					? {
							from: powerInputSvelte.values.from?.toString(),
							to: powerInputSvelte.values.to?.toString()
						}
					: undefined,
			bodyType: bodyTypeInputSvelte.selectedBodyType
				? {
						id: bodyTypeInputSvelte.selectedBodyType.id,
						value: bodyTypeInputSvelte.selectedBodyType.value,
						slug: bodyTypeInputSvelte.selectedBodyType.slug
					}
				: undefined
		};
	}
};

// Utility functions for search filter state
export const searchFilterUtils = {
	resetBrand() {
		const resetState = createResetState();
		searchBrandState.selectedBrand = resetState.selectedBrand;
		searchModelState.selectedModel = resetState.selectedModel;
		searchModelState.disabled = resetState.disabled;
	},

	resetModel() {
		const modelUpdate = createModelUpdate(null);
		searchModelState.selectedModel = modelUpdate.selectedModel;
	},

	setBrand(brand: Brand | null) {
		const brandUpdate = createBrandUpdate(brand);
		searchBrandState.selectedBrand = brandUpdate.selectedBrand;
		searchModelState.selectedModel = brandUpdate.modelUpdate.selectedModel;
		searchModelState.disabled = brandUpdate.modelUpdate.disabled;
	},

	setModel(model: Model | null) {
		const modelUpdate = createModelUpdate(model);
		searchModelState.selectedModel = modelUpdate.selectedModel;
	}
};

// Note: The reactive effect for automatically managing model state when brand changes
// has been moved to the component that uses this state (electric-cars/+page.svelte)
// This is because $effect can only be used inside a component context in Svelte 5
