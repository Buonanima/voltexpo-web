import type { Brand, Model } from '../types';
import { brandInputSvelte } from '../FilterHome/inputs/brandInput.svelte.js';
import { modelInputSvelte } from '../FilterHome/inputs/modelInput.svelte.js';
import { brandCardSvelte } from '../cards/brandCard.svelte.js';
import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';

export class SearchFilterHandlers {
	// Brand handlers
	handleBrandOpen() {
		brandCardSvelte.isOpen = true;
	}

	async handleBrandSelect(brand: Brand) {
		brandInputSvelte.selectedBrand = brand;
		brandCardSvelte.isOpen = false;
		
		// Clear model when brand changes
		if (modelInputSvelte.selectedModel) {
			modelInputSvelte.selectedModel = null;
		}
		
		// Reset model state
		resetModelCard();
		modelInputSvelte.disabled = false;
		
		// Load models for the selected brand
		await loadModels(brand.id);
	}

	handleBrandClear() {
		brandInputSvelte.selectedBrand = null;
		modelInputSvelte.selectedModel = null;
		modelInputSvelte.disabled = true;
		resetModelCard();
	}

	handleBrandClose() {
		brandCardSvelte.isOpen = false;
		brandCardSvelte.searchText = '';
	}

	// Model handlers
	handleModelSelect(model: Model) {
		modelInputSvelte.selectedModel = model;
		modelCardState.isOpen = false;
	}

	handleModelClear() {
		modelInputSvelte.selectedModel = null;
	}

	handleModelClose() {
		modelCardState.isOpen = false;
		modelCardState.searchText = '';
	}

	// Filter change handlers
	handleYearChange(from: number | null, to: number | null) {
		// Handle year filter change
		console.log('Year changed:', { from, to });
	}

	handlePriceChange(from: number | null, to: number | null) {
		// Handle price filter change
		console.log('Price changed:', { from, to });
	}

	handleBodyTypeOpen() {
		// Handle body type selection
		console.log('Body type opened');
	}

	handleBodyTypeChange(value: string | null) {
		// Handle body type change
		console.log('Body type changed:', value);
	}

	handleRangeChange(from: number | null, to: number | null) {
		// Handle range filter change
		console.log('Range changed:', { from, to });
	}

	handleKmChange(from: number | null, to: number | null) {
		// Handle km filter change
		console.log('Km changed:', { from, to });
	}

	handlePowerChange(from: number | null, to: number | null) {
		// Handle power filter change
		console.log('Power changed:', { from, to });
	}

	// Reset all filters
	resetAllFilters(): void {
		brandInputSvelte.selectedBrand = null;
		modelInputSvelte.selectedModel = null;
		modelInputSvelte.disabled = true;
		yearInputSvelte.reset();
		priceInputSvelte.reset();
		rangeInputSvelte.reset();
		bodyTypeInputSvelte.reset();
		kmInputSvelte.reset();
		powerInputSvelte.reset();
		resetModelCard();
	}
}

// Export singleton instance
export const searchFilterHandlers = new SearchFilterHandlers();