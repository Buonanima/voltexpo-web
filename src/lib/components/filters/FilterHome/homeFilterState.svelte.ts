import type { Brand, Model } from '../types';

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
		homeBrandState.selectedBrand = null;
		homeModelState.selectedModel = null;
		homeModelState.disabled = true;
	},
	
	resetModel() {
		homeModelState.selectedModel = null;
	},
	
	resetAll() {
		this.resetBrand();
	},
	
	setBrand(brand: Brand | null) {
		homeBrandState.selectedBrand = brand;
		if (brand) {
			homeModelState.disabled = false;
		} else {
			homeModelState.selectedModel = null;
			homeModelState.disabled = true;
		}
	},
	
	setModel(model: Model | null) {
		homeModelState.selectedModel = model;
	}
};