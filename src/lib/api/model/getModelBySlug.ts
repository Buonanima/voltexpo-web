import type { Model } from '$lib/components/filters/types';
import config from '$lib/config/env';

export async function getModelBySlug(slug: string): Promise<{ data: Model | null; error: Error | null }> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-model-by-slug?slug=${encodeURIComponent(slug)}`);
		
		if (!response.ok) {
			if (response.status === 404) {
				return { data: null, error: null }; // Model not found is not an error
			}
			throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
		}
		
		const data: Model = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as Error };
	}
}