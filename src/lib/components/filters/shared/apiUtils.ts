/**
 * Standardized API response type for all filter-related API calls
 */
export interface ApiResponse<T> {
	data: T;
	error: Error | null;
}

/**
 * Creates a standardized API response for successful calls
 */
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
	return { data, error: null };
}

/**
 * Creates a standardized API response for failed calls
 */
export function createErrorResponse<T>(error: Error, fallbackData: T): ApiResponse<T> {
	return { data: fallbackData, error };
}

/**
 * Creates a standardized API response for 404 not found cases
 * For cases where "not found" is not considered an error
 */
export function createNotFoundResponse<T>(fallbackData: T): ApiResponse<T> {
	return { data: fallbackData, error: null };
}

/**
 * Standardized error handling for fetch operations
 */
export function handleFetchError(response: Response, operation: string): Error {
	return new Error(`Failed to ${operation}: ${response.status} ${response.statusText}`);
}

/**
 * Standardized 404 handling - determines if 404 should be treated as error
 */
export function handle404<T>(
	response: Response, 
	treatAsError: boolean = false,
	fallbackData: T
): ApiResponse<T> | null {
	if (response.status === 404) {
		if (treatAsError) {
			return createErrorResponse(new Error('Resource not found'), fallbackData);
		} else {
			return createNotFoundResponse(fallbackData);
		}
	}
	return null; // Not a 404, continue with normal error handling
}