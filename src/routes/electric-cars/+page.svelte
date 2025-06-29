<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import PostCard from '$lib/components/postsList/PostCard.svelte';
	import CarsEmptyState from '$lib/components/postsList/CarsEmptyState.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import SearchFilter from '$lib/components/filters/SearchPage/SearchFilter.svelte';
	import SearchFilterButtons from '$lib/components/filters/SearchPage/SearchFilterButtons.svelte';
	import { carsActions, likedCars } from '../store/posts';
	import Header from './components/Header.svelte';
	import { fetchPostList } from '$lib/api/post/fetchPostList/fetchPostList';
	import { OrderDirection, OrderField, OrderingHelpers } from '$lib/api/post/fetchPostList/orderingHelpers';
	import type { FilterParams } from '$lib/components/filters/types';
	
	// Import filter state objects for direct initialization
	import { searchFilterUtils, searchBrandState } from '$lib/components/filters/SearchPage/searchFilterState.svelte';
	import { yearInputSvelte } from '$lib/components/filters/SearchPage/inputs/yearInput.svelte.js';
	import { priceInputSvelte } from '$lib/components/filters/SearchPage/inputs/priceInput.svelte.js';
	import { rangeInputSvelte } from '$lib/components/filters/SearchPage/inputs/rangeInput.svelte.js';
	import { bodyTypeInputSvelte } from '$lib/components/filters/SearchPage/inputs/bodyTypeInput.svelte.js';
	import { kmInputSvelte } from '$lib/components/filters/SearchPage/inputs/kmInput.svelte.js';
	import { powerInputSvelte } from '$lib/components/filters/SearchPage/inputs/powerInput.svelte.js';
	import { getBodyTypes } from '$lib/components/filters/cards/bodyTypeCard.svelte.js';
	import { getModelsById } from '$lib/api/model/getModelsById';
	import { getBrandsList } from '$lib/api/brand/getBrandsList';

	const { data }: { data: PageData } = $props();

	// Initialize filter state BEFORE component rendering (during SSR and client)
	// This prevents filter inputs from flashing from empty to populated
	initializeFilterStateFromServerData(data);

	// Local state for models (to eliminate shared state bleeding)
	let availableModels = $state(data.availableModels || []);
	let modelsLoading = $state(false);
	let modelsError = $state(false);

	// Local state for brands (to eliminate shared state bleeding)
	let availableBrands = $state(data.availableBrands || []);
	let brandsLoading = $state(false);
	let brandsError = $state(false);

	function initializeFilterStateFromServerData(pageData: typeof data) {
		try {
			// Set brand directly if we have the complete object
			if (pageData.resolvedBrandObject) {
				searchFilterUtils.setBrand(pageData.resolvedBrandObject);
			}

			// Set model directly if we have the complete object
			if (pageData.resolvedModelObject) {
				searchFilterUtils.setModel(pageData.resolvedModelObject);
			}

			// Set other filters from parsed data
			const filters = pageData.allFilters;
			
			if (filters.year) {
				if (filters.year.from) yearInputSvelte.fromYear = parseInt(filters.year.from);
				if (filters.year.to) yearInputSvelte.toYear = parseInt(filters.year.to);
			}

			if (filters.price) {
				if (filters.price.from) priceInputSvelte.fromPrice = parseInt(filters.price.from);
				if (filters.price.to) priceInputSvelte.toPrice = parseInt(filters.price.to);
			}

			if (filters.range) {
				if (filters.range.from) rangeInputSvelte.fromRange = parseInt(filters.range.from);
				if (filters.range.to) rangeInputSvelte.toRange = parseInt(filters.range.to);
			}

			if (filters.km) {
				if (filters.km.from) kmInputSvelte.fromKm = parseInt(filters.km.from);
				if (filters.km.to) kmInputSvelte.toKm = parseInt(filters.km.to);
			}

			if (filters.power) {
				if (filters.power.from) powerInputSvelte.fromPower = parseInt(filters.power.from);
				if (filters.power.to) powerInputSvelte.toPower = parseInt(filters.power.to);
			}

			if (filters.bodyType?.slug) {
				// Find body type by slug and set it
				const bodyType = getBodyTypes().find(bt => bt.value === filters.bodyType?.slug || bt.slug === filters.bodyType?.slug);
				if (bodyType) {
					bodyTypeInputSvelte.selectedBodyType = bodyType;
				}
			}

		} catch (error) {
			console.error('Failed to initialize filter state from server data:', error);
		}
	}

	const pageState = $state({
		currentNavbarTab: 'search',
		isAuthenticated: false,
		createNewPostUrl: '/create-post',
		logInUrl: '/login',
		showMoreFilters: false,
		searchResults: data.searchResults,
		isLoading: false,
		error: null as string | null
	});

	// Bind to SearchFilter component
	let searchFilterComponent: SearchFilter;

	// Current filter state
	let currentFilters: FilterParams = $state({});

	// Debounce utility for search
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	// Filter handlers
	async function handleSearch() {
		if (!searchFilterComponent) return;
		
		pageState.isLoading = true;
		
		try {
			// Clear any previous error
			pageState.error = null;
			
			// Get current filters from SearchFilter component
			const filters = searchFilterComponent.getCurrentFilters();
			
			// Fetch new results
			const results = await fetchPostList({
				filters,
				ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC)
			});
			
			// Update page state - ensure results is always an array
			pageState.searchResults = results || [];
			
		} catch (error) {
			console.error('Search failed:', error);
			// Set empty results and show user-friendly message
			pageState.searchResults = [];
			pageState.error = 'Search failed. Please try again or adjust your filters.';
		} finally {
			pageState.isLoading = false;
		}
	}

	// Debounced search function for automatic filtering
	async function debouncedSearch() {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		
		searchTimeout = setTimeout(async () => {
			await handleSearch();
		}, 300); // 300ms debounce
	}

	// Update URL immediately when filters change (without debounce)
	function updateUrlFromFilters() {
		if (!searchFilterComponent || !browser) return;
		
		try {
			const searchParams = searchFilterComponent.generateUrlSearchParams();
			const newUrl = `/electric-cars${ searchParams.toString() ? '?' + searchParams.toString() : '' }`;
			
			// Update URL immediately without page reload
			goto(newUrl, { replaceState: true, noScroll: true });
		} catch (error) {
			console.error('Failed to update URL:', error);
		}
	}

	// Handle filter changes with immediate URL update and debounced search
	function handleFiltersChange(filters: FilterParams) {
		currentFilters = filters;
		
		// Only proceed with automatic updates if we're in the browser and have the component
		if (!browser || !searchFilterComponent) return;
		
		// Update URL immediately for instant feedback
		updateUrlFromFilters();
		
		// Trigger debounced search for results
		debouncedSearch();
	}

	function handleToggleMoreFilters() {
		pageState.showMoreFilters = !pageState.showMoreFilters;
	}

	// Handle client-side models loading when brand changes
	async function loadModelsForBrand(brandId: number | null): Promise<void> {
		if (!brandId) {
			availableModels = [];
			return;
		}

		modelsLoading = true;
		modelsError = false;

		try {
			const { data: models, error } = await getModelsById(brandId);
			if (models && !error) {
				availableModels = models;
			} else {
				modelsError = true;
				availableModels = [];
			}
		} catch (error) {
			console.error('Error loading models:', error);
			modelsError = true;
			availableModels = [];
		} finally {
			modelsLoading = false;
		}
	}

	// Handle retry for models loading
	function handleModelsRetry(): void {
		const brandId = searchBrandState.selectedBrand?.id;
		if (brandId) {
			loadModelsForBrand(brandId);
		}
	}

	// Handle brands loading (for client-side cases where SSR failed)
	async function loadBrands(): Promise<void> {
		brandsLoading = true;
		brandsError = false;

		try {
			const { data: brands, error } = await getBrandsList();
			if (brands && !error) {
				availableBrands = brands;
			} else {
				brandsError = true;
				availableBrands = [];
			}
		} catch (error) {
			console.error('Error loading brands:', error);
			brandsError = true;
			availableBrands = [];
		} finally {
			brandsLoading = false;
		}
	}

	// Handle retry for brands loading
	function handleBrandsRetry(): void {
		loadBrands();
	}

	// Helper function to enrich cars with like state
	function enrichCarsWithLikeState(cars: typeof data.searchResults) {
		return cars.map(car => ({
			...car,
			isLiked: browser ? carsActions.isLiked(car.id, $likedCars) : false
		}));
	}

	// Derived values using Svelte 5 runes
	const searchResultsWithLikeState = $derived(enrichCarsWithLikeState(pageState.searchResults));

	// Computed values for section visibility
	const hasResults = $derived(searchResultsWithLikeState.length > 0);

	// Build search title based on filters
	const searchTitle = $derived.by(() => {
		const { brand, model } = data.filters;
		if (brand && model) {
			return `${brand} ${model} Electric Cars`;
		} else if (brand) {
			return `${brand} Electric Cars`;
		} else if (model) {
			return `${model} Electric Cars`;
		} else {
			return 'Electric Cars Search';
		}
	});

	// Build H1 title dynamically from current filter state (not just server data)
	const h1Title = $derived.by(() => {
		// Use current filter state for immediate updates, fallback to server data
		const currentBrand = currentFilters.brand?.value || data.filters.brand;
		const currentModel = currentFilters.model?.value || data.filters.model;
		
		if (currentBrand && currentModel) {
			return `${currentBrand} ${currentModel}`;
		} else if (currentBrand) {
			return `${currentBrand} Electric Cars`;
		} else if (currentModel) {
			return `${currentModel} Electric Cars`;
		} else {
			return 'Electric Cars';
		}
	});

	// Watch for brand changes and load models accordingly
	$effect(() => {
		const currentBrandId = searchBrandState.selectedBrand?.id;
		
		// If brand changes and we don't have models for this brand, load them
		// But only if models weren't already pre-loaded from server
		if (currentBrandId && availableModels.length === 0 && !modelsLoading) {
			loadModelsForBrand(currentBrandId);
		} else if (!currentBrandId) {
			// Clear models when no brand is selected
			availableModels = [];
		}
	});

	// Load brands if they weren't pre-loaded from server (fallback)
	$effect(() => {
		if (availableBrands.length === 0 && !brandsLoading && !brandsError) {
			loadBrands();
		}
	});

	// Handle client-side navigation (when user navigates without server data)
	$effect(() => {
		if (searchFilterComponent && browser) {
			// Check if we have URL parameters
			const urlParams = new URLSearchParams(window.location.search);
			const hasUrlParams = Array.from(urlParams.keys()).length > 0;
			
			// Only use URL parsing for client-side navigation when we don't have server data
			const hasServerData = data.resolvedBrandObject || data.resolvedModelObject || Object.keys(data.allFilters).length > 0;
			
			if (!hasServerData) {
				if (hasUrlParams) {
					// Fallback to URL parsing for client-side navigation
					searchFilterComponent.initializeFromUrlParams(urlParams).catch(error => {
						console.error('Failed to initialize filters from URL:', error);
					});
				} else {
					// No URL params and no server data - reset all filters for clean state
					searchFilterComponent.resetAllFilters();
				}
			}
		}
	});
