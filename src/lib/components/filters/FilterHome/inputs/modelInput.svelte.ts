import type { Model } from '../../types';

export const modelInputSvelte = $state<{
	selectedModel: Model | null;
	disabled: boolean;
}>({
	selectedModel: null,
	disabled: true
});