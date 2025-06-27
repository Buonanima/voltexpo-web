<!-- components/BrandInput.svelte -->
<script lang="ts">
	import { filterState } from '../filterState.svelte';
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const { value = '', disabled = false, onOpen, onClear, onChange } = $props<{
		value?: string;
		disabled?: boolean;
		onOpen?: () => void;
		onClear?: () => void;
		onChange?: (value: string | null) => void;
	}>();

	// Derived values using runes
	const displayValue = $derived(filterState.selectedBrand?.brand_name || value);
	const showCross = $derived(!!displayValue && !disabled);

	// Event handlers
	function handleOpenBrandCard(): void {
		if (disabled) return;
		onOpen?.();
	}

	function handleClearBrand(event: Event): void {
		if (disabled) return;

		event.stopPropagation();
		onClear?.();
		onChange?.(null);
	}

	function handleClearKeydown(event: KeyboardEvent): void {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClearBrand(event);
		}
	}
</script>

<div
	id="filter_minimal_input_container_brand"
	class="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-l-[16px] w-full flex
		cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500
		transition-colors duration-200"
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-haspopup="dialog"
	aria-disabled={disabled}
	onclick={handleOpenBrandCard}
	onkeydown={()=>{}}
>
	<div class="flex-1 pl-[15px] pr-[10px] py-[8px]">
		<label
			for="filter_minimal_input_brand"
			class="block text-[15px] max-[750px]:text-[14px] text-zinc-600 dark:text-zinc-300
				{disabled ? 'cursor-not-allowed' : 'cursor-pointer'}"
		>
			Brand
		</label>

		<input
			readonly
			type="text"
			id="filter_minimal_input_brand"
			value={displayValue}
			{disabled}
			placeholder="Select"
			class="w-full bg-transparent text-[15px] max-[750px]:text-[14px] text-zinc-800 dark:text-white
				placeholder:text-zinc-400 outline-none
				{disabled ? 'cursor-not-allowed' : 'cursor-pointer'}"
			aria-describedby={showCross ? 'filter_minimal_input_brand_clear_hint' : undefined}
		/>
	</div>

	{#if showCross}
		<!-- Screen reader hint -->
		<div id="filter_minimal_input_brand_clear_hint" class="sr-only">
			Press Escape or click the clear button to remove the selected brand
		</div>

		<button
			type="button"
			id="filter_minimal_input_brand_cross"
			class="px-[10px] w-[35px] flex items-center justify-center hover:bg-red-300/50
				focus:bg-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-inset
				cursor-pointer transition-colors duration-200
				{disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent focus:ring-0' : ''}"
			{disabled}
			onclick={handleClearBrand}
			onkeydown={handleClearKeydown}
			aria-label="Clear selected brand"
			title="Clear selected brand"
		>
			<CrossIcon />
		</button>
	{/if}
</div>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>
