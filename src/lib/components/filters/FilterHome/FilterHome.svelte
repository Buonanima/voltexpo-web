<script lang="ts">
	import BrandInput from './inputs/BrandInput.svelte';
	import ModelInput from './inputs/ModelInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import { homeBrandState, homeModelState, homeFilterUtils } from './homeFilterState.svelte';
	import { brandCardSvelte } from '../cards/brandCard.svelte.js';
	import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
	import type { Brand, Model } from '../types';

	// Brand handlers
	function handleBrandOpen() {
		brandCardSvelte.isOpen = true;
	}

	async function handleBrandSelect(brand: Brand) {
		homeFilterUtils.setBrand(brand);
		brandCardSvelte.isOpen = false;
		
		// Reset model state
		resetModelCard();
		
		// Load models for the selected brand
		await loadModels(brand.id);
	}

	function handleBrandClear() {
		homeFilterUtils.resetBrand();
		resetModelCard();
	}

	function handleBrandClose() {
		brandCardSvelte.isOpen = false;
		brandCardSvelte.searchText = '';
	}

	function handleModelSelect(model: Model) {
		homeFilterUtils.setModel(model);
		modelCardState.isOpen = false;
	}

	function handleModelClear() {
		homeFilterUtils.resetModel();
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
	isOpen={brandCardSvelte.isOpen}
	onSelect={handleBrandSelect}
	onClose={handleBrandClose}
/>

<ModelCard
	isOpen={modelCardState.isOpen}
	brandId={homeBrandState.selectedBrand?.id}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
/>