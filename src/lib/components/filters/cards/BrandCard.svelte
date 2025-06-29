<!-- components/BrandCard.svelte -->
<script lang="ts">
	import type { Brand } from '../types';

	// Props with callback functions
	const {
		isOpen = false,
		brands = [],
		loading = false,
		error = false,
		onSelect,
		onClose,
		onRetry
	} = $props<{
		isOpen?: boolean;
		brands?: Brand[];
		loading?: boolean;
		error?: boolean;
		onSelect: (brand: Brand) => void;
		onClose: () => void;
		onRetry?: () => void;
	}>();

	// Local search state
	let searchText = $state('');

	// Filtered brands based on search text
	const filteredBrands = $derived(
		searchText
			? brands.filter((brand) => brand.brand_name.toLowerCase().includes(searchText.toLowerCase()))
			: brands
	);

	function closeBrandCard(): void {
		onClose();
	}

	function selectBrand(brand: Brand): void {
		onSelect(brand);
	}

	function handleSearchInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		searchText = target.value;
	}

	function handleBackdropClick(event: MouseEvent | TouchEvent): void {
		if (event.target === event.currentTarget) {
			closeBrandCard();
		}
	}

	function handleRetryClick(): void {
		if (onRetry) {
			onRetry();
		}
	}

	// Reset search when card closes
	$effect(() => {
		if (!isOpen) {
			searchText = '';
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="brand_card_container"
		class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center
               bg-zinc-500/20 dark:bg-zinc-700/30"
		onclick={handleBackdropClick}
		onmousedown={handleBackdropClick}
		ontouchstart={handleBackdropClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="brand_card"
			class="w-[500px] overflow-hidden rounded-[15px]
                   bg-white/70 pt-[15px] shadow-[0_5px_30px_rgb(0,0,0,0.15)]
                   backdrop-blur-[25px]
                   dark:bg-zinc-950/70
                   max-[750px]:mx-[20px] max-[550px]:w-full"
			onclick={(e) => e.stopPropagation()}
			onmousedown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			<label
				for="brand_card_input"
				class="block w-full pb-[5px] pl-[30px]
                       text-[20px] font-medium
                       text-zinc-800 dark:text-white"
			>
				Brand
			</label>

			<div>
				<input
					id="brand_card_input"
					placeholder="Search..."
					value={searchText}
					oninput={handleSearchInput}
					class="mx-[15px] mb-[15px] h-[40px] w-[calc(100%-30px)] rounded-[10px]
                           border-[1.5px] border-zinc-300 bg-white
                           px-[15px] font-medium
                           text-gray-600 placeholder-zinc-500 outline-none ring-0
                           transition-all duration-200 hover:border-brand-blue_light
                           focus:border-brand-blue_light focus:placeholder-transparent
                           focus:ring-0 dark:border-zinc-500
                           dark:bg-transparent dark:text-white dark:placeholder-zinc-400
                           dark:hover:border-brand-blue_light dark:focus:border-brand-blue_light"
				/>
			</div>

			<div
				class="mb-[20px] ml-[20px] mr-[15px] h-[400px]
                        overflow-y-scroll overscroll-contain scrollbar-thin
                        scrollbar-track-transparent scrollbar-thumb-brand-blue_light/60
                        scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
			>
				<ul id="brand_card_list" class="card_list mr-[10px] text-gray-600">
					{#if loading}
						<li class="p-4 text-center text-gray-600 dark:text-gray-300">Loading...</li>
					{:else if error}
						<li class="p-4 text-center">
							<div class="mb-2 text-red-500">Error loading brands</div>
							<button
								onclick={handleRetryClick}
								class="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors
								       duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2
								       focus:ring-blue-300"
							>
								Retry
							</button>
						</li>
					{:else if filteredBrands.length === 0 && brands.length > 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">No brands found</li>
					{:else if filteredBrands.length === 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">No brands available</li>
					{:else}
						{#each filteredBrands as brand (brand.id)}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="cursor-pointer rounded p-2 text-gray-700 transition-colors
                                       duration-150 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								onclick={() => selectBrand(brand)}
								data-id={brand.id}
								data-slug={brand.slug}
							>
								{brand.brand_name}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</div>
{/if}
