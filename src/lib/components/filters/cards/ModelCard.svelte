<!-- components/ModelCard.svelte -->
<script lang="ts">
	import type { Model } from '../types';

	// Props with callback functions
	const {
		isOpen = false,
		brandId = null,
		models = [],
		loading = false,
		error = false,
		onSelect,
		onClose,
		onRetry
	} = $props<{
		isOpen?: boolean;
		brandId?: number | null;
		models?: Model[];
		loading?: boolean;
		error?: boolean;
		onSelect?: (model: Model) => void;
		onClose?: () => void;
		onRetry?: () => void;
	}>();

	// Local search state
	let searchText = $state('');

	// Filtered models based on search text
	const filteredModels = $derived(
		searchText
			? models.filter((model) => model.model_name.toLowerCase().includes(searchText.toLowerCase()))
			: models
	);

	function closeModelCard(): void {
		onClose?.();
	}

	function selectModel(model: Model): void {
		onSelect?.(model);
	}

	function handleSearchInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		searchText = target.value;
	}

	function handleBackdropClick(event: MouseEvent | TouchEvent): void {
		if (event.target === event.currentTarget) {
			closeModelCard();
		}
	}

	function handleRetry(): void {
		if (onRetry) {
			onRetry();
		}
	}

	function handleModelSelect(model: Model): void {
		selectModel(model);
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
		id="model_card_container"
		class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center
               bg-gray-500/20 dark:bg-gray-700/30"
		onclick={handleBackdropClick}
		onmousedown={handleBackdropClick}
		ontouchstart={handleBackdropClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="model_card"
			class="w-[500px] overflow-hidden rounded-[15px]
                   bg-white/70 pt-[15px] shadow-[0_5px_30px_rgb(0,0,0,0.15)]
                   backdrop-blur-[20px]
                   dark:bg-zinc-950/70
                   max-[750px]:mx-[20px] max-[550px]:w-full"
			onclick={(e) => e.stopPropagation()}
			onmousedown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			<label
				for="model_card_input"
				class="block w-full pb-[5px] pl-[30px]
                       text-[20px] font-medium
                       text-zinc-600 dark:text-zinc-200"
			>
				Model
			</label>

			<input
				id="model_card_input"
				placeholder="Search..."
				value={searchText}
				oninput={handleSearchInput}
				disabled={!brandId}
				class="mx-[15px] mb-[15px] h-[40px] w-[calc(100%-30px)] rounded-[10px]
                       border-[1.5px] border-zinc-300 bg-white
                       px-[15px] font-medium
                       text-gray-600 placeholder-zinc-500 outline-none ring-0
                       transition-all duration-200 hover:border-brand-blue_light
                       focus:border-brand-blue_light focus:placeholder-transparent
                       focus:ring-0 disabled:cursor-not-allowed
                       disabled:opacity-50 dark:border-zinc-500 dark:bg-transparent
                       dark:text-white dark:placeholder-zinc-400
                       dark:hover:border-brand-blue_light dark:focus:border-brand-blue_light"
			/>

			<div
				class="mb-[20px] ml-[20px] mr-[15px] h-[400px]
                        overflow-y-scroll overscroll-contain scrollbar-thin
                        scrollbar-track-transparent scrollbar-thumb-brand-blue_light/60
                        scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
			>
				<ul id="model_card_list" class="card_list mr-[10px] text-gray-600">
					{#if !brandId}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">
							Please select a brand first
						</li>
					{:else if loading}
						<li class="p-4 text-center text-gray-600 dark:text-gray-300">Loading models...</li>
					{:else if error}
						<li class="p-4 text-center">
							<div class="mb-2 text-red-500">Error loading models</div>
							<button
								onclick={handleRetry}
								class="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors
                                       duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2
                                       focus:ring-blue-300"
							>
								Retry
							</button>
						</li>
					{:else if filteredModels.length === 0 && models.length > 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">No Models found</li>
					{:else if filteredModels.length === 0}
						<li class="p-4 text-center text-gray-500 dark:text-gray-400">
							No models available for this brand
						</li>
					{:else}
						{#each filteredModels as model (model.id)}
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
							<li
								class="cursor-pointer rounded p-2 text-gray-700 transition-colors
		       						 duration-150 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-700"
								onclick={() => handleModelSelect(model)}
								data-id={model.id}
								data-slug={model.slug}
								tabindex="0"
								onkeydown={() => {}}
							>
								{model.model_name}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</div>
{/if}
