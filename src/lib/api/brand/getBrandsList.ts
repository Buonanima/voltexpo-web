import type { Brand } from '$lib/components/filters/types';
import {
	createSuccessResponse,
	createErrorResponse,
	handleFetchError,
	type ApiResponse
} from '$lib/components/filters/shared/apiUtils';
import config from '$lib/config/env';

export async function getBrandsList(): Promise<ApiResponse<Brand[]>> {
	try {
		const response = await fetch(`${config.API_BASE_URL}/api/get-all-brands`);

		if (!response.ok) {
			throw handleFetchError(response, 'fetch brands');
		}

		const data: Brand[] = await response.json();
		return createSuccessResponse(data);
	} catch (error) {
		return createErrorResponse(error as Error, []);
	}
}