</script>

<svelte:head>
	<title>{searchTitle}</title>
	<meta name="description" content="Search and browse electric vehicles" />
</svelte:head>

<Navbar
	currentNavbarTab={pageState.currentNavbarTab}
	isAuthenticated={pageState.isAuthenticated}
	createNewPostUrl={pageState.createNewPostUrl}
	logInUrl={pageState.logInUrl}
/>

<Header/>

<div class="filter-container">
	<SearchFilter 
		bind:this={searchFilterComponent}
		showMoreFilters={pageState.showMoreFilters} 
		onFiltersChange={handleFiltersChange}
		availableModels={availableModels}
		modelsLoading={modelsLoading}
		modelsError={modelsError}
		onModelsRetry={handleModelsRetry}
		availableBrands={availableBrands}
		brandsLoading={brandsLoading}
		brandsError={brandsError}
		onBrandsRetry={handleBrandsRetry}
	/>
	<SearchFilterButtons 
		onSearch={handleSearch}
		onToggleMoreFilters={handleToggleMoreFilters}
		showMoreFilters={pageState.showMoreFilters}
	/>
</div>

<div class="container">
	<main class="content">
		<section class="section">
			<h1 class="page-title">{h1Title}</h1>
			
			{#if !pageState.isLoading}
				<div class="filter-summary">
					<p class="text-[17px] text-zinc-600 dark:text-zinc-400">
						{searchResultsWithLikeState.length} {searchResultsWithLikeState.length === 1 ? 'result' : 'results'}
					</p>
				</div>
			{/if}

			{#if pageState.error}
				<div class="error-message">
					<p class="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
						⚠️ {pageState.error}
					</p>
				</div>
			{/if}

			{#if data.filterErrors && data.filterErrors.length > 0}
				<div class="error-message">
					<div class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
						<p><strong>⚠️ Filter Warning:</strong></p>
						<ul class="list-disc list-inside mt-2">
							{#each data.filterErrors as error}
								<li>{error}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			<!-- Loading spinner for loading state -->
			{#if pageState.isLoading}
				<div class="loading-state">
					<div class="flex items-center justify-center" style="padding-top: 50px; min-height: 200px;">
						<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					</div>
				</div>
			{:else if hasResults}
				<div class="cars-grid">
					{#each searchResultsWithLikeState as car (car.id)}
						<PostCard {car} />
					{/each}
				</div>
			{:else}
				<CarsEmptyState
					title="No cars found"
					description="Try adjusting your search filters or browse all available cars."
				/>
			{/if}
		</section>
	</main>
</div>

<style>
    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 2rem 15px;
    }

    .filter-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 15px 2rem;
    }

    @media (max-width: 750px) {
        .container,
        .filter-container {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .section {
        margin-bottom: 3rem;
    }

    .page-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 10px;
        color: inherit;
    }

    .filter-summary,
    .error-message {
        margin-bottom: 25px;
    }

    @media (max-width: 750px) {
        .page-title,
        .filter-summary,
        .error-message {
            padding-left: 15px;
            padding-right: 15px;
        }
        
        .page-title {
            font-size: 28px;
        }
    }

    .cars-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5625rem; /* 25px */
    }

    @media (max-width: 750px) {
        .cars-grid {
            gap: 2.5rem; /* 40px */
        }
    }
</style>