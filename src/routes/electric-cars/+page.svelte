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
	import type { FilterParams } from '$lib/api/post/fetchPostList/types';

	const { data }: { data: PageData } = $props();

	const pageState = $state({
		currentNavbarTab: 'search',
		isAuthenticated: false,
		createNewPostUrl: '/create-post',
		logInUrl: '/login',
		showMoreFilters: false,
		searchResults: data.searchResults,
		isLoading: false
	});

	// Bind to SearchFilter component
	let searchFilterComponent: SearchFilter;

	// Current filter state
	let currentFilters: FilterParams = $state({});

	// Filter handlers
	async function handleSearch() {
		if (!searchFilterComponent) return;
		
		pageState.isLoading = true;
		
		try {
			// Get current filters from SearchFilter component
			const filters = searchFilterComponent.getCurrentFilters();
			
			// Fetch new results
			const results = await fetchPostList({
				filters,
				ordering: OrderingHelpers.byFieldAndDirection(OrderField.TIME_POSTED, OrderDirection.DESC)
			});
			
			// Update page state - ensure results is always an array
			pageState.searchResults = results || [];
			
			// Generate URL search params and navigate
			const searchParams = searchFilterComponent.generateUrlSearchParams();
			const newUrl = `/electric-cars${ searchParams.toString() ? '?' + searchParams.toString() : '' }`;
			
			// Update URL without full page reload
			await goto(newUrl, { replaceState: false, noScroll: true });
			
		} catch (error) {
			console.error('Search failed:', error);
			// You might want to show an error message to the user
		} finally {
			pageState.isLoading = false;
		}
	}

	// Handle filter changes (optional - for real-time updates)
	function handleFiltersChange(filters: FilterParams) {
		currentFilters = filters;
		// Could implement auto-search here if desired
	}

	function handleToggleMoreFilters() {
		pageState.showMoreFilters = !pageState.showMoreFilters;
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

	// Initialize filters from URL on mount
	if (browser) {
		// This will run after component mounts
		$effect(() => {
			if (searchFilterComponent) {
				const urlParams = new URLSearchParams(window.location.search);
				searchFilterComponent.initializeFromUrlParams(urlParams);
			}
		});
	} else {
		// For SSR, we can use the data from the server
		$effect(() => {
			if (searchFilterComponent && data.allFilters) {
				// Convert server filters back to URL params for initialization
				const params = new URLSearchParams();
				const filters = data.allFilters;
				
				if (filters.brand?.slug) params.set('brand', filters.brand.slug);
				if (filters.model?.slug) params.set('model', filters.model.slug);
				if (filters.year?.from) params.set('yearFrom', filters.year.from);
				if (filters.year?.to) params.set('yearTo', filters.year.to);
				if (filters.price?.from) params.set('priceFrom', filters.price.from);
				if (filters.price?.to) params.set('priceTo', filters.price.to);
				if (filters.range?.from) params.set('rangeFrom', filters.range.from);
				if (filters.range?.to) params.set('rangeTo', filters.range.to);
				if (filters.km?.from) params.set('kmFrom', filters.km.from);
				if (filters.km?.to) params.set('kmTo', filters.km.to);
				if (filters.power?.from) params.set('powerFrom', filters.power.from);
				if (filters.power?.to) params.set('powerTo', filters.power.to);
				if (filters.bodyType?.slug) params.set('bodyType', filters.bodyType.slug);
				
				searchFilterComponent.initializeFromUrlParams(params);
			}
		});
	}
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
			<h1 class="page-title">{searchTitle}</h1>
			
			{#if data.filters.brand || data.filters.model}
				<div class="filter-summary">
					<p class="text-zinc-600 dark:text-zinc-400">
						{#if data.filters.brand && data.filters.model}
							Showing results for <strong>{data.filters.brand} {data.filters.model}</strong>
						{:else if data.filters.brand}
							Showing results for <strong>{data.filters.brand}</strong>
						{:else if data.filters.model}
							Showing results for <strong>{data.filters.model}</strong>
						{/if}
					</p>
				</div>
			{/if}

			{#if hasResults}
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

    .filter-summary {
        margin-bottom: 25px;
    }

    @media (max-width: 750px) {
        .page-title,
        .filter-summary {
            padding-left: 15px;
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