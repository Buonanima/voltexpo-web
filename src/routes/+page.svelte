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

	const { data }: { data: PageData } = $props();

	const pageState = $state({
		currentNavbarTab: 'home',
		isAuthenticated: false,
		createNewPostUrl: '/create-post',
		logInUrl: '/login'
	});

	// Helper function to enrich cars with like state
	function enrichCarsWithLikeState(cars: typeof data.popularCars) {
		return cars.map(car => ({
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
	<HomepageHeading/>
</header>

<div class="filter-container">
	<FilterHome />
	<HomepageFilterButtons />
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
