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

	import {
		searchBrandState,
		searchModelState,
		searchFilterUtils
	} from './searchFilterState.svelte';
	import { bodyTypeCardSvelte } from '../cards/bodyTypeCard.svelte.ts';
	import { yearInputSvelte } from './inputs/yearInput.svelte.ts';
	import { priceInputSvelte } from './inputs/priceInput.svelte.ts';
	import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.ts';
	import { rangeInputSvelte } from './inputs/rangeInput.svelte.ts';
	import { kmInputSvelte } from './inputs/kmInput.svelte.ts';
	import { powerInputSvelte } from './inputs/powerInput.svelte.ts';

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
		brandCardOpen = false;
	}

	function handleBrandClear() {
		searchFilterUtils.resetBrand();
	}

	function handleBrandClose() {
		brandCardOpen = false;
	}

	function handleModelOpen() {
		modelCardOpen = true;
	}

	function handleModelSelect(model: Model) {
		searchFilterUtils.setModel(model);
		modelCardOpen = false;
	}

	function handleModelClear() {
		searchFilterUtils.resetModel();
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

<div class="w-full max-[750px]:px-[15px]">
	<!-- Main Filter Grid -->
	<div class="mb-[20px] grid w-full grid-cols-3 rounded-[20px] max-[750px]:grid-cols-2">
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

		<YearInput onClear={() => yearInputSvelte.reset()} />

		<PriceInput onClear={() => priceInputSvelte.reset()} />

		<RangeInput onClear={() => rangeInputSvelte.reset()} />

		<BodyTypeInput
			onOpen={() => (bodyTypeCardSvelte.isOpen = true)}
			onClear={() => bodyTypeInputSvelte.reset()}
		/>
	</div>

	<!-- More Filters Section (toggleable) -->
	{#if showMoreFilters}
		<div id="more_filters_container" class="mb-[20px] w-full">
			<div class="grid w-full grid-cols-2 rounded-[20px]">
				<KmInput onClear={() => kmInputSvelte.reset()} />

				<PowerInput onClear={() => powerInputSvelte.reset()} />
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
	onClose={() => (bodyTypeCardSvelte.isOpen = false)}
/>
