import type { Model } from '$lib/components/filters/types';
import {
	createSuccessResponse,
	createErrorResponse,
	handleFetchError,
	type ApiResponse
} from '$lib/components/filters/shared/apiUtils';
import config from '$lib/config/env';

export async function getModelsById(brandId: number): Promise<ApiResponse<Model[]>> {
	try {
		const response = await fetch(
			`${config.API_BASE_URL}/api/get-models-by-brand-id?brand_id=${brandId}`
		);

		if (!response.ok) {
			throw handleFetchError(response, 'fetch models');
		}

		const data: Model[] = await response.json();
		return createSuccessResponse(data);
	} catch (error) {
		return createErrorResponse(error as Error, []);
	}
}
