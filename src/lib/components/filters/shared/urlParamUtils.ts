import type { Brand, Model } from '../types';
import type { BodyType } from '../cards/bodyTypeCard.svelte.js';

/**
 * Utility functions for handling URL parameters in filter components.
 * Each filter type has its own dedicated function to maintain clarity and prevent over-abstraction.
 * This declarative approach makes the code more maintainable and explicit about what each function handles.
 */

/**
 * Safely extracts a string parameter from URLSearchParams
 */
export function getStringParam(searchParams: URLSearchParams, key: string): string | null {
	return searchParams.get(key);
}

/**
 * Safely extracts and parses an integer parameter from URLSearchParams
 */
export function getIntParam(searchParams: URLSearchParams, key: string): number | null {
	const value = searchParams.get(key);
	if (!value) return null;

	const parsed = parseInt(value, 10);
	return isNaN(parsed) ? null : parsed;
}

/**
 * Creates URL parameters for brand selection
 * Dedicated function maintains clarity and prevents abstraction
 */
export function setBrandParam(params: URLSearchParams, brand: Brand | null): void {
	if (brand) {
		params.set('brand', brand.slug);
	}
}

/**
 * Creates URL parameters for model selection
 * Dedicated function maintains clarity and prevents abstraction
 */
export function setModelParam(params: URLSearchParams, model: Model | null): void {
	if (model) {
		params.set('model', model.slug);
	}
}

/**
 * Creates URL parameters for body type selection
 * Dedicated function maintains clarity and prevents abstraction
 */
export function setBodyTypeParam(params: URLSearchParams, bodyType: BodyType | null): void {
	if (bodyType) {
		params.set('bodyType', bodyType.slug);
	}
}

/**
 * Creates URL parameters for range filters (from/to values)
 * Dedicated function for range-based filters (year, price, km, etc.)
 */
export function setRangeParams(
	params: URLSearchParams,
	prefix: string,
	fromValue: number | null,
	toValue: number | null
): void {
	if (fromValue !== null && fromValue !== undefined) {
		params.set(`${prefix}From`, fromValue.toString());
	}
	if (toValue !== null && toValue !== undefined) {
		params.set(`${prefix}To`, toValue.toString());
	}
}

/**
 * Extracts range values from URL parameters
 */
export function getRangeFromParams(
	searchParams: URLSearchParams,
	prefix: string
): { from: number | null; to: number | null } {
	return {
		from: getIntParam(searchParams, `${prefix}From`),
		to: getIntParam(searchParams, `${prefix}To`)
	};
}

/**
 * Generic function to extract filter-related parameters from URL
 * Returns an object with common filter parameters
 */
export function extractFilterParams(searchParams: URLSearchParams) {
	return {
		brand: getStringParam(searchParams, 'brand'),
		model: getStringParam(searchParams, 'model'),
		bodyType: getStringParam(searchParams, 'bodyType'),
		year: getRangeFromParams(searchParams, 'year'),
		price: getRangeFromParams(searchParams, 'price'),
		range: getRangeFromParams(searchParams, 'range'),
		km: getRangeFromParams(searchParams, 'km'),
		power: getRangeFromParams(searchParams, 'power')
	};
}
