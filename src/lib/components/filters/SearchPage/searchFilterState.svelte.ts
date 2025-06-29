import type { Brand, Model } from '../types';
import type { FilterParams } from '$lib/api/post/fetchPostList/types';
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

// Main search filter state object that provides currentFilters
export const searchFilterState = {
	get currentFilters(): FilterParams {
		return {
			brand: searchBrandState.selectedBrand ? {
				id: searchBrandState.selectedBrand.id,
				value: searchBrandState.selectedBrand.brand_name,
				slug: searchBrandState.selectedBrand.slug
			} : undefined,
			model: searchModelState.selectedModel ? {
				id: searchModelState.selectedModel.id,
				value: searchModelState.selectedModel.model_name,
				slug: searchModelState.selectedModel.slug
			} : undefined,
			year: yearInputSvelte.values.from || yearInputSvelte.values.to ? {
				from: yearInputSvelte.values.from?.toString(),
				to: yearInputSvelte.values.to?.toString()
			} : undefined,
			price: priceInputSvelte.values.from || priceInputSvelte.values.to ? {
				from: priceInputSvelte.values.from?.toString(),
				to: priceInputSvelte.values.to?.toString()
			} : undefined,
			range: rangeInputSvelte.values.from || rangeInputSvelte.values.to ? {
				from: rangeInputSvelte.values.from?.toString(),
				to: rangeInputSvelte.values.to?.toString()
			} : undefined,
			km: kmInputSvelte.values.from || kmInputSvelte.values.to ? {
				from: kmInputSvelte.values.from?.toString(),
				to: kmInputSvelte.values.to?.toString()
			} : undefined,
			power: powerInputSvelte.values.from || powerInputSvelte.values.to ? {
				from: powerInputSvelte.values.from?.toString(),
				to: powerInputSvelte.values.to?.toString()
			} : undefined,
			bodyType: bodyTypeInputSvelte.selectedBodyType ? {
				id: bodyTypeInputSvelte.selectedBodyType.id,
				value: bodyTypeInputSvelte.selectedBodyType.value,
				slug: bodyTypeInputSvelte.selectedBodyType.slug
			} : undefined
		};
	}
};

// Utility functions for search filter state
export const searchFilterUtils = {
	resetBrand() {
		searchBrandState.selectedBrand = null;
		searchModelState.selectedModel = null;
		searchModelState.disabled = true;
	},
	
	resetModel() {
		searchModelState.selectedModel = null;
	},
	
	setBrand(brand: Brand | null) {
		searchBrandState.selectedBrand = brand;
		if (brand) {
			searchModelState.disabled = false;
		} else {
			searchModelState.selectedModel = null;
			searchModelState.disabled = true;
		}
	},
	
	setModel(model: Model | null) {
		searchModelState.selectedModel = model;
	}
};