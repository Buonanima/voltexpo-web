<script lang="ts">
  import { browser } from '$app/environment';
  import { invalidateAll } from '$app/navigation';
  import { carsActions, likedCars } from '$lib/stores/posts';
  import type { PageData } from './$types';
  import PostCard from '$lib/components/PostCard.svelte';

  export let data: PageData;

  // Add isLiked property to cars based on client state
  $: carsWithLikeState = data.cars.map(car => ({
    ...car,
    isLiked: browser ? carsActions.isLiked(car.id, $likedCars) : false
  }));

  let isRefreshing = false;

  async function refreshCars() {
    if (isRefreshing) return;

    isRefreshing = true;
    try {
      // Force a reload to get new random cars
      await invalidateAll();
    } finally {
      isRefreshing = false;
    }
  }
</script>

<svelte:head>
  <title>Electric Cars Feed</title>
  <meta name="description" content="Browse our latest selection of electric vehicles" />
</svelte:head>

<div class="max-w-[1200px] mx-auto px-4 py-8">
  <header class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <h1 class="m-0 text-slate-800 dark:text-gray-200 text-3xl font-bold">Latest Electric Cars</h1>
    <button
      class="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white border-none px-6 py-3 rounded-md cursor-pointer font-medium transition-all duration-200 relative {isRefreshing ? 'pl-10' : ''}"
      class:animate-pulse={isRefreshing}
      on:click={refreshCars}
      disabled={isRefreshing}
    >
      {#if isRefreshing}
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      {/if}
      {isRefreshing ? 'Loading...' : 'Get New Cars'}
    </button>
  </header>

  {#if carsWithLikeState.length > 0}
    <div class="w-full flex flex-col gap-[25px] max-[750px]:gap-[40px]">
      {#each carsWithLikeState as car (car.id)}
        <PostCard {car} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 px-4 text-slate-500">
      <h2 class="text-red-600 dark:text-red-400 mb-4 text-2xl font-semibold">No cars available</h2>
      <p class="mb-8">Unable to load cars at the moment. Please try refreshing the page.</p>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white border-none px-6 py-3 rounded-md cursor-pointer font-medium transition-all duration-200"
        on:click={refreshCars}
      >
        Try Again
      </button>
    </div>
  {/if}
</div>
