export interface Brand {
	id: number;
	brand_name: string;
	slug: string;
	value: string;
}

export interface Model {
	id: number;
	model_name: string; // For models
	slug: string;
	value: string;
}

export interface FilterParams {
	Brand?: {
		Value?: string;
	};
	Model?: {
		Value?: string;
	};
}
