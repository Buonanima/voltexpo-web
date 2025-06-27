// types.ts
export interface FilterItem {
	id: number | null;
	name?: string; // For brands
	model_name?: string; // For models
	slug: string;
	value?: string;
}

export interface Brand extends FilterItem {
	id: number | null;
	name: string;
}

export interface Model extends FilterItem {
	id: number | null;
	model_name: string;
}

export interface FilterStore<T extends FilterItem> {
	list: T[];
	selected: T | null;
	isOpen: boolean;
	searchText: string;
}

export interface FilterParams {
	Brand?: {
		Value?: string;
	};
	Model?: {
		Value?: string;
	};
}
