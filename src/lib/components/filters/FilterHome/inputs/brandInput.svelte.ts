import type { Brand } from '../../types';

export const brandInputSvelte = $state<{
	selectedBrand: Brand | null;
}>({
	selectedBrand: null
});