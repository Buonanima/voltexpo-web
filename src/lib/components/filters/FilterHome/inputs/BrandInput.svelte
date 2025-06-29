<!-- components/BrandInput.svelte -->
<script lang="ts">
	import CrossIcon from '$lib/components/shared/icons/CrossIcon.svelte';

	// Props
	const {
		value = '',
		disabled = false,
		variant = 'home',
		onOpen,
		onClear,
		onChange
	} = $props<{
		value?: string;
		disabled?: boolean;
		variant?: 'home' | 'search';
		onOpen?: () => void;
		onClear?: () => void;
		onChange?: (value: string | null) => void;
	}>();

	// Derived values using runes
	const displayValue = $derived(value || '');
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
	class="{variant === 'home'
		? 'w-full rounded-l-[16px] border border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-500'
		: 'z-0 mb-[-1px] flex flex-row flex-nowrap overflow-hidden rounded-tl-[20px] border-[1px] border-zinc-200 transition-[border-color] duration-150 hover:z-[1] hover:cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:bg-zinc-900'}
	mr-[-1px] flex cursor-pointer transition-colors duration-200"
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-haspopup="dialog"
	aria-disabled={disabled}
	onclick={handleOpenBrandCard}
	onkeydown={() => {}}
>
	<div class="flex-1 py-[8px] pl-[15px] pr-[10px]">
		<label
			for="filter_minimal_input_brand"
			class="{variant === 'home'
				? 'block text-[15px] text-zinc-600 dark:text-zinc-300 max-[750px]:text-[14px]'
				: 'block text-[15px] text-zinc-800 hover:cursor-pointer dark:text-white max-[750px]:text-[14px]'}
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
			class="w-full bg-transparent text-[15px] text-zinc-800 outline-none placeholder:text-zinc-400
				dark:text-white max-[750px]:text-[14px]
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
			class="flex w-[35px] cursor-pointer items-center justify-center px-[10px]
				transition-colors duration-200 hover:bg-red-300/50 focus:bg-red-300/50 focus:outline-none
				focus:ring-2 focus:ring-inset focus:ring-red-400
				{disabled
				? 'cursor-not-allowed opacity-50 hover:bg-transparent focus:bg-transparent focus:ring-0'
				: ''}"
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
