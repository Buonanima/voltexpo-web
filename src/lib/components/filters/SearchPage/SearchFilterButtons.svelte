<!-- components/filters/SearchPage/SearchFilterButtons.svelte -->
<script lang="ts">
	import ChevronDown from '$lib/components/shared/icons/ChevronDown.svelte';

	// Props
	const {
		onSearch,
		onToggleMoreFilters,
		showMoreFilters = false
	} = $props<{
		onSearch?: () => void;
		onToggleMoreFilters?: () => void;
		showMoreFilters?: boolean;
	}>();

	function handleSearch() {
		onSearch?.();
	}

	function handleToggleMoreFilters() {
		onToggleMoreFilters?.();
	}
</script>

<div class="w-full pb-[15px] max-[750px]:px-[15px]">
	<div
		class="flex grid
              grid-cols-3 flex-row
              rounded-[15px]
              max-[750px]:grid-cols-2"
	>
		<button onclick={handleToggleMoreFilters}>
			<div
				id="more_filters_button"
				class="
             mr-[-1px] flex h-[44px]
             w-full items-center justify-center gap-[15px]
             rounded-full bg-zinc-100
             text-[15px] text-zinc-800
             transition-all duration-150
             hover:cursor-pointer hover:bg-zinc-200
             hover:text-zinc-900 dark:bg-zinc-900
             dark:text-zinc-100 dark:hover:bg-zinc-850
             dark:hover:text-white
             max-[750px]:rounded-r-none
             max-[750px]:text-[14px]"
			>
				<span id="more_filters_button_text"
					>{showMoreFilters ? 'Less filters' : 'More filters'}</span
				>
				<div class="{showMoreFilters ? 'rotate-180' : ''} transition-all duration-300">
					<ChevronDown />
				</div>
			</div>
		</button>

		<div class="w-full max-[750px]:hidden"></div>

		<button onclick={handleSearch}>
			<div
				id="search_button"
				class="flex
                    h-[44px] cursor-pointer items-center
                    justify-center rounded-full
                    bg-brand-blue_light_2 duration-150
                    hover:bg-brand-blue dark:bg-brand-blue_dark
                    dark:hover:bg-brand-blue max-[750px]:rounded-l-none"
			>
				<div
					id="search_button_text"
					class="text-[16px] font-[500] text-white max-[750px]:text-[15px]"
				>
					Search
				</div>
			</div>
		</button>
	</div>
</div>
