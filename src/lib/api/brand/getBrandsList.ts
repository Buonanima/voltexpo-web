import type { Brand } from '$lib/components/filters/types';
import config from '$lib/config/env';

export async function getBrandsList(): Promise<{ data: Brand[]; error: Error | null }> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-all-brands`);
		
		if (!response.ok) {
			throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
		}
		
		const data: Brand[] = await response.json();
		return { data, error: null };
	} catch (error) {
		return { data: [], error: error as Error };
	}
}