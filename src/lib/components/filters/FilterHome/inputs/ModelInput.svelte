<script lang="ts">
	import { modelInputSvelte } from './modelInput.svelte.js';
	import { brandInputSvelte } from './brandInput.svelte.js';
	import { searchModelInputSvelte } from '../../SearchPage/inputs/modelInput.svelte';
	import { searchBrandInputSvelte } from '../../SearchPage/inputs/brandInput.svelte';
	import { modelCardState } from '../../cards/modelCard.svelte.js';
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const { value, disabled = false, label = 'Model', variant = 'home', onClear, onChange, onClick } = $props<{
		value?: string;
		disabled?: boolean;
		label?: string;
		variant?: 'home' | 'search';
		onClear?: () => void;
		onChange?: (value: string | null) => void;
		onClick?: () => void;
	}>();

	// Constants
	const ENABLED_PLACEHOLDER = 'Select';
	const DISABLED_PLACEHOLDER = 'Select brand first';

	// DERIVED VALUES
	const displayValue = $derived(
		variant === 'search'
			? searchModelInputSvelte.selectedModel?.model_name || value
			: modelInputSvelte.selectedModel?.model_name || value
	);
	const showCross = $derived(!!displayValue && !disabled);
	const placeholder = $derived(disabled ? DISABLED_PLACEHOLDER : ENABLED_PLACEHOLDER);

	// HANDLERS
	function handleClearModel(event: Event): void {
		event.stopPropagation();
		onClear?.();
		onChange?.(null);
	}

	function handleInputClick(): void {
		if (disabled) return;
		
		if (onClick) {
			// Search page: use the provided onClick handler
			onClick();
		} else {
			// Home page: check if brand is selected before opening model card
			const selectedBrand = variant === 'search' 
				? searchBrandInputSvelte.selectedBrand 
				: brandInputSvelte.selectedBrand;
			
			if (selectedBrand?.id) {
				modelCardState.isOpen = true;
			}
		}
	}

</script>

<div
	id="filter_minimal_input_container_model"
	class="{variant === 'home'
		? 'w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-r-[16px]'
		: 'flex flex-row flex-nowrap border-[1px] border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 z-0 hover:z-[1] mr-[-1px] mb-[-1px] transition-[border-color] duration-150 overflow-hidden hover:cursor-pointer max-[750px]:rounded-tr-[20px]'}
	flex overflow-hidden transition-colors duration-200 cursor-pointer"
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-label="Click to select a model"
	aria-expanded="false"
	aria-haspopup="dialog"
	onclick={handleInputClick}
	onkeydown={()=>{}}
>
	<div class="flex-1 pl-[15px] pr-[10px] py-[8px]">
		<label
			for="filter_minimal_input_model"
			class="{variant === 'home' 
				? 'block text-[15px] max-[750px]:text-[14px]' 
				: 'block text-[15px] max-[750px]:text-[14px] text-zinc-800 dark:text-white hover:cursor-pointer'}
				{disabled ? 'text-zinc-300 dark:text-zinc-600' : variant === 'home' ? 'text-zinc-500 dark:text-zinc-400' : ''}"
		>
			{label}
		</label>

		<input
			readonly
			type="text"
			id="filter_minimal_input_model"
			value={displayValue}
			{disabled}
			{placeholder}
			class="w-full bg-transparent text-[15px] max-[750px]:text-[14px] text-zinc-800 dark:text-white placeholder:text-zinc-400 outline-none"
			aria-describedby={showCross ? 'filter_minimal_input_model_clear_hint' : undefined}
			aria-readonly="true"
		/>
	</div>

	{#if showCross}
		<!-- Screen reader hint -->
		<div id="filter_minimal_input_model_clear_hint" class="sr-only">
			Press Escape or click the clear button to remove the selected model
		</div>

		<button
			type="button"
			id="filter_minimal_input_model_cross"
			class="px-[10px] w-[35px] flex items-center justify-center hover:bg-red-300/50
						focus:bg-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-inset
						cursor-pointer transition-colors duration-200"
			onclick={handleClearModel}
			aria-label="Clear selected model"
			title="Clear selected model"
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
