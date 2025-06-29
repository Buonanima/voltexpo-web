<!-- components/filters/SearchPage/KmInput.svelte -->
<script lang="ts">
	import { kmInputSvelte } from './kmInput.svelte.ts';

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
	const fromValue = $derived(kmInputSvelte.fromKm);
	const toValue = $derived(kmInputSvelte.toKm);

	// Event handlers
	function handleFromChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		kmInputSvelte.fromKm = value;
		onChange?.(value, toValue);
	}

	function handleToChange(event: Event): void {
		if (disabled) return;
		const input = event.target as HTMLInputElement;
		const value = input.value ? parseInt(input.value) : null;
		kmInputSvelte.toKm = value;
		onChange?.(fromValue, value);
	}

	function handleClear(): void {
		if (disabled) return;
		kmInputSvelte.fromKm = null;
		kmInputSvelte.toKm = null;
		onClear?.();
		onChange?.(null, null);
	}
</script>

<div
	id="filter_minimal_input_container_km"
	class="z-0 mb-[-1px] mr-[-1px] flex flex-row flex-nowrap overflow-hidden rounded-l-[16px] border border-zinc-200 transition-[border-color] duration-150 hover:z-[1] hover:cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-900"
>
	<div
		id="filter_minimal_input_container_km_from"
		class="flex w-full flex-col flex-nowrap py-[8px] pl-[15px]"
	>
		<label
			for="filter_minimal_input_km_from"
			class="block text-[15px] text-zinc-800 hover:cursor-pointer dark:text-white max-[750px]:text-[14px]"
		>
			Km
		</label>
		<input
			type="number"
			name="km_from"
			id="filter_minimal_input_km_from"
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
		id="filter_minimal_input_container_km_to"
		class="flex w-full flex-col flex-nowrap py-[8px] pr-[10px]"
	>
		<label for="filter_minimal_input_km_to" class="block text-[14px] text-transparent">Km</label>
		<input
			type="number"
			name="km_to"
			id="filter_minimal_input_km_to"
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
