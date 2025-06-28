<!-- components/filters/SearchPage/YearInput.svelte -->
<script lang="ts">
	import { yearInputSvelte } from './yearInput.svelte.js';

	// Props
	const { disabled = false, onClear, onChange } = $props<{
		disabled?: boolean;
		onClear?: () => void;
		onChange?: (from: number | null, to: number | null) => void;
	}>();

	// Derived values using runes
	const fromValue = $derived(yearInputSvelte.fromYear);
	const toValue = $derived(yearInputSvelte.toYear);

	// Event handlers
	function handleFromChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		yearInputSvelte.fromYear = value;
		onChange?.(value, toValue);
	}

	function handleToChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		yearInputSvelte.toYear = value;
		onChange?.(fromValue, value);
	}

	function handleClear(): void {
		if (disabled) return;
		yearInputSvelte.fromYear = null;
		yearInputSvelte.toYear = null;
		onClear?.();
		onChange?.(null, null);
	}
</script>

<div
	id="filter_minimal_input_container_year"
	class="flex flex-row flex-nowrap border-[1px] border-zinc-200 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 z-0 hover:z-[1] mr-[-1px] mb-[-1px] transition-[border-color] duration-150 overflow-hidden hover:cursor-pointer rounded-tr-[20px] max-[750px]:rounded-none"
>
	<div
		id="filter_minimal_input_container_year_from"
		class="w-full pl-[15px] py-[8px] flex flex-col flex-nowrap"
	>
		<label for="filter_minimal_input_year_from" class="block text-[15px] max-[750px]:text-[14px] text-zinc-800 dark:text-white hover:cursor-pointer">
			Year
		</label>
		<input
			type="number"
			name="year_from"
			id="filter_minimal_input_year_from"
			value={fromValue || ''}
			{disabled}
			class="number-input
				focus:ring-0
				border-b-[1px] border-transparent
				focus:border-brand-blue_light
				block w-full border-0 p-0
				bg-transparent
				text-[15px] max-[750px]:text-[14px]
				text-zinc-800 dark:text-white
				placeholder:text-zinc-400
				outline-none
				hover:cursor-pointer"
			placeholder="From"
			oninput={handleFromChange}
		/>
	</div>
	<div
		id="filter_minimal_input_container_year_to"
		class="w-full pr-[10px] py-[8px] flex flex-col flex-nowrap"
	>
		<label for="filter_minimal_input_year_to" class="block text-[14px] text-transparent">Year</label>
		<input
			type="number"
			name="year_to"
			id="filter_minimal_input_year_to"
			value={toValue || ''}
			{disabled}
			class="number-input
				focus:ring-0
				border-b-[1px] border-transparent
				focus:border-brand-blue_light
				block w-full border-0 p-0
				bg-transparent
				text-[15px] max-[750px]:text-[14px]
				text-zinc-800 dark:text-white
				placeholder:text-zinc-400
				outline-none
				hover:cursor-pointer"
			placeholder="To"
			oninput={handleToChange}
		/>
	</div>
</div>

