<script lang="ts">
	import BrandInput from './BrandInput.svelte';
	import ModelInput from './ModelInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import { brandInputSvelte } from './brandInput.svelte';
	import { modelInputSvelte } from './modelInput.svelte';
	import { brandCardSvelte } from '../cards/brandCard.svelte.js';
	import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
	import type { Brand, Model } from '../types';

	// Brand handlers
	function handleBrandOpen() {
		brandCardSvelte.isOpen = true;
	}

	async function handleBrandSelect(brand: Brand) {
		brandInputSvelte.selectedBrand = brand;
		brandCardSvelte.isOpen = false;
		
		// Clear model when brand changes
		if (modelInputSvelte.selectedModel) {
			modelInputSvelte.selectedModel = null;
		}
		
		// Reset model state
		resetModelCard();
		modelInputSvelte.disabled = false;
		
		// Load models for the selected brand
		await loadModels(brand.id);
	}

	function handleBrandClear() {
		brandInputSvelte.selectedBrand = null;
		modelInputSvelte.selectedModel = null;
		modelInputSvelte.disabled = true;
		resetModelCard();
	}

	function handleBrandClose() {
		brandCardSvelte.isOpen = false;
		brandCardSvelte.searchText = '';
	}

	function handleModelSelect(model: Model) {
		modelInputSvelte.selectedModel = model;
		modelCardState.isOpen = false;
	}

	function handleModelClear() {
		modelInputSvelte.selectedModel = null;
	}

	function handleModelClose() {
		modelCardState.isOpen = false;
		modelCardState.searchText = '';
	}

</script>

<div
	id="filter_minimal"
	class="w-full max-[750px]:px-[15px] pt-[20px] pb-[20px]
           flex flex-row items-center max-[750px]:flex-col gap-[15px]"
>
	<div class="w-full flex flex-row">
		<BrandInput
			value={brandInputSvelte.selectedBrand?.brand_name || ''}
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={modelInputSvelte.selectedModel?.model_name || ''}
			disabled={modelInputSvelte.disabled}
			onClear={handleModelClear}
		/>
	</div>
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={brandCardSvelte.isOpen}
	onSelect={handleBrandSelect}
	onClose={handleBrandClose}
/>

<ModelCard
	isOpen={modelCardState.isOpen}
	brandId={brandInputSvelte.selectedBrand?.id}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
/>