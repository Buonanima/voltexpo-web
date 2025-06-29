import type { Brand, Model } from '../types';
import { createBrandUpdate, createModelUpdate, createResetState } from '../shared/brandModelUtils';

// Home page scoped brand filter state
export const homeBrandState = $state<{
	selectedBrand: Brand | null;
}>({
	selectedBrand: null
});

// Home page scoped model filter state
export const homeModelState = $state<{
	selectedModel: Model | null;
	disabled: boolean;
}>({
	selectedModel: null,
	disabled: true
});

// Utility functions for home filter state
export const homeFilterUtils = {
	resetBrand() {
		const resetState = createResetState();
		homeBrandState.selectedBrand = resetState.selectedBrand;
		homeModelState.selectedModel = resetState.selectedModel;
		homeModelState.disabled = resetState.disabled;
	},

	resetModel() {
		const modelUpdate = createModelUpdate(null);
		homeModelState.selectedModel = modelUpdate.selectedModel;
	},

	resetAll() {
		this.resetBrand();
	},

	setBrand(brand: Brand | null) {
		const brandUpdate = createBrandUpdate(brand);
		homeBrandState.selectedBrand = brandUpdate.selectedBrand;
		homeModelState.selectedModel = brandUpdate.modelUpdate.selectedModel;
		homeModelState.disabled = brandUpdate.modelUpdate.disabled;
	},

	setModel(model: Model | null) {
		const modelUpdate = createModelUpdate(model);
		homeModelState.selectedModel = modelUpdate.selectedModel;
	}
};

// Note: The reactive effect for automatically managing model state when brand changes
// has been moved to the component that uses this state (routes/+page.svelte)
// This is because $effect can only be used inside a component context in Svelte 5
