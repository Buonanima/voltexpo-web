export interface Brand {
	id: number;
	brand_name: string;
	slug: string;
}

export interface Model {
	id: number;
	model_name: string; // For models
	slug: string;
}

export interface FilterParams {
	Brand?: {
		Value?: string;
	};
	Model?: {
		Value?: string;
	};
}
