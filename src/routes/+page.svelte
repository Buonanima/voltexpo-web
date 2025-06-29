<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import PostCard from '$lib/components/postsList/PostCard.svelte';

	// Page-specific components
	import CarsEmptyState from '$lib/components/postsList/CarsEmptyState.svelte';
	import HomepageHeading from './components/HomepageHeading.svelte';
	import FireIcon from '$lib/components/shared/icons/FireIcon.svelte';
	import ClockIcon from '$lib/components/shared/icons/ClockIcon.svelte';
	import FilterHome from '$lib/components/filters/FilterHome/FilterHome.svelte';
	import HomepageFilterButtons from '$lib/components/filters/FilterHome/HomepageFilterButtons.svelte';
	import { carsActions, likedCars } from './store/posts';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { getModelsById } from '$lib/api/model/getModelsById';
	import { getBrandsList } from '$lib/api/brand/getBrandsList';
	import { homeBrandState, homeModelState } from '$lib/components/filters/FilterHome/homeFilterState.svelte';

	const { data }: { data: PageData } = $props();

	// Local state for brands and models (eliminate global state bleeding)
	let availableBrands = $state(data.availableBrands || []);
	let availableModels = $state<any[]>([]);
	let modelsLoading = $state(false);
	let modelsError = $state(false);
	let brandsLoading = $state(false);
	let brandsError = $state(false);

	const pageState = $state({
		currentNavbarTab: 'home',
		isAuthenticated: false,
		createNewPostUrl: '/create-post',
		logInUrl: '/login'
	});

	// Helper function to enrich cars with like state
	function enrichCarsWithLikeState(cars: typeof data.popularCars) {
		return cars.map((car) => ({
			...car,
			isLiked: browser ? carsActions.isLiked(car.id, $likedCars) : false
		}));
	}

	// Derived values using Svelte 5 runes
	const popularCarsWithLikeState = $derived(enrichCarsWithLikeState(data.popularCars));
	const recentCarsWithLikeState = $derived(enrichCarsWithLikeState(data.recentCars));
	const allCarsWithLikeState = $derived(enrichCarsWithLikeState(data.allCars));

	// Computed values for section visibility
	const hasPopularCars = $derived(popularCarsWithLikeState.length > 0);
	const hasRecentCars = $derived(recentCarsWithLikeState.length > 0);
	const hasAllCars = $derived(allCarsWithLikeState.length > 0);

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

	// Handle brands loading (for fallback cases where SSR failed)
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

	// Handle retry for models loading
	function handleModelsRetry(): void {
		// Get the currently selected brand from home filter state
		const brandId = homeBrandState.selectedBrand?.id;
		if (brandId) {
			loadModelsForBrand(brandId);
		}
	}

	// Handle retry for brands loading
	function handleBrandsRetry(): void {
		loadBrands();
	}

	// Load brands if they weren't pre-loaded from server (fallback)
	$effect(() => {
		if (availableBrands.length === 0 && !brandsLoading && !brandsError) {
			loadBrands();
		}
	});

	// Reactive effect to automatically manage model state when brand changes
	// (Moved from homeFilterState.svelte.ts because $effect can only be used inside a component context)
	$effect(() => {
		// Automatically disable model selection when no brand is selected
		homeModelState.disabled = !homeBrandState.selectedBrand;

		// Auto-clear model when brand is cleared (but not when brand is set)
		if (!homeBrandState.selectedBrand && homeModelState.selectedModel) {
			homeModelState.selectedModel = null;
		}
	});
</script>

<svelte:head>
	<title>Electric Cars Feed</title>
	<meta name="description" content="Browse our latest selection of electric vehicles" />
</svelte:head>

<Navbar
	currentNavbarTab={pageState.currentNavbarTab}
	isAuthenticated={pageState.isAuthenticated}
	createNewPostUrl={pageState.createNewPostUrl}
	logInUrl={pageState.logInUrl}
/>

<header>
	<HomepageHeading />
</header>

<div class="filter-container">
	<FilterHome
		{availableBrands}
		{availableModels}
		{modelsLoading}
		{modelsError}
		{brandsLoading}
		{brandsError}
		onLoadModels={loadModelsForBrand}
		onBrandsRetry={handleBrandsRetry}
		onModelsRetry={handleModelsRetry}
	/>
	<HomepageFilterButtons />
</div>

<div class="container">
	<main class="content">
		{#if hasPopularCars || hasRecentCars || hasAllCars}
			{#if hasPopularCars}
				<section class="section">
					<div class="section-title flex flex-row items-center gap-[12px]">
						<FireIcon />
						<h2>Popular</h2>
					</div>
					<div class="cars-grid">
						{#each popularCarsWithLikeState as car (car.id)}
							<PostCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			{#if hasRecentCars}
				<section class="section">
					<div class="section-title flex flex-row items-center gap-[12px]">
						<ClockIcon />
						<h2>Recent</h2>
					</div>
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
