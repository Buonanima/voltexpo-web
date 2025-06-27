<script lang="ts">
	import { browser } from '$app/environment';
	import { carsActions, likedCars } from '$lib/stores/posts';
	import type { PageData } from './$types';
	import PostCard from '$lib/components/PostCard.svelte';
	import Filter from '$lib/components/filters/FilterHome/Filter.svelte'; // Import the Filter component

	// Page-specific components
	import CarsEmptyState from './components/CarsEmptyState.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import HomepageHeading from './components/HomepageHeading.svelte';
	import FireIcon from '$lib/components/icons/FireIcon.svelte';
	import ClockIcon from '$lib/components/icons/ClockIcon.svelte';
	import type { Brand, Model } from '$lib/components/filters/types';

	// Navbar options
	let currentNavbarTab = 'home';
	let isAuthenticated = false;
	let createNewPostUrl = '/create-post';
	let logInUrl = '/login';

	export let data: PageData;

	// Update these types to match what Filter component emits
	let selectedBrand: Brand | null = null;
	let selectedModel: Model | null = null;

	// Reactive statements - always show all cars regardless of filters
	$: popularCarsWithLikeState = enrichCarsWithLikeState(data.popularCars);
	$: recentCarsWithLikeState = enrichCarsWithLikeState(data.recentCars);
	$: allCarsWithLikeState = enrichCarsWithLikeState(data.allCars);

	// Helper functions
	function enrichCarsWithLikeState(cars: typeof data.popularCars) {
		return cars.map(car => ({
			...car,
			isLiked: browser ? carsActions.isLiked(car.id, $likedCars) : false
		}));
	}

	// Dummy action handlers - no filtering logic
	function handleBrandSelect(event: CustomEvent<Brand>) {
		selectedBrand = event.detail;
		selectedModel = null;
		console.log('Brand selected (dummy action):', event.detail);
		// No car list update - just store the selection
	}

	function handleModelSelect(event: CustomEvent<Model>) {
		selectedModel = event.detail;
		console.log('Model selected (dummy action):', event.detail);
		// No car list update - just store the selection
	}

	function handleBrandClear() {
		selectedBrand = null;
		selectedModel = null;
		console.log('Brand cleared (dummy action)');
		// No car list update - just clear the selection
	}

	function handleModelClear() {
		selectedModel = null;
		console.log('Model cleared (dummy action)');
		// No car list update - just clear the selection
	}

	// Computed values - always show cars regardless of filters
	$: hasPopularCars = popularCarsWithLikeState.length > 0;
	$: hasRecentCars = recentCarsWithLikeState.length > 0;
	$: hasAllCars = allCarsWithLikeState.length > 0;
</script>

<svelte:head>
	<title>Electric Cars Feed</title>
	<meta name="description" content="Browse our latest selection of electric vehicles" />
</svelte:head>

<Navbar
	{currentNavbarTab}
	{isAuthenticated}
	{createNewPostUrl}
	{logInUrl}
/>

<HomepageHeading/>

<!-- Add the Filter component here -->
<div class="filter-container">
	<Filter
		on:brandSelect={handleBrandSelect}
		on:modelSelect={handleModelSelect}
		on:brandClear={handleBrandClear}
		on:modelClear={handleModelClear}
	/>
</div>

<div class="container">
	<main class="content">
		{#if hasPopularCars || hasRecentCars || hasAllCars}
			{#if hasPopularCars}
				<section class="section">
					<div class="flex flex-row items-center section-title gap-[12px]"><FireIcon/><h2>Popular</h2></div>
					<div class="cars-grid">
						{#each popularCarsWithLikeState as car (car.id)}
							<PostCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			{#if hasRecentCars}
				<section class="section">
					<div class="flex flex-row items-center section-title gap-[12px]"><ClockIcon/><h2>Recent</h2></div>
					<div class="cars-grid">
						{#each recentCarsWithLikeState as car (car.id)}
							<PostCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			{#if hasAllCars}
				<section class="section">
					<h2 class="section-title">Discover more</h2>
					<div class="cars-grid">
						{#each allCarsWithLikeState as car (car.id)}
							<PostCard {car} />
						{/each}
					</div>
				</section>
			{/if}
		{:else}
			<CarsEmptyState
				title="No cars available"
				description="Unable to load cars at the moment. Please refresh the page."
			/>
		{/if}
	</main>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 15px;
    }

    .filter-container {
        max-width: 1200px;
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

    .section-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    @media (max-width: 750px) {
        .section-title {
            padding-left: 15px;
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
