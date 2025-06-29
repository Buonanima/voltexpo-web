import type { Model } from '$lib/components/filters/types';
import { createSuccessResponse, createErrorResponse, handleFetchError, handle404, type ApiResponse } from '$lib/components/filters/shared/apiUtils';
import config from '$lib/config/env';

export async function getModelBySlug(slug: string): Promise<ApiResponse<Model | null>> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-model-by-slug?slug=${encodeURIComponent(slug)}`);
		
		if (!response.ok) {
			// Handle 404 as non-error (model not found is expected behavior)
			const notFoundResponse = handle404(response, false, null);
			if (notFoundResponse) return notFoundResponse;
			
			throw handleFetchError(response, 'fetch model');
		}
		
		const data: Model = await response.json();
		return createSuccessResponse(data);
	} catch (error) {
		return createErrorResponse(error as Error, null);
	}
}