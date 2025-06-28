import { brandInputSvelte } from '../FilterHome/inputs/brandInput.svelte.js';
import { modelInputSvelte } from '../FilterHome/inputs/modelInput.svelte.js';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';

export class SearchFilterUrlParams {
	initializeFromUrlParams(searchParams: URLSearchParams): void {
		// Initialize brand
		const brandParam = searchParams.get('brand');
		if (brandParam) {
			// TODO: Need to load brand by slug/name and set it
			// This requires extending the brand loading functionality
		}

		// Initialize model 
		const modelParam = searchParams.get('model');
		if (modelParam) {
			// TODO: Need to load model by slug/name and set it
			// This requires extending the model loading functionality
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
			bodyTypeInputSvelte.selectedBodyType = bodyTypeParam;
		}
	}

	generateUrlSearchParams(): URLSearchParams {
		const params = new URLSearchParams();

		// Add brand and model
		if (brandInputSvelte.selectedBrand) {
			params.set('brand', brandInputSvelte.selectedBrand.slug);
		}
		if (modelInputSvelte.selectedModel) {
			params.set('model', modelInputSvelte.selectedModel.slug);
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
			params.set('bodyType', bodyTypeInputSvelte.selectedBodyType);
		}

		return params;
	}
}

// Export singleton instance
export const searchFilterUrlParams = new SearchFilterUrlParams();