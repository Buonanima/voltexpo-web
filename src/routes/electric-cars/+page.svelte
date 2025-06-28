<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import PostCard from '$lib/components/postsList/PostCard.svelte';
	import CarsEmptyState from '$lib/components/postsList/CarsEmptyState.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import SearchFilter from '$lib/components/filters/SearchPage/SearchFilter.svelte';
	import SearchFilterButtons from '$lib/components/filters/SearchPage/SearchFilterButtons.svelte';
	import { carsActions, likedCars } from '../store/posts';
	import Header from './components/Header.svelte';

	const { data }: { data: PageData } = $props();

	const pageState = $state({
		currentNavbarTab: 'search',
		isAuthenticated: false,
		createNewPostUrl: '/create-post',
		logInUrl: '/login',
		showMoreFilters: false
	});

	// Filter handlers
	function handleSearch() {
		// TODO: Implement search functionality
		console.log('Search clicked');
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
	const searchResultsWithLikeState = $derived(enrichCarsWithLikeState(data.searchResults));

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
	<SearchFilter showMoreFilters={pageState.showMoreFilters} />
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