import type { Brand, Model } from '../types';

/**
 * Shared utilities for brand and model operations across filter components.
 * These pure functions can be used by both home and search filter states.
 */

/**
 * Creates a brand selection state update object
 */
export function createBrandUpdate(brand: Brand | null) {
	return {
		selectedBrand: brand,
		// When brand changes, model should be reset and disabled/enabled accordingly
		modelUpdate: {
			selectedModel: null,
			disabled: !brand
		}
	};
}

/**
 * Creates a model selection state update object
 */
export function createModelUpdate(model: Model | null) {
	return {
		selectedModel: model
	};
}

/**
 * Determines if model selection should be disabled based on brand state
 */
export function shouldDisableModel(selectedBrand: Brand | null): boolean {
	return !selectedBrand;
}

/**
 * Resets brand and model states to initial values
 */
export function createResetState() {
	return {
		selectedBrand: null,
		selectedModel: null,
		disabled: true
	};
}
