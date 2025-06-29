<script lang="ts">
	import BrandInput from '../FilterHome/inputs/BrandInput.svelte';
	import ModelInput from '../FilterHome/inputs/ModelInput.svelte';
	import YearInput from './inputs/YearInput.svelte';
	import PriceInput from './inputs/PriceInput.svelte';
	import BodyTypeInput from './inputs/BodyTypeInput.svelte';
	import RangeInput from './inputs/RangeInput.svelte';
	import KmInput from './inputs/KmInput.svelte';
	import PowerInput from './inputs/PowerInput.svelte';
	import BrandCard from '../cards/BrandCard.svelte';
	import ModelCard from '../cards/ModelCard.svelte';
	import BodyTypeCard from '../cards/BodyTypeCard.svelte';
	
	import { searchBrandState, searchModelState, searchFilterUtils } from './searchFilterState.svelte';
	import { bodyTypeCardSvelte } from '../cards/bodyTypeCard.svelte.js';
	import { yearInputSvelte } from './inputs/yearInput.svelte.js';
	import { priceInputSvelte } from './inputs/priceInput.svelte.js';
	import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
	import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
	import { kmInputSvelte } from './inputs/kmInput.svelte.js';
	import { powerInputSvelte } from './inputs/powerInput.svelte.js';
	import { searchBrandInputSvelte } from './inputs/brandInput.svelte';
	import { searchModelInputSvelte } from './inputs/modelInput.svelte';

	// Import extracted logic modules
	import { searchFilterState } from './searchFilterState.svelte';
	import { searchFilterUrlParams } from './searchFilterUrlParams.svelte';
	
	import type { FilterParams, Model, Brand } from '../types';

	// Props
	const { 
		showMoreFilters = false,
		onFiltersChange,
		availableModels = [],
		modelsLoading = false,
		modelsError = false,
		onModelsRetry,
		availableBrands = [],
		brandsLoading = false,
		brandsError = false,
		onBrandsRetry
	} = $props<{
		showMoreFilters?: boolean;
		onFiltersChange?: (filters: FilterParams) => void;
		availableModels?: Model[];
		modelsLoading?: boolean;
		modelsError?: boolean;
		onModelsRetry?: () => void;
		availableBrands?: Brand[];
		brandsLoading?: boolean;
		brandsError?: boolean;
		onBrandsRetry?: () => void;
	}>();

	// Local state for card open/close
	let brandCardOpen = $state(false);
	let modelCardOpen = $state(false);

	// Local handler functions
	function handleBrandOpen() {
		brandCardOpen = true;
	}

	function handleBrandSelect(brand: Brand) {
		searchFilterUtils.setBrand(brand);
		searchBrandInputSvelte.selectedBrand = brand;
		brandCardOpen = false;
		
		// Reset model state when brand changes
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = false;
	}

	function handleBrandClear() {
		searchFilterUtils.resetBrand();
		searchBrandInputSvelte.selectedBrand = null;
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = true;
	}

	function handleBrandClose() {
		brandCardOpen = false;
	}

	function handleModelOpen() {
		modelCardOpen = true;
	}

	function handleModelSelect(model: Model) {
		searchFilterUtils.setModel(model);
		searchModelInputSvelte.selectedModel = model;
		modelCardOpen = false;
	}

	function handleModelClear() {
		searchFilterUtils.resetModel();
		searchModelInputSvelte.selectedModel = null;
	}

	function handleModelClose() {
		modelCardOpen = false;
	}

	// Get current filters from state module
	const currentFilters = $derived(searchFilterState.currentFilters);

	// Notify parent when filters change - this will trigger immediately on any filter update
	$effect(() => {
		if (onFiltersChange) {
			onFiltersChange(currentFilters);
		}
	});

	// Public methods for parent components
	export function getCurrentFilters(): FilterParams {
		return currentFilters;
	}

	export function resetAllFilters(): void {
		searchFilterUtils.resetBrand();
		searchBrandInputSvelte.selectedBrand = null;
		searchModelInputSvelte.selectedModel = null;
		searchModelInputSvelte.disabled = true;
		yearInputSvelte.reset();
		priceInputSvelte.reset();
		rangeInputSvelte.reset();
		bodyTypeInputSvelte.reset();
		kmInputSvelte.reset();
		powerInputSvelte.reset();
	}

	export async function initializeFromUrlParams(searchParams: URLSearchParams): Promise<void> {
		await searchFilterUrlParams.initializeFromUrlParams(searchParams);
	}

	export function generateUrlSearchParams(): URLSearchParams {
		return searchFilterUrlParams.generateUrlSearchParams();
	}
</script>

<div class="w-full max-[750px]:px-[15px] ">
	<!-- Main Filter Grid -->
	<div class="w-full grid grid-cols-3 max-[750px]:grid-cols-2 rounded-[20px] mb-[20px]">
		<!-- First Row: Brand, Model, Year -->
		<BrandInput
			value={searchBrandState.selectedBrand?.brand_name || ''}
			variant="search"
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={searchModelState.selectedModel?.model_name || ''}
			disabled={searchModelState.disabled}
			variant="search"
			onClick={handleModelOpen}
			onClear={handleModelClear}
		/>

		<YearInput
			onClear={() => yearInputSvelte.reset()}
			onChange={(from, to) => {/* Filter changes are auto-detected via $effect */}}
		/>

		<PriceInput
			onClear={() => priceInputSvelte.reset()}
			onChange={(from, to) => {/* Filter changes are auto-detected via $effect */}}
		/>

		<RangeInput
			onClear={() => rangeInputSvelte.reset()}
			onChange={(from, to) => {/* Filter changes are auto-detected via $effect */}}
		/>

		<BodyTypeInput
			onOpen={() => bodyTypeCardSvelte.isOpen = true}
			onClear={() => bodyTypeInputSvelte.reset()}
			onChange={(value) => {/* Filter changes are auto-detected via $effect */}}
		/>
	</div>

	<!-- More Filters Section (toggleable) -->
	{#if showMoreFilters}
		<div id="more_filters_container" class="w-full mb-[20px]">
			<div class="w-full grid grid-cols-2 rounded-[20px]">
				<KmInput
					onClear={() => kmInputSvelte.reset()}
					onChange={(from, to) => {/* Filter changes are auto-detected via $effect */}}
				/>

				<PowerInput
					onClear={() => powerInputSvelte.reset()}
					onChange={(from, to) => {/* Filter changes are auto-detected via $effect */}}
				/>
			</div>
		</div>
	{/if}
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
	brandId={searchBrandState.selectedBrand?.id}
	models={availableModels}
	loading={modelsLoading}
	error={modelsError}
	onSelect={handleModelSelect}
	onClose={handleModelClose}
	onRetry={onModelsRetry}
/>

<BodyTypeCard
	isOpen={bodyTypeCardSvelte.isOpen}
	onSelect={(bodyType) => {
		bodyTypeInputSvelte.selectedBodyType = bodyType;
		bodyTypeCardSvelte.isOpen = false;
	}}
	onClose={() => bodyTypeCardSvelte.isOpen = false}
/>