import type { Brand, Model, FilterParams } from './types';
import { getBrandsList, getModelsById } from './filterApi';

interface FilterState {
	// Brand state
	brands: Brand[];
	selectedBrand: Brand | null;
	isBrandDropdownOpen: boolean;
	brandSearchText: string;
	brandLoading: boolean;
	brandError: boolean;

	// Model state  
	models: Model[];
	selectedModel: Model | null;
	isModelDropdownOpen: boolean;
	modelSearchText: string;
	modelLoading: boolean;
	modelError: boolean;
}

// Initialize state with runes
const state = $state<FilterState>({
	brands: [],
	selectedBrand: null,
	isBrandDropdownOpen: false,
	brandSearchText: '',
	brandLoading: false,
	brandError: false,

	models: [],
	selectedModel: null,
	isModelDropdownOpen: false,
	modelSearchText: '',
	modelLoading: false,
	modelError: false
});

// Derived state functions
export function filteredBrands() {
	const result = state.brandSearchText
		? state.brands.filter(brand =>
			brand.name.toLowerCase().includes(state.brandSearchText.toLowerCase())
		)
		: state.brands;
	return result;
}

export function filteredModels() {
	const result = state.modelSearchText
		? state.models.filter(model =>
			model.model_name.toLowerCase().includes(state.modelSearchText.toLowerCase())
		)
		: state.models;
	return result;
}

export function isModelDisabled() {
	return !state.selectedBrand;
}

// State getters
export const filterState = {
	get brands() { return state.brands; },
	get selectedBrand() { return state.selectedBrand; },
	get isBrandDropdownOpen() { return state.isBrandDropdownOpen; },
	get brandSearchText() { return state.brandSearchText; },
	get brandLoading() { return state.brandLoading; },
	get brandError() { return state.brandError; },

	get models() { return state.models; },
	get selectedModel() { return state.selectedModel; },
	get isModelDropdownOpen() { return state.isModelDropdownOpen; },
	get modelSearchText() { return state.modelSearchText; },
	get modelLoading() { return state.modelLoading; },
	get modelError() { return state.modelError; }
};

// Brand actions
export async function loadBrands() {
	state.brandLoading = true;
	state.brandError = false;

	try {
		const response = await getBrandsList();
		state.brands = response.data;
	} catch (error) {
		console.error('Error loading brands:', error);
		state.brandError = true;
	} finally {
		state.brandLoading = false;
	}
}

export function selectBrand(brand: Brand) {
	state.selectedBrand = brand;
	state.isBrandDropdownOpen = false;
	
	// Clear brand search text to reset card state
	state.brandSearchText = '';
	
	// Clear model when brand changes
	if (state.selectedModel) {
		clearModel();
	}
	
	// Reset model state
	state.models = [];
	state.modelSearchText = '';
	state.modelError = false;
}

export function clearBrand() {
	state.selectedBrand = null;
	clearModel(); // Also clear model when brand is cleared
}

export function openBrandDropdown() {
	state.isBrandDropdownOpen = true;
}

export function closeBrandDropdown() {
	state.isBrandDropdownOpen = false;
	state.brandSearchText = '';
}

export function setBrandSearch(searchText: string) {
	state.brandSearchText = searchText;
}

// Model actions
export async function loadModels(brandId: number) {
	if (!brandId) return;
	
	state.modelLoading = true;
	state.modelError = false;

	try {
		const response = await getModelsById(brandId);
		state.models = response.data;
	} catch (error) {
		console.error('Error loading models:', error);
		state.modelError = true;
	} finally {
		state.modelLoading = false;
	}
}

export function selectModel(model: Model) {
	state.selectedModel = model;
	state.isModelDropdownOpen = false;
	
	// Clear model search text to reset card state
	state.modelSearchText = '';
}

export function clearModel() {
	state.selectedModel = null;
}

export function openModelDropdown() {
	if (state.selectedBrand) {
		state.isModelDropdownOpen = true;
	}
}

export function closeModelDropdown() {
	state.isModelDropdownOpen = false;
	state.modelSearchText = '';
}

export function setModelSearch(searchText: string) {
	state.modelSearchText = searchText;
}

// Utility functions
export function resetAllFilters() {
	state.selectedBrand = null;
	state.selectedModel = null;
	state.isBrandDropdownOpen = false;
	state.isModelDropdownOpen = false;
	state.brandSearchText = '';
	state.modelSearchText = '';
	state.brands = [];
	state.models = [];
}

export function getFilterParams(): FilterParams {
	const params: FilterParams = {};
	
	if (state.selectedBrand) {
		params.Brand = {
			Value: state.selectedBrand.slug
		};
	}
	
	if (state.selectedModel) {
		params.Model = {
			Value: state.selectedModel.slug
		};
	}
	
	return params;
}

export function hasActiveFilters(): boolean {
	return !!(state.selectedBrand || state.selectedModel);
}