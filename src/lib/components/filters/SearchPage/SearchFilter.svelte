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
	
	import { searchBrandState, searchModelState } from './searchFilterState.svelte';
	import { brandCardSvelte } from '../cards/brandCard.svelte.js';
	import { modelCardState } from '../cards/modelCard.svelte';
	import { bodyTypeCardSvelte } from '../cards/bodyTypeCard.svelte.js';
	import { yearInputSvelte } from './inputs/yearInput.svelte.js';
	import { priceInputSvelte } from './inputs/priceInput.svelte.js';
	import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
	import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
	import { kmInputSvelte } from './inputs/kmInput.svelte.js';
	import { powerInputSvelte } from './inputs/powerInput.svelte.js';

	// Import extracted logic modules
	import { searchFilterHandlers } from './searchFilterHandlers.svelte';
	import { searchFilterState } from './searchFilterState.svelte';
	import { searchFilterUrlParams } from './searchFilterUrlParams.svelte';
	
	import type { FilterParams } from '$lib/api/post/fetchPostList/types';

	// Props
	const { 
		showMoreFilters = false,
		onFiltersChange
	} = $props<{
		showMoreFilters?: boolean;
		onFiltersChange?: (filters: FilterParams) => void;
	}>();

	// Get current filters from state module
	const currentFilters = $derived(searchFilterState.currentFilters);

	// Notify parent when filters change
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
		searchFilterHandlers.resetAllFilters();
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
			onOpen={searchFilterHandlers.handleBrandOpen}
			onClear={searchFilterHandlers.handleBrandClear}
		/>

		<ModelInput
			value={searchModelState.selectedModel?.model_name || ''}
			disabled={searchModelState.disabled}
			variant="search"
			onClear={searchFilterHandlers.handleModelClear}
		/>

		<YearInput
			onClear={() => yearInputSvelte.reset()}
			onChange={searchFilterHandlers.handleYearChange}
		/>

		<PriceInput
			onClear={() => priceInputSvelte.reset()}
			onChange={searchFilterHandlers.handlePriceChange}
		/>

		<RangeInput
			onClear={() => rangeInputSvelte.reset()}
			onChange={searchFilterHandlers.handleRangeChange}
		/>

		<BodyTypeInput
			onOpen={searchFilterHandlers.handleBodyTypeOpen}
			onClear={() => bodyTypeInputSvelte.reset()}
			onChange={searchFilterHandlers.handleBodyTypeChange}
		/>
	</div>

	<!-- More Filters Section (toggleable) -->
	{#if showMoreFilters}
		<div id="more_filters_container" class="w-full mb-[20px]">
			<div class="w-full grid grid-cols-2 rounded-[20px]">
				<KmInput
					onClear={() => kmInputSvelte.reset()}
					onChange={searchFilterHandlers.handleKmChange}
				/>

				<PowerInput
					onClear={() => powerInputSvelte.reset()}
					onChange={searchFilterHandlers.handlePowerChange}
				/>
			</div>
		</div>
	{/if}
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={brandCardSvelte.isOpen}
	onSelect={searchFilterHandlers.handleBrandSelect}
	onClose={searchFilterHandlers.handleBrandClose}
/>

<ModelCard
	isOpen={modelCardState.isOpen}
	brandId={searchBrandState.selectedBrand?.id}
	onSelect={searchFilterHandlers.handleModelSelect}
	onClose={searchFilterHandlers.handleModelClose}
/>

<BodyTypeCard
	isOpen={bodyTypeCardSvelte.isOpen}
	onSelect={searchFilterHandlers.handleBodyTypeSelect}
	onClose={searchFilterHandlers.handleBodyTypeClose}
/>