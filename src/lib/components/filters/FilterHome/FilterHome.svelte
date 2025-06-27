<script lang="ts">
	import BrandInput from './BrandInput.svelte';
	import ModelInput from './ModelInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import {
		filterState,
		filteredBrands,
		filteredModels,
		isModelDisabled,
		loadBrands,
		loadModels,
		selectBrand,
		selectModel,
		clearBrand,
		clearModel,
		openBrandDropdown,
		closeBrandDropdown,
		openModelDropdown,
		closeModelDropdown,
		setBrandSearch,
		setModelSearch
	} from '../filterState.svelte';
	import type { Brand, Model } from '../types';

	// Brand handlers
	function handleBrandOpen() {
		openBrandDropdown();
	}

	async function handleBrandSelect(brand: Brand) {
		await selectBrand(brand);
	}

	function handleBrandClear() {
		clearBrand();
	}

	function handleBrandClose() {
		closeBrandDropdown();
	}

	function handleBrandSearch(searchText: string) {
		setBrandSearch(searchText);
	}

	async function handleBrandLoad() {
		await loadBrands();
	}

	// Model handlers
	function handleModelOpen() {
		if (filterState.selectedBrand?.id) {
			openModelDropdown();
		}
	}

	function handleModelSelect(model: Model) {
		selectModel(model);
	}

	function handleModelClear() {
		clearModel();
	}

	function handleModelClose() {
		closeModelDropdown();
	}

	function handleModelSearch(searchText: string) {
		setModelSearch(searchText);
	}

	async function handleModelLoad(brandId: number) {
		await loadModels(brandId);
	}

	async function handleModelRetry(brandId: number) {
		await loadModels(brandId);
	}

	// Load brand on component mount
	$effect(() => {
		if (filterState.brands.length === 0 && !filterState.brandLoading && !filterState.brandError) {
			loadBrands();
		}
	});
</script>

<div
	id="filter_minimal"
	class="w-full max-[750px]:px-[15px] pt-[20px] pb-[20px]
           flex flex-row items-center max-[750px]:flex-col gap-[15px]"
>
	<div class="w-full flex flex-row">
		<BrandInput
			value={filterState.selectedBrand?.value || ''}
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={filterState.selectedModel?.value || filterState.selectedModel?.model_name || ''}
			disabled={isModelDisabled()}
			onOpen={handleModelOpen}
			onClear={handleModelClear}  
		/>
	</div>
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={filterState.isBrandDropdownOpen}
	brands={filterState.brands}
	searchText={filterState.brandSearchText}
	loading={filterState.brandLoading}
	error={filterState.brandError}
	filteredBrands={filteredBrands()}
	onSelect={handleBrandSelect}
	onClose={handleBrandClose}
	onSearch={handleBrandSearch}
	onLoad={handleBrandLoad}
/>

<ModelCard
	isOpen={filterState.isModelDropdownOpen}
	models={filterState.models}
	searchText={filterState.modelSearchText}
	loading={filterState.modelLoading}
	error={filterState.modelError}
	filteredModels={filteredModels()}
	brandId={filterState.selectedBrand?.id}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
	onSearch={handleModelSearch}
	onLoad={handleModelLoad}
	onRetry={handleModelRetry}
/>