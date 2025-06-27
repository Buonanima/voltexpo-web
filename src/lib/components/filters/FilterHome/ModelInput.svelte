<!-- components/ModelInput.svelte -->
<script lang="ts">
	import { filterState } from '../filterState.svelte';
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const { value = '', disabled = false, label = 'Model', onOpen, onClear, onChange } = $props<{
		value?: string;
		disabled?: boolean;
		label?: string;
		onOpen?: () => void;
		onClear?: () => void;
		onChange?: (value: string | null) => void;
	}>();

	// Constants
	const ENABLED_PLACEHOLDER = 'Select';
	const DISABLED_PLACEHOLDER = 'Select brand first';

	// Derived values using runes
	const displayValue = $derived(filterState.selectedModel?.model_name || filterState.selectedModel?.value || value);
	const showCross = $derived(!!displayValue && !disabled);
	const placeholder = $derived(disabled ? DISABLED_PLACEHOLDER : ENABLED_PLACEHOLDER);

	// Event handlers
	function handleOpenModelCard(): void {
		if (!disabled) {
			onOpen?.();
		}
	}

	function handleClearModel(event: Event): void {
		if (disabled) return;

		event.stopPropagation();
		onClear?.();
		onChange?.(null);
	}

	function handleInputKeydown(event: KeyboardEvent): void {
		if (disabled) return;

		// Prevent default input behavior but allow container to handle it
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
		}
	}

	function handleClearKeydown(event: KeyboardEvent): void {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClearModel(event);
		}
	}

	// Container click handler with better event handling
	function handleContainerClick(event: MouseEvent): void {
		// Only handle clicks on the container itself, not on child elements
		const target = event.target as HTMLElement;
		if (target.closest('button')) return;

		handleOpenModelCard();
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
	onclick={handleContainerClick}
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
			onclick={handleOpenModelCard}
			onkeydown={handleInputKeydown}
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
			onkeydown={handleClearKeydown}
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
