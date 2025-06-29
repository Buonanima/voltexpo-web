<!-- components/filters/SearchPage/RangeInput.svelte -->
<script lang="ts">
	import { rangeInputSvelte } from './rangeInput.svelte.ts';

	// Props
	const {
		disabled = false,
		onClear,
		onChange
	} = $props<{
		disabled?: boolean;
		onClear?: () => void;
		onChange?: (from: number | null, to: number | null) => void;
	}>();

	// Derived values using runes
	const fromValue = $derived(rangeInputSvelte.fromRange);
	const toValue = $derived(rangeInputSvelte.toRange);

	// Event handlers
	function handleFromChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		rangeInputSvelte.fromRange = value;
		onChange?.(value, toValue);
	}

	function handleToChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		rangeInputSvelte.toRange = value;
		onChange?.(fromValue, value);
	}

	function handleClear(): void {
		if (disabled) return;
		rangeInputSvelte.fromRange = null;
		rangeInputSvelte.toRange = null;
		onClear?.();
		onChange?.(null, null);
	}
</script>

<div
	id="filter_minimal_input_container_range"
	class="z-0 mb-[-1px] mr-[-1px] flex flex-row flex-nowrap overflow-hidden border border-zinc-200 transition-[border-color] duration-150 hover:z-[1] hover:cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-900 max-[750px]:rounded-bl-[20px]"
>
	<div
		id="filter_minimal_input_container_range_from"
		class="flex w-full flex-col flex-nowrap py-[8px] pl-[15px]"
	>
		<label
			for="filter_minimal_input_range_from"
			class="block text-[15px] text-zinc-800 hover:cursor-pointer dark:text-white max-[750px]:text-[14px]"
		>
			Range <span class="text-[14px] text-zinc-500 dark:text-zinc-400 max-[750px]:text-[13px]"
				>Km</span
			>
		</label>
		<input
			type="number"
			name="range_from"
			id="filter_minimal_input_range_from"
			value={fromValue || ''}
			{disabled}
			class="number-input
				block
				w-full border-0
				border-b-[1px]
				border-transparent bg-transparent p-0 text-[15px]
				text-zinc-800
				outline-none placeholder:text-zinc-400
				hover:cursor-pointer focus:border-brand-blue_light
				focus:ring-0
				dark:text-white
				max-[750px]:text-[14px]"
			placeholder="From"
			oninput={handleFromChange}
		/>
	</div>

	<div
		id="filter_minimal_input_container_range_to"
		class="flex w-full flex-col flex-nowrap py-[8px] pr-[10px]"
	>
		<label for="filter_minimal_input_range_to" class="block text-[14px] text-transparent"
			>Range</label
		>
		<input
			type="number"
			name="range_to"
			id="filter_minimal_input_range_to"
			value={toValue || ''}
			{disabled}
			class="number-input
				block
				w-full border-0
				border-b-[1px]
				border-transparent bg-transparent p-0 text-[15px]
				text-zinc-800
				outline-none placeholder:text-zinc-400
				hover:cursor-pointer focus:border-brand-blue_light
				focus:ring-0
				dark:text-white
				max-[750px]:text-[14px]"
			placeholder="To"
			oninput={handleToChange}
		/>
	</div>
</div>
