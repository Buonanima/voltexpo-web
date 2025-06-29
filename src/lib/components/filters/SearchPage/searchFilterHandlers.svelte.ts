import type { Brand, Model } from '../types';
import type { BodyType } from '../cards/bodyTypeCard.svelte.js';
import { searchFilterUtils } from './searchFilterState.svelte';
import { brandCardState } from '../cards/brandCard.svelte.js';
import { modelCardState } from '../cards/modelCard.svelte';
import { bodyTypeCardSvelte } from '../cards/bodyTypeCard.svelte.js';
import { yearInputSvelte } from './inputs/yearInput.svelte.js';
import { priceInputSvelte } from './inputs/priceInput.svelte.js';
import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
import { kmInputSvelte } from './inputs/kmInput.svelte.js';
import { powerInputSvelte } from './inputs/powerInput.svelte.js';
import { searchBrandInputSvelte } from './inputs/brandInput.svelte';
import { searchModelInputSvelte } from './inputs/modelInput.svelte';

/**
 * Centralized handler class for search filter interactions.
 * Manages event handling for all filter components in the search page.
 */
export class SearchFilterHandlers {
	// Brand handlers
	/**
	 * Opens the brand selection modal/card
	 */
	handleBrandOpen() {
		brandCardState.isOpen = true;
	}

	/**
	 * Handles brand selection
	 * @param brand - The selected brand object
	 */
	handleBrandSelect(brand: Brand) {
		searchFilterUtils.setBrand(brand);
		searchBrandInputSvelte.selectedBrand = brand;
		brandCardState.isOpen = false;
		
		// Reset model state when brand changes
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = false;
		
		// Note: Model loading is now handled by the parent component via effects
	}

	/**
	 * Clears the selected brand and resets related model state
	 */
	handleBrandClear() {
		searchFilterUtils.resetBrand();
		searchBrandInputSvelte.selectedBrand = null;
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = true;
		
		// Note: Models clearing is now handled by the parent component via effects
	}

	/**
	 * Closes the brand selection modal and clears search text
	 */
	handleBrandClose() {
		brandCardState.isOpen = false;
		brandCardState.searchText = '';
	}

	// Model handlers
	/**
	 * Opens the model selection modal/card
	 */
	handleModelOpen() {
		modelCardState.isOpen = true;
	}

	/**
	 * Handles model selection and closes the model selection modal
	 * @param model - The selected model object
	 */
	handleModelSelect(model: Model) {
		searchFilterUtils.setModel(model);
		searchModelInputSvelte.selectedModel = model;
		modelCardState.isOpen = false;
	}

	/**
	 * Clears the selected model while keeping the brand selection
	 */
	handleModelClear() {
		searchFilterUtils.resetModel();
		searchModelInputSvelte.selectedModel = null;
	}

	/**
	 * Closes the model selection modal
	 */
	handleModelClose() {
		modelCardState.isOpen = false;
		// Note: Search text is now managed locally in ModelCard component
	}

	// Filter change handlers - Prepared for real-time filter functionality
	/**
	 * Handles year range filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param from - Start year value
	 * @param to - End year value
	 */
	handleYearChange(from: number | null, to: number | null) {
		console.log('Year changed:', { from, to });
	}

	/**
	 * Handles price range filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param from - Minimum price value
	 * @param to - Maximum price value
	 */
	handlePriceChange(from: number | null, to: number | null) {
		console.log('Price changed:', { from, to });
	}

	/**
	 * Opens the body type selection modal/card
	 */
	handleBodyTypeOpen() {
		bodyTypeCardSvelte.isOpen = true;
	}

	/**
	 * Handles body type selection and closes the modal
	 * @param bodyType - The selected body type object
	 */
	handleBodyTypeSelect(bodyType: BodyType) {
		bodyTypeInputSvelte.selectedBodyType = bodyType;
		bodyTypeCardSvelte.isOpen = false;
	}

	/**
	 * Closes the body type selection modal
	 */
	handleBodyTypeClose() {
		bodyTypeCardSvelte.isOpen = false;
	}

	/**
	 * Handles body type filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param value - The body type value
	 */
	handleBodyTypeChange(value: string | null) {
		console.log('Body type changed:', value);
	}

	/**
	 * Handles electric range filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param from - Minimum range value (km)
	 * @param to - Maximum range value (km)
	 */
	handleRangeChange(from: number | null, to: number | null) {
		console.log('Range changed:', { from, to });
	}

	/**
	 * Handles mileage/odometer filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param from - Minimum km value
	 * @param to - Maximum km value
	 */
	handleKmChange(from: number | null, to: number | null) {
		console.log('Km changed:', { from, to });
	}

	/**
	 * Handles power output filter changes. Currently logs changes for debugging.
	 * Will be enhanced for real-time search functionality.
	 * @param from - Minimum power value (HP/kW)
	 * @param to - Maximum power value (HP/kW)
	 */
	handlePowerChange(from: number | null, to: number | null) {
		console.log('Power changed:', { from, to });
	}

	/**
	 * Resets all filter states to their initial values
	 * Clears brand, model, all range filters, and body type selection
	 */
	resetAllFilters(): void {
		searchFilterUtils.resetBrand();
		searchBrandInputSvelte.selectedBrand = null;
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = true;
		yearInputSvelte.reset();
		priceInputSvelte.reset();
		rangeInputSvelte.reset();
		bodyTypeInputSvelte.reset();
		kmInputSvelte.reset();
		powerInputSvelte.reset();
		
		// Note: Model card reset is now handled by the parent component via effects
	}
}

// Export singleton instance
export const searchFilterHandlers = new SearchFilterHandlers();