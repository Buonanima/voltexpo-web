import type { Brand } from '$lib/components/filters/types';
import { createSuccessResponse, createErrorResponse, handleFetchError, handle404, type ApiResponse } from '$lib/components/filters/shared/apiUtils';
import config from '$lib/config/env';

export async function getBrandBySlug(slug: string): Promise<ApiResponse<Brand | null>> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-brand-by-slug?slug=${encodeURIComponent(slug)}`);
		
		if (!response.ok) {
			// Handle 404 as non-error (brand not found is expected behavior)
			const notFoundResponse = handle404(response, false, null);
			if (notFoundResponse) return notFoundResponse;
			
			throw handleFetchError(response, 'fetch brand');
		}
		
		const data: Brand = await response.json();
		return createSuccessResponse(data);
	} catch (error) {
		return createErrorResponse(error as Error, null);
	}
}