<script lang="ts">
	import BrandInput from './inputs/BrandInput.svelte';
	import ModelInput from './inputs/ModelInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import { homeBrandState, homeModelState, homeFilterUtils } from './homeFilterState.svelte';
	import type { Brand, Model } from '../types';

	// Props for data and handlers
	const {
		availableBrands = [],
		availableModels = [],
		modelsLoading = false,
		modelsError = false,
		brandsLoading = false,
		brandsError = false,
		onLoadModels,
		onBrandsRetry,
		onModelsRetry
	} = $props<{
		availableBrands?: Brand[];
		availableModels?: Model[];
		modelsLoading?: boolean;
		modelsError?: boolean;
		brandsLoading?: boolean;
		brandsError?: boolean;
		onLoadModels?: (brandId: number | null) => Promise<void>;
		onBrandsRetry?: () => void;
		onModelsRetry?: () => void;
	}>();

	// Local state for card open/close
	let brandCardOpen = $state(false);
	let modelCardOpen = $state(false);

	// Brand handlers
	function handleBrandOpen() {
		brandCardOpen = true;
	}

	async function handleBrandSelect(brand: Brand) {
		// Update local filter state
		homeFilterUtils.setBrand(brand);
		brandCardOpen = false;

		// Load models for the selected brand
		if (onLoadModels) {
			await onLoadModels(brand.id);
		}
	}

	function handleBrandClear() {
		// Reset brand and model state
		homeFilterUtils.resetBrand();

		// Clear models when brand is cleared
		if (onLoadModels) {
			onLoadModels(null);
		}
	}

	function handleBrandClose() {
		brandCardOpen = false;
	}

	// Model handlers
	function handleModelOpen() {
		modelCardOpen = true;
	}

	function handleModelSelect(model: Model) {
		// Update local filter state
		homeFilterUtils.setModel(model);
		modelCardOpen = false;
	}

	function handleModelClear() {
		homeFilterUtils.resetModel();
	}

	function handleModelClose() {
		modelCardOpen = false;
	}

	function handleModelsRetry() {
		if (onModelsRetry) {
			onModelsRetry();
		}
	}
</script>

<div
	id="filter_minimal"
	class="flex w-full flex-row items-center
           gap-[15px] pb-[20px] pt-[20px] max-[750px]:flex-col max-[750px]:px-[15px]"
>
	<div class="flex w-full flex-row">
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
			onClick={handleModelOpen}
			onClear={handleModelClear}
		/>
	</div>
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={brandCardOpen}
	brands={availableBrands}
	loading={brandsLoading}
	error={brandsError}
	onSelect={handleBrandSelect}
	onClose={handleBrandClose}
	onRetry={onBrandsRetry}
/>

<ModelCard
	isOpen={modelCardOpen}
	brandId={homeBrandState.selectedBrand?.id}
	models={availableModels}
	loading={modelsLoading}
	error={modelsError}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
	onRetry={handleModelsRetry}
/>
