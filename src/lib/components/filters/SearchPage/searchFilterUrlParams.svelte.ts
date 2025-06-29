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

export class SearchFilterUrlParams {
	async initializeFromUrlParams(searchParams: URLSearchParams): Promise<void> {
		// Initialize brand
		const brandParam = searchParams.get('brand');
		if (brandParam) {
			try {
				const { data: brand, error } = await getBrandBySlug(brandParam);
				if (brand && !error) {
					searchFilterUtils.setBrand(brand);
				} else if (error) {
					console.warn('Failed to load brand from URL:', error);
				}
			} catch (error) {
				console.warn('Error loading brand from URL:', error);
			}
		}

		// Initialize model 
		const modelParam = searchParams.get('model');
		if (modelParam && searchBrandState.selectedBrand) {
			try {
				const { data: model, error } = await getModelBySlug(modelParam);
				if (model && !error) {
					searchFilterUtils.setModel(model);
				} else if (error) {
					console.warn('Failed to load model from URL:', error);
				}
			} catch (error) {
				console.warn('Error loading model from URL:', error);
			}
		}

		// Initialize year
		const yearFrom = searchParams.get('yearFrom');
		const yearTo = searchParams.get('yearTo');
		if (yearFrom) yearInputSvelte.fromYear = parseInt(yearFrom);
		if (yearTo) yearInputSvelte.toYear = parseInt(yearTo);

		// Initialize price
		const priceFrom = searchParams.get('priceFrom');
		const priceTo = searchParams.get('priceTo');
		if (priceFrom) priceInputSvelte.fromPrice = parseInt(priceFrom);
		if (priceTo) priceInputSvelte.toPrice = parseInt(priceTo);

		// Initialize range
		const rangeFrom = searchParams.get('rangeFrom');
		const rangeTo = searchParams.get('rangeTo');
		if (rangeFrom) rangeInputSvelte.fromRange = parseInt(rangeFrom);
		if (rangeTo) rangeInputSvelte.toRange = parseInt(rangeTo);

		// Initialize km
		const kmFrom = searchParams.get('kmFrom');
		const kmTo = searchParams.get('kmTo');
		if (kmFrom) kmInputSvelte.fromKm = parseInt(kmFrom);
		if (kmTo) kmInputSvelte.toKm = parseInt(kmTo);

		// Initialize power
		const powerFrom = searchParams.get('powerFrom');
		const powerTo = searchParams.get('powerTo');
		if (powerFrom) powerInputSvelte.fromPower = parseInt(powerFrom);
		if (powerTo) powerInputSvelte.toPower = parseInt(powerTo);

		// Initialize body type
		const bodyTypeParam = searchParams.get('bodyType');
		if (bodyTypeParam) {
			const bodyType = getBodyTypes().find(bt => bt.value === bodyTypeParam || bt.slug === bodyTypeParam);
			if (bodyType) {
				bodyTypeInputSvelte.selectedBodyType = bodyType;
			}
		}
	}

	generateUrlSearchParams(): URLSearchParams {
		const params = new URLSearchParams();

		// Add brand and model
		if (searchBrandState.selectedBrand) {
			params.set('brand', searchBrandState.selectedBrand.slug);
		}
		if (searchModelState.selectedModel) {
			params.set('model', searchModelState.selectedModel.slug);
		}

		// Add range filters
		if (yearInputSvelte.values.from) params.set('yearFrom', yearInputSvelte.values.from.toString());
		if (yearInputSvelte.values.to) params.set('yearTo', yearInputSvelte.values.to.toString());

		if (priceInputSvelte.values.from) params.set('priceFrom', priceInputSvelte.values.from.toString());
		if (priceInputSvelte.values.to) params.set('priceTo', priceInputSvelte.values.to.toString());

		if (rangeInputSvelte.values.from) params.set('rangeFrom', rangeInputSvelte.values.from.toString());
		if (rangeInputSvelte.values.to) params.set('rangeTo', rangeInputSvelte.values.to.toString());

		if (kmInputSvelte.values.from) params.set('kmFrom', kmInputSvelte.values.from.toString());
		if (kmInputSvelte.values.to) params.set('kmTo', kmInputSvelte.values.to.toString());

		if (powerInputSvelte.values.from) params.set('powerFrom', powerInputSvelte.values.from.toString());
		if (powerInputSvelte.values.to) params.set('powerTo', powerInputSvelte.values.to.toString());

		// Add body type
		if (bodyTypeInputSvelte.selectedBodyType) {
			params.set('bodyType', bodyTypeInputSvelte.selectedBodyType.slug);
		}

		return params;
	}
}

// Export singleton instance
export const searchFilterUrlParams = new SearchFilterUrlParams();