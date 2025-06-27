import type { IDValue, RangeFilter } from '$lib/server/post/fetchPostList/types';

export const FilterHelpers = {
	// Brand filter helper
	brandFilter: (slug: string, id?: number, value?: string): IDValue => ({
		slug,
		...(id && { id }),
		...(value && { value })
	}),

	// Model filter helper
	modelFilter: (slug: string, id?: number, value?: string): IDValue => ({
		slug,
		...(id && { id }),
		...(value && { value })
	}),

	// Body type filter helper
	bodyTypeFilter: (slug: string, value?: string): IDValue => ({
		slug,
		...(value && { value })
	}),

	// Range filter helper
	rangeFilter: (from?: string, to?: string): RangeFilter => ({
		...(from && { from }),
		...(to && { to })
	}),

	// Year range helper
	yearRange: (fromYear?: number, toYear?: number): RangeFilter => ({
		...(fromYear && { from: fromYear.toString() }),
		...(toYear && { to: toYear.toString() })
	}),

	// Price range helper
	priceRange: (fromPrice?: number, toPrice?: number): RangeFilter => ({
		...(fromPrice && { from: fromPrice.toString() }),
		...(toPrice && { to: toPrice.toString() })
	}),

	// Km range helper
	kmRange: (fromKm?: number, toKm?: number): RangeFilter => ({
		...(fromKm && { from: fromKm.toString() }),
		...(toKm && { to: toKm.toString() })
	}),

	// Power range helper
	powerRange: (fromPower?: number, toPower?: number): RangeFilter => ({
		...(fromPower && { from: fromPower.toString() }),
		...(toPower && { to: toPower.toString() })
	}),

	// Electric range helper
	electricRange: (fromRange?: number, toRange?: number): RangeFilter => ({
		...(fromRange && { from: fromRange.toString() }),
		...(toRange && { to: toRange.toString() })
	})
};
