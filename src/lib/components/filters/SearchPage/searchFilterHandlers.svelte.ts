import type { Brand, Model } from '../types';
import type { BodyType } from '../cards/bodyTypeCard.svelte.js';
import { searchFilterUtils } from './searchFilterState.svelte';
import { brandCardSvelte } from '../cards/brandCard.svelte.js';
import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
import { bodyTypeCardSvelte } from '../cards/bodyTypeCard.svelte.js';
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
		searchFilterUtils.setBrand(brand);
		brandCardSvelte.isOpen = false;
		
		// Reset model state
		resetModelCard();
		
		// Load models for the selected brand
		await loadModels(brand.id);
	}

	handleBrandClear() {
		searchFilterUtils.resetBrand();
		resetModelCard();
	}

	handleBrandClose() {
		brandCardSvelte.isOpen = false;
		brandCardSvelte.searchText = '';
	}

	// Model handlers
	handleModelSelect(model: Model) {
		searchFilterUtils.setModel(model);
		modelCardState.isOpen = false;
	}

	handleModelClear() {
		searchFilterUtils.resetModel();
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
		bodyTypeCardSvelte.isOpen = true;
	}

	handleBodyTypeSelect(bodyType: BodyType) {
		bodyTypeInputSvelte.selectedBodyType = bodyType;
		bodyTypeCardSvelte.isOpen = false;
	}

	handleBodyTypeClose() {
		bodyTypeCardSvelte.isOpen = false;
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
		searchFilterUtils.resetBrand();
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