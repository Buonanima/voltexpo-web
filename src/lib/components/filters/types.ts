export interface Brand {
	id: number;
	brand_name: string;
	slug: string;
}

export interface Model {
	id: number;
	model_name: string;
	slug: string;
}

export interface IDValue {
	id?: number;
	value?: string;
	slug?: string;
}

export interface RangeFilter {
	from?: string;
	to?: string;
}

export interface OrderBy {
	field?: string;
	order?: 'asc' | 'desc';
}

export interface FilterParams {
	brand?: IDValue;
	model?: IDValue;
	year?: RangeFilter;
	price?: RangeFilter;
	range?: RangeFilter;
	km?: RangeFilter;
	power?: RangeFilter;
	bodyType?: IDValue;
}

export interface PostsRequestBody {
	filters?: FilterParams;
	ordering?: OrderBy;
	excludedIds?: number[];
	limit?: number;
}

export interface FetchPostListOptions {
	filters?: FilterParams;
	ordering?: OrderBy;
	excludedIds?: number[];
	limit?: number;
}
