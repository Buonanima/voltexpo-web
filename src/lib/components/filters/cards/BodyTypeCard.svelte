<!-- components/BodyTypeCard.svelte -->
<script lang="ts">
	import type { BodyType } from './bodyTypeCard.svelte.ts';
	import { bodyTypeCardSvelte, getBodyTypes } from './bodyTypeCard.svelte.ts';

	// Import body type icons
	import Break from './body_type_icons/Break.svelte';
	import SUV from './body_type_icons/SUV.svelte';
	import Sedan from './body_type_icons/Sedan.svelte';
	import Hatchback from './body_type_icons/Hatchback.svelte';
	import Coupe from './body_type_icons/Coupe.svelte';
	import Cabriolet from './body_type_icons/Cabriolet.svelte';
	import PassengerTransport from './body_type_icons/PassengerTransport.svelte';

	// Props with callback functions
	const {
		isOpen = false,
		onSelect,
		onClose
	} = $props<{
		isOpen?: boolean;
		onSelect: (bodyType: BodyType) => void;
		onClose: () => void;
	}>();

	function closeBodyTypeCard(): void {
		onClose();
	}

	function selectBodyType(bodyType: BodyType): void {
		onSelect(bodyType);
	}

	function handleBackdropClick(event: MouseEvent | TouchEvent): void {
		if (event.target === event.currentTarget) {
			closeBodyTypeCard();
		}
	}

	// Component mapping for icons
	const iconComponents = {
		break: Break,
		suv: SUV,
		sedan: Sedan,
		hatchback: Hatchback,
		coupe: Coupe,
		cabriolet: Cabriolet,
		'passenger-transport': PassengerTransport
	};
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="body_type_card_container"
		class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center
               bg-zinc-500/20 dark:bg-zinc-700/30"
		onclick={handleBackdropClick}
		onmousedown={handleBackdropClick}
		ontouchstart={handleBackdropClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="body_type_card"
			class="w-[500px] overflow-hidden rounded-[15px]
                   bg-white/70 pt-[15px] shadow-[0_5px_30px_rgb(0,0,0,0.15)]
                   backdrop-blur-[25px]
                   dark:bg-zinc-950/70
                   max-[750px]:mx-[20px] max-[550px]:w-full"
			onclick={(e) => e.stopPropagation()}
			onmousedown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			<div
				class="block w-full pb-[5px] pl-[30px]
                       text-[20px] font-medium
                       text-zinc-800 dark:text-white"
			>
				Body Type
			</div>

			<div
				class="mb-[20px] ml-[20px] mr-[15px] h-[400px]
                        overflow-y-scroll overscroll-contain scrollbar-thin
                        scrollbar-track-transparent scrollbar-thumb-brand-blue_light/60
                        scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
			>
				<ul id="body_type_card_list" class="card_list mr-[10px] text-gray-600">
					{#each getBodyTypes() as bodyType (bodyType.id)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="flex h-[50px] cursor-pointer flex-row items-center
                                   rounded p-2 transition-colors
                                   duration-150 hover:bg-gray-100 dark:hover:bg-gray-700"
							onclick={() => selectBodyType(bodyType)}
							data-id={bodyType.id}
							data-value={bodyType.value}
							data-slug={bodyType.slug}
						>
							<svelte:component this={iconComponents[bodyType.slug]} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}
