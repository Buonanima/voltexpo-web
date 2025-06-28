<!-- components/BrandCard.svelte -->
<script lang="ts">
	import type { Brand } from '../types';
	import {
		brandCardSvelte,
		loadBrands,
		getFilteredBrands
	} from './brandCard.svelte.js';

	// Props with callback functions
	const { 
		isOpen = false,
		onSelect,
		onClose,
	} = $props<{
		isOpen?: boolean;
		brandId?: number | null;
		onSelect: (brand: Brand) => void;
		onClose: () => void;
	}>();

	function closeBrandCard(): void {
		onClose();
	}

	function selectBrand(brand: Brand): void {
		onSelect(brand);
	}

	function handleSearchInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		brandCardSvelte.searchText = target.value;
	}

	function handleBackdropClick(event: MouseEvent | TouchEvent): void {
		if (event.target === event.currentTarget) {
			closeBrandCard();
		}
	}

	async function handleRetry(): Promise<void> {
		await loadBrands();
	}

	// Brands are now loaded automatically when the module is imported
	// No need to wait for the card to open

</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="brand_card_container"
		class="fixed top-0 left-0 z-10 h-full w-full flex justify-center items-center
               bg-zinc-500/20 dark:bg-zinc-700/30"
		onclick={handleBackdropClick}
		onmousedown={handleBackdropClick}
		ontouchstart={handleBackdropClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="brand_card"
			class="w-[500px] max-[550px]:w-full max-[750px]:mx-[20px]
                   pt-[15px] rounded-[15px] overflow-hidden
                   shadow-[0_5px_30px_rgb(0,0,0,0.15)]
                   backdrop-blur-[25px]
                   bg-white/70 dark:bg-zinc-950/70"
			onclick={(e) => e.stopPropagation()}
			onmousedown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			<label
				for="brand_card_input"
				class="block w-full pl-[30px] pb-[5px]
                       font-medium text-[20px]
                       text-zinc-800 dark:text-white"
			>
				Brand
			</label>

			<div>
				<input
					id="brand_card_input"
					placeholder="Search..."
					value={brandCardSvelte.searchText}
					oninput={handleSearchInput}
					class="w-[calc(100%-30px)] mx-[15px] mb-[15px] px-[15px] h-[40px]
                           ring-0 focus:ring-0 rounded-[10px]
                           bg-white dark:bg-transparent
                           font-medium text-gray-600 dark:text-white outline-none
                           border-[1.5px] border-zinc-300 dark:border-zinc-500
                           transition-all duration-200
                           focus:border-brand-blue_light dark:focus:border-brand-blue_light
                           placeholder-zinc-500 dark:placeholder-zinc-400 focus:placeholder-transparent
                           hover:border-brand-blue_light dark:hover:border-brand-blue_light"
				/>
			</div>

			<div class="h-[400px] mr-[15px] ml-[20px] mb-[20px]
                        overscroll-contain overflow-y-scroll scrollbar-thin
                        scrollbar-thumb-brand-blue_light/60 scrollbar-thumb-rounded-full
                        scrollbar-track-transparent scrollbar-track-rounded-full">
				<ul
					id="brand_card_list"
					class="card_list mr-[10px] text-gray-600"
				>
					{#if brandCardSvelte.loading}
						<li class="p-4 text-center text-gray-600 dark:text-gray-300">Loading...</li>
					{:else if brandCardSvelte.error}
						<li class="p-4 text-center">
							<div class="text-red-500 mb-2">Error loading brands</div>
							<button
								onclick={handleRetry}
								class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600
								       transition-colors duration-150 focus:outline-none focus:ring-2
								       focus:ring-blue-300"
							>
								Retry
							</button>
						</li>
					{:else if getFilteredBrands().length === 0 && brandCardSvelte.brands.length > 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">No brands found</li>
					{:else if getFilteredBrands().length === 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">No brands available</li>
					{:else}
						{#each getFilteredBrands() as brand (brand.id)}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded
                                       text-gray-700 dark:text-gray-200 transition-colors duration-150"
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
