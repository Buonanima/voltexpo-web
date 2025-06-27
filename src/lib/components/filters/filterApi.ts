// api/filterApi.ts
import type { Brand, Model } from './types';
import config from '$lib/config/env';

export async function getBrandsList(): Promise<{ data: Brand[]; error: Error | null }> {
	try {
		// Replace with your actual API call
		const response = await fetch(`${config.API_BASE_URL}/api/get-all-brands`);
		const data: Brand[] = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: [], error: error as Error };
	}
}

export async function getModelsById(brandId: number): Promise<{ data: Model[]; error: Error | null }> {
	try {
		// Replace with your actual API call
		const response = await fetch(`${config.API_BASE_URL}/api/get-models-by-brand-id?brand_id=${brandId}`);
		const data: Model[] = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: [], error: error as Error };
	}
}
