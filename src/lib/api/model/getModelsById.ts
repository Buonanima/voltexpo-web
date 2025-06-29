import type { Model } from '$lib/components/filters/types';
import config from '$lib/config/env';

export async function getModelsById(
	brandId: number
): Promise<{ data: Model[]; error: Error | null }> {
	try {
		const response = await fetch(
			`${config.API_BASE_URL}/api/get-models-by-brand-id?brand_id=${brandId}`
		);
		
		if (!response.ok) {
			throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
		}
		
		const data: Model[] = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: [], error: error as Error };
	}
}