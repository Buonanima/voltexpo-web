import type { Model } from '../../types';

export const searchModelInputSvelte = $state<{
	selectedModel: Model | null;
	disabled: boolean;
}>({
	selectedModel: null,
	disabled: true
});