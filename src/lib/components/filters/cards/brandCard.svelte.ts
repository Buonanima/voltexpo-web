import type { Brand } from '../types';
import { getBrandsList } from '$lib/api/brand/getBrandsList';

export const brandCardState = $state<{
	brands: Brand[];
	isOpen: boolean;
	searchText: string;
	loading: boolean;
	error: boolean;
}>({
	brands: [],
	isOpen: false,
	searchText: '',
	loading: false,
	error: false
});

export function getFilteredBrands() {
	return brandCardState.searchText
		? brandCardState.brands.filter((brand) =>
				brand.brand_name.toLowerCase().includes(brandCardState.searchText.toLowerCase())
			)
		: brandCardState.brands;
}

export async function loadBrands() {
	brandCardState.loading = true;
	brandCardState.error = false;

	try {
		const response = await getBrandsList();
		brandCardState.brands = response.data;
	} catch (error) {
		console.error('Error loading brands:', error);
		brandCardState.error = true;
	} finally {
		brandCardState.loading = false;
	}
}

// Note: Brands are now loaded via server-side rendering (SSR) and passed as props to BrandCard
// This eliminates unnecessary client-side API calls and improves performance
// loadBrands() function is still available for backwards compatibility with pages that don't use SSR