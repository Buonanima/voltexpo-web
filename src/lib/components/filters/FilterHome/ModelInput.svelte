<script lang="ts">
	import { modelInputSvelte } from './modelInput.svelte';
	import { brandInputSvelte } from './brandInput.svelte';
	import { modelCardState } from '../cards/modelCard.svelte';
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const { disabled = false, label = 'Model', onClear, onChange } = $props<{
		value?: string;
		disabled?: boolean;
		label?: string;
		onClear?: () => void;
		onChange?: (value: string | null) => void;
	}>();

	// Constants
	const ENABLED_PLACEHOLDER = 'Select';
	const DISABLED_PLACEHOLDER = 'Select brand first';

	// DERIVED VALUES
	const displayValue = $derived(modelInputSvelte.selectedModel?.model_name);
	const showCross = $derived(!!displayValue && !disabled);
	const placeholder = $derived(disabled ? DISABLED_PLACEHOLDER : ENABLED_PLACEHOLDER);

	// HANDLERS
	function handleClearModel(event: Event): void {
		event.stopPropagation();
		onClear?.();
		onChange?.(null);
	}

	function handleInputClick(): void {
		if (brandInputSvelte.selectedBrand?.id) {
			modelCardState.isOpen = true;
		}
	}

</script>

<div
	id="filter_minimal_input_container_model"
	class="bg-white ml-[-1px] dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-r-[16px] w-full flex
				 overflow-hidden
				 transition-colors duration-200 cursor-pointer"
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
			class="block text-[15px] max-[750px]:text-[14px] {disabled ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}"
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
