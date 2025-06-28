<!-- components/filters/SearchPage/BodyTypeInput.svelte -->
<script lang="ts">
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';
	import { bodyTypeInputSvelte } from './bodyTypeInput.svelte.js';

	// Props
	const { disabled = false, onOpen, onClear, onChange } = $props<{
		disabled?: boolean;
		onOpen?: () => void;
		onClear?: () => void;
		onChange?: (value: string | null) => void;
	}>();


	// Derived values using runes
	const displayValue = $derived(bodyTypeInputSvelte.displayValue);
	const showCross = $derived(!!displayValue && !disabled);

	// Event handlers
	function handleOpenBodyTypeCard(): void {
		if (disabled) return;
		onOpen?.();
	}


	function handleClearBodyType(event: Event): void {
		if (disabled) return;

		event.stopPropagation();
		bodyTypeInputSvelte.selectedBodyType = null;
		onClear?.();
		onChange?.(null);
	}

	function handleClearKeydown(event: KeyboardEvent): void {
		if (disabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClearBodyType(event);
		}
	}
</script>

<div
	id="filter_minimal_input_container_body_type"
	class="flex flex-row flex-nowrap border border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 z-0 hover:z-[1] overflow-hidden hover:cursor-pointer mr-[-1px] mb-[-1px] rounded-br-[20px] cursor-pointer transition-[border-color] duration-150"
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-haspopup="dialog"
	aria-disabled={disabled}
	onclick={handleOpenBodyTypeCard}
	onkeydown={()=>{}}
>
	<div class="w-full pl-[15px] pr-[10px] py-[8px] flex flex-col">
		<label
			for="filter_minimal_input_body_type"
			class="block text-[15px] max-[750px]:text-[14px] text-zinc-800 dark:text-white hover:cursor-pointer {disabled ? 'cursor-not-allowed' : 'cursor-pointer'}"
		>
			Body Type
		</label>

		<div class="flex flex-row">
			<input
				readonly
				type="text"
				name="body_type"
				id="filter_minimal_input_body_type"
				value={displayValue}
				{disabled}
				class="block w-full p-0 border-0 bg-transparent
					ring-0 focus:ring-0
					text-[15px] max-[750px]:text-[14px]
					text-zinc-800 dark:text-white
					placeholder:text-zinc-400 outline-none hover:cursor-pointer
					{disabled ? 'cursor-not-allowed' : 'cursor-pointer'}"
				placeholder="Select"
				aria-describedby={showCross ? 'filter_minimal_input_body_type_clear_hint' : undefined}
			/>
		</div>
	</div>

	{#if showCross}
		<!-- Screen reader hint -->
		<div id="filter_minimal_input_body_type_clear_hint" class="sr-only">
			Press Escape or click the clear button to remove the selected body type
		</div>

		<button
			type="button"
			id="filter_minimal_input_body_type_cross"
			class="px-[10px] flex justify-center items-center hover:bg-red-300/50
				focus:bg-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-inset
				cursor-pointer transition-colors duration-200 rounded-br-[20px]
				{disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent focus:ring-0' : ''}"
			{disabled}
			onclick={handleClearBodyType}
			onkeydown={handleClearKeydown}
			aria-label="Clear selected body type"
			title="Clear selected body type"
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