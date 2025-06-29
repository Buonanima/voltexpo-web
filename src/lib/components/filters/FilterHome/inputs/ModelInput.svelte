<script lang="ts">
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const {
		value,
		disabled = false,
		label = 'Model',
		variant = 'home',
		onClear,
		onChange,
		onClick
	} = $props<{
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
	const displayValue = $derived(value || '');
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
			// Both home and search page now use the provided onClick handler
			onClick();
		}
	}
</script>

<div
	id="filter_minimal_input_container_model"
	class="{variant === 'home'
		? 'w-full rounded-r-[16px] border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800'
		: 'z-0 mb-[-1px] mr-[-1px] flex flex-row flex-nowrap overflow-hidden border-[1px] border-zinc-200 transition-[border-color] duration-150 hover:z-[1] hover:cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-900 max-[750px]:rounded-tr-[20px]'}
	flex cursor-pointer overflow-hidden transition-colors duration-200"
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-label="Click to select a model"
	aria-expanded="false"
	aria-haspopup="dialog"
	onclick={handleInputClick}
	onkeydown={() => {}}
>
	<div class="flex-1 py-[8px] pl-[15px] pr-[10px]">
		<label
			for="filter_minimal_input_model"
			class="{variant === 'home'
				? 'block text-[15px] max-[750px]:text-[14px]'
				: 'block text-[15px] text-zinc-800 hover:cursor-pointer dark:text-white max-[750px]:text-[14px]'}
				{disabled
				? 'text-zinc-300 dark:text-zinc-600'
				: variant === 'home'
					? 'text-zinc-500 dark:text-zinc-400'
					: ''}"
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
			class="w-full bg-transparent text-[15px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-white max-[750px]:text-[14px]"
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
			class="flex w-[35px] cursor-pointer items-center justify-center px-[10px]
						transition-colors duration-200 hover:bg-red-300/50 focus:bg-red-300/50 focus:outline-none
						focus:ring-2 focus:ring-inset focus:ring-red-400"
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
