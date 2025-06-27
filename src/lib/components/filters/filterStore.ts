// stores/filterStore.ts
import { writable, derived } from 'svelte/store';
import type { Brand, Model, FilterStore } from './types';

export const brandStore = writable<FilterStore<Brand>>({
	list: [],
	selected: null,
	isOpen: false,
	searchText: ''
});

export const modelStore = writable<FilterStore<Model>>({
	list: [],
	selected: null,
	isOpen: false,
	searchText: ''
});

// Derived stores for filtered lists
export const filteredBrands = derived(
	brandStore,
	($brandStore) => {
		if (!$brandStore.searchText) return $brandStore.list;
		return $brandStore.list.filter(brand =>
			brand.name.toLowerCase().includes($brandStore.searchText.toLowerCase())
		);
	}
);

export const filteredModels = derived(
	modelStore,
	($modelStore) => {
		if (!$modelStore.searchText) return $modelStore.list;
		return $modelStore.list.filter(model =>
			model.model_name.toLowerCase().includes($modelStore.searchText.toLowerCase())
		);
	}
);
