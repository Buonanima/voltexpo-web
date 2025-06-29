import type { Brand } from '$lib/components/filters/types';
import config from '$lib/config/env';

export async function getBrandBySlug(slug: string): Promise<{ data: Brand | null; error: Error | null }> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-brand-by-slug?slug=${encodeURIComponent(slug)}`);
		
		if (!response.ok) {
			if (response.status === 404) {
				return { data: null, error: null }; // Brand not found is not an error
			}
			throw new Error(`Failed to fetch brand: ${response.status} ${response.statusText}`);
		}
		
		const data: Brand = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as Error };
	}
}