<!-- components/Filter.svelte -->
<script lang="ts">
	import BrandInput from './BrandInput.svelte';
	import ModelInput from './ModelInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Brand, Model, FilterParams } from '../types';
	import { brandStore, modelStore } from '$lib/components/filters/filterStore';
	import BrandCard from '$lib/components/filters/cards/BrandCard.svelte';
	import ModelCard from '$lib/components/filters/cards/ModelCard.svelte';
	import { getBrandsList, getModelsById } from '$lib/components/filters/filterApi';

	const dispatch = createEventDispatcher<{
		brandSelect: Brand;
		modelSelect: Model;
		brandClear: void;
		modelClear: void;
	}>();

	// Props for initial values
	export let params: FilterParams | null = null;

	// Card state management
	let brandCardState = {
		isOpen: false,
		brands: [] as Brand[],
		searchText: '',
		loading: false,
		error: false,
		filteredBrands: [] as Brand[]
	};

	let modelCardState = {
		isOpen: false,
		models: [] as Model[],
		searchText: '',
		loading: false,
		error: false,
		filteredModels: [] as Model[],
		brandId: null as number | null
	};

	// These will be automatically updated by the reactive statements below
	let selectedBrand: Brand | null = null;
	let selectedModel: Model | null = null;

	// Initialize with params if provided
	$: if (params?.Brand?.Value && !$brandStore.selected) {
		selectedBrand = {
			id: null,
			slug: '',
			name: params.Brand.Value,
			value: params.Brand.Value
		};
		brandStore.update(store => ({ ...store, selected: selectedBrand }));
		console.log('Initial brand set:', selectedBrand);
	}

	$: if (params?.Model?.Value && !$modelStore.selected) {
		selectedModel = {
			id: null,
			slug: '',
			model_name: params.Model.Value,
			value: params.Model.Value
		};
		modelStore.update(store => ({ ...store, selected: selectedModel }));
	}

	// Update selected values from store
	$: selectedBrand = $brandStore.selected;
	$: selectedModel = $modelStore.selected;

	$: {
		// When brand changes, reset model
		if (selectedBrand !== $brandStore.selected) {
			// If brand is cleared or changed to a different brand
			if (!selectedBrand || (selectedBrand && $modelStore.selected)) {
				modelStore.update(store => ({ ...store, selected: null, list: [] }));
			}
		}
	}

	//Reset model cars state on brand change
	$: if (selectedBrand?.id !== modelCardState.brandId) {
		modelCardState = {
			...modelCardState,
			brandId: selectedBrand?.id || null,
			models: [],
			filteredModels: [],
			searchText: '',
			error: false
		};
	}

	// Filter brands based on search
	$: brandCardState.filteredBrands = brandCardState.brands.filter(brand =>
		brand.name.toLowerCase().includes(brandCardState.searchText.toLowerCase())
	);

	// Filter models based on search
	$: modelCardState.filteredModels = modelCardState.models.filter(model =>
		model.model_name.toLowerCase().includes(modelCardState.searchText.toLowerCase())
	);

	// Brand Card Event Handlers
	function handleBrandLoad(): void {
		brandCardState.loading = true;
		brandCardState.error = false;

		// Load brands from your API
		loadBrands()
			.then(brands => {
				brandCardState = {
					...brandCardState,
					brands,
					loading: false,
					error: false
				};
			})
			.catch(error => {
				console.error('Error loading brands:', error);
				brandCardState = {
					...brandCardState,
					loading: false,
					error: true
				};
			});
	}

	function handleBrandSearch(event: CustomEvent<string>): void {
		brandCardState.searchText = event.detail;
	}

	function handleBrandSelect(event: CustomEvent<Brand>): void {
		console.log('Brand selected:', event.detail);
		brandCardState.isOpen = false;
		brandStore.update(store => ({ ...store, selected: event.detail }));
		dispatch('brandSelect', event.detail);
	}

	function handleBrandClose(): void {
		brandCardState.isOpen = false;
		brandCardState.searchText = '';
	}

	// Model Card Event Handlers
	function handleModelLoad(event: CustomEvent<number>): void {
		const brandId = event.detail;
		modelCardState.loading = true;
		modelCardState.error = false;

		// Load models from your API
		loadModels(brandId)
			.then(models => {
				modelCardState = {
					...modelCardState,
					models,
					loading: false,
					error: false
				};
			})
			.catch(error => {
				console.error('Error loading models:', error);
				modelCardState = {
					...modelCardState,
					loading: false,
					error: true
				};
			});
	}

	function handleModelRetry(event: CustomEvent<number>): void {
		handleModelLoad(event);
	}

	function handleModelSearch(event: CustomEvent<string>): void {
		modelCardState.searchText = event.detail;
	}

	function handleModelSelect(event: CustomEvent<Model>): void {
		console.log('Model selected:', event.detail);
		modelCardState.isOpen = false;
		modelStore.update(store => ({ ...store, selected: event.detail }));
		dispatch('modelSelect', event.detail);
	}

	function handleModelClose(): void {
		modelCardState.isOpen = false;
		modelCardState.searchText = '';
	}

	// Input handlers - these will be passed to the input components
	function handleBrandOpen(): void {
		brandCardState.isOpen = true;
	}

	function handleModelOpen(): void {
		if (selectedBrand) {
			modelCardState.isOpen = true;
		}
	}

	function handleBrandClear(): void {
		brandStore.update(store => ({ ...store, selected: null }));
		modelStore.update(store => ({ ...store, selected: null, list: [] }));
		dispatch('brandClear');
	}

	function handleModelClear(): void {
		modelStore.update(store => ({ ...store, selected: null }));
		dispatch('modelClear');
	}

	// API functions (replace with your actual API calls)
	async function loadBrands(): Promise<Brand[]> {
		// Replace with your actual API call
		const response = await getBrandsList()
		return response.data
	}

	async function loadModels(brandId: number): Promise<Model[]> {
		// Replace with your actual API call
		const response = await getModelsById(brandId);
		return response.data;
	}
</script>

<div
	id="filter_minimal"
	class="w-full max-[750px]:px-[15px] pt-[20px] pb-[20px]
           flex flex-row items-center max-[750px]:flex-col gap-[15px]"
>
	<div class="w-full flex flex-row">
		<BrandInput
			value={selectedBrand?.value || ''}
			onOpen={handleBrandOpen}
			onClear={handleBrandClear}
		/>

		<ModelInput
			value={selectedModel?.value || selectedModel?.model_name || ''}
			disabled={!selectedBrand}
			onOpen={handleModelOpen}
			onClear={handleModelClear}
		/>
	</div>
</div>

<!-- Modal Cards -->
<BrandCard
	isOpen={brandCardState.isOpen}
	brands={brandCardState.brands}
	searchText={brandCardState.searchText}
	loading={brandCardState.loading}
	error={brandCardState.error}
	filteredBrands={brandCardState.filteredBrands}
	on:select={handleBrandSelect}
	on:close={handleBrandClose}
	on:search={handleBrandSearch}
	on:load={handleBrandLoad}
/>

<ModelCard
	isOpen={modelCardState.isOpen}
	models={modelCardState.models}
	searchText={modelCardState.searchText}
	loading={modelCardState.loading}
	error={modelCardState.error}
	filteredModels={modelCardState.filteredModels}
	brandId={modelCardState.brandId}
	on:select={handleModelSelect}
	on:close={handleModelClose}
	on:search={handleModelSearch}
	on:load={handleModelLoad}
	on:retry={handleModelRetry}
/>
