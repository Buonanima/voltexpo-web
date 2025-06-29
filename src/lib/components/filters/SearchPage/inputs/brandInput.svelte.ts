import type { Brand } from '../../types';

export const searchBrandInputSvelte = $state<{
	selectedBrand: Brand | null;
}>({
	selectedBrand: null
});