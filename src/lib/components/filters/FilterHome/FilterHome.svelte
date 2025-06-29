<script lang="ts">
	import BrandInput from './inputs/BrandInput.svelte';
	import ModelInput from './inputs/ModelInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import { homeBrandState, homeModelState, homeFilterUtils } from './homeFilterState.svelte';
	import { brandCardState } from '../cards/brandCard.svelte.js';
	import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
	import { brandInputSvelte } from './inputs/brandInput.svelte.js';
	import { modelInputSvelte } from './inputs/modelInput.svelte.js';
	import type { Brand, Model } from '../types';

	// Brand handlers
	function handleBrandOpen() {
		brandCardState.isOpen = true;
	}

	async function handleBrandSelect(brand: Brand) {
		homeFilterUtils.setBrand(brand);
		brandInputSvelte.selectedBrand = brand;
		brandCardState.isOpen = false;
		
		// Reset model state
		resetModelCard();
		modelInputSvelte.selectedModel = null;
		
		// Load models for the selected brand
		await loadModels(brand.id);
	}

	function handleBrandClear() {
		homeFilterUtils.resetBrand();
		brandInputSvelte.selectedBrand = null;
		resetModelCard();
		modelInputSvelte.selectedModel = null;
	}

	function handleBrandClose() {
		brandCardState.isOpen = false;
		brandCardState.searchText = '';
	}

	function handleModelSelect(model: Model) {
		homeFilterUtils.setModel(model);
		modelInputSvelte.selectedModel = model;
		modelCardState.isOpen = false;
	}

	function handleModelClear() {
		homeFilterUtils.resetModel();
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
			value={homeBrandState.selectedBrand?.brand_name || ''}
			variant="home"
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={homeModelState.selectedModel?.model_name || ''}
			disabled={homeModelState.disabled}
			variant="home"
			onClear={handleModelClear}
		/>
	</div>
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={brandCardState.isOpen}
	onSelect={handleBrandSelect}
	onClose={handleBrandClose}
/>

<ModelCard
	isOpen={modelCardState.isOpen}
	brandId={homeBrandState.selectedBrand?.id}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
/>