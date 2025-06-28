import type { Brand } from '../types';
import { getBrandsList } from '$lib/api/brand/getBrandsList';

export const brandCardSvelte = $state<{
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
	return brandCardSvelte.searchText
		? brandCardSvelte.brands.filter((brand) =>
				brand.brand_name.toLowerCase().includes(brandCardSvelte.searchText.toLowerCase())
			)
		: brandCardSvelte.brands;
}

export async function loadBrands() {
	brandCardSvelte.loading = true;
	brandCardSvelte.error = false;

	try {
		const response = await getBrandsList();
		brandCardSvelte.brands = response.data;
	} catch (error) {
		console.error('Error loading brands:', error);
		brandCardSvelte.error = true;
	} finally {
		brandCardSvelte.loading = false;
	}
}