import type { Model } from '../types';
import { getModelsById } from '$lib/api/model/getModelsById';

export const modelCardState = $state<{
	models: Model[];
	isOpen: boolean;
	searchText: string;
	loading: boolean;
	error: boolean;
}>({
	models: [],
	isOpen: false,
	searchText: '',
	loading: false,
	error: false
});

export function getFilteredModels() {
	return modelCardState.searchText
		? modelCardState.models.filter((model) =>
				model.model_name.toLowerCase().includes(modelCardState.searchText.toLowerCase())
			)
		: modelCardState.models;
}

export async function loadModels(brandId: number) {
	if (!brandId) return;

	modelCardState.loading = true;
	modelCardState.error = false;

	try {
		const response = await getModelsById(brandId);
		modelCardState.models = response.data;
	} catch (error) {
		console.error('Error loading models:', error);
		modelCardState.error = true;
	} finally {
		modelCardState.loading = false;
	}
}

export function resetModelCard() {
	modelCardState.models = [];
	modelCardState.isOpen = false;
	modelCardState.searchText = '';
	modelCardState.loading = false;
	modelCardState.error = false;
}