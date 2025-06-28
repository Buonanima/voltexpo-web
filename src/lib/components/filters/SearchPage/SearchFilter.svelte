<!-- components/filters/SearchPage/SearchFilter.svelte -->
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
	
	import { brandInputSvelte } from '../FilterHome/inputs/brandInput.svelte.js';
	import { modelInputSvelte } from '../FilterHome/inputs/modelInput.svelte.js';
	import { brandCardSvelte } from '../cards/brandCard.svelte.js';
	import { modelCardState, loadModels, resetModelCard } from '../cards/modelCard.svelte';
	import { yearInputSvelte } from './inputs/yearInput.svelte.js';
	import { priceInputSvelte } from './inputs/priceInput.svelte.js';
	import { bodyTypeInputSvelte } from './inputs/bodyTypeInput.svelte.js';
	import { rangeInputSvelte } from './inputs/rangeInput.svelte.js';
	import { kmInputSvelte } from './inputs/kmInput.svelte.js';
	import { powerInputSvelte } from './inputs/powerInput.svelte.js';
	
	import type { Brand, Model } from '../types';

	// Props
	const { showMoreFilters = false } = $props<{
		showMoreFilters?: boolean;
	}>();

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

	// Other filter handlers (can be expanded later)
	function handleYearChange(from: number | null, to: number | null) {
		// Handle year filter change
		console.log('Year changed:', { from, to });
	}

	function handlePriceChange(from: number | null, to: number | null) {
		// Handle price filter change
		console.log('Price changed:', { from, to });
	}

	function handleBodyTypeOpen() {
		// Handle body type selection
		console.log('Body type opened');
	}

	function handleBodyTypeChange(value: string | null) {
		// Handle body type change
		console.log('Body type changed:', value);
	}

	function handleRangeChange(from: number | null, to: number | null) {
		// Handle range filter change
		console.log('Range changed:', { from, to });
	}

	function handleKmChange(from: number | null, to: number | null) {
		// Handle km filter change
		console.log('Km changed:', { from, to });
	}

	function handlePowerChange(from: number | null, to: number | null) {
		// Handle power filter change
		console.log('Power changed:', { from, to });
	}
</script>

<div class="w-full max-[750px]:px-[15px] ">
	<!-- Main Filter Grid -->
	<div class="w-full grid grid-cols-3 max-[750px]:grid-cols-2 rounded-[20px] mb-[20px]">
		<!-- First Row: Brand, Model, Year -->
		<BrandInput
			value={brandInputSvelte.selectedBrand?.brand_name || ''}
			variant="search"
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={modelInputSvelte.selectedModel?.model_name || ''}
			disabled={modelInputSvelte.disabled}
			variant="search"
			onClear={handleModelClear}
		/>

		<YearInput
			onClear={() => yearInputSvelte.reset()}
			onChange={handleYearChange}
		/>

		<PriceInput
			onClear={() => priceInputSvelte.reset()}
			onChange={handlePriceChange}
		/>

		<RangeInput
			onClear={() => rangeInputSvelte.reset()}
			onChange={handleRangeChange}
		/>

		<BodyTypeInput
			onOpen={handleBodyTypeOpen}
			onClear={() => bodyTypeInputSvelte.reset()}
			onChange={handleBodyTypeChange}
		/>
	</div>

	<!-- More Filters Section (toggleable) -->
	{#if showMoreFilters}
		<div id="more_filters_container" class="w-full mb-[20px]">
			<div class="w-full grid grid-cols-2 rounded-[20px]">
				<KmInput
					onClear={() => kmInputSvelte.reset()}
					onChange={handleKmChange}
				/>

				<PowerInput
					onClear={() => powerInputSvelte.reset()}
					onChange={handlePowerChange}
				/>
			</div>
		</div>
	{/if}
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