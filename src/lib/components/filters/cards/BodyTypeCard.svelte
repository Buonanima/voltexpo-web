<!-- components/BodyTypeCard.svelte -->
<script lang="ts">
	import type { BodyType } from './bodyTypeCard.svelte.js';
	import { bodyTypeCardSvelte, getBodyTypes } from './bodyTypeCard.svelte.js';
	
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
		onClose,
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
		'break': Break,
		'suv': SUV,
		'sedan': Sedan,
		'hatchback': Hatchback,
		'coupe': Coupe,
		'cabriolet': Cabriolet,
		'passenger_transport': PassengerTransport
	};
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="body_type_card_container"
		class="fixed top-0 left-0 z-10 h-full w-full flex justify-center items-center
               bg-zinc-500/20 dark:bg-zinc-700/30"
		onclick={handleBackdropClick}
		onmousedown={handleBackdropClick}
		ontouchstart={handleBackdropClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="body_type_card"
			class="w-[500px] max-[550px]:w-full max-[750px]:mx-[20px]
                   pt-[15px] rounded-[15px] overflow-hidden
                   shadow-[0_5px_30px_rgb(0,0,0,0.15)]
                   backdrop-blur-[25px]
                   bg-white/70 dark:bg-zinc-950/70"
			onclick={(e) => e.stopPropagation()}
			onmousedown={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			<div
				class="block w-full pl-[30px] pb-[5px]
                       font-medium text-[20px]
                       text-zinc-800 dark:text-white"
			>
				Body Type
			</div>

			<div class="h-[400px] mr-[15px] ml-[20px] mb-[20px]
                        overscroll-contain overflow-y-scroll scrollbar-thin
                        scrollbar-thumb-brand-blue_light/60 scrollbar-thumb-rounded-full
                        scrollbar-track-transparent scrollbar-track-rounded-full">
				<ul
					id="body_type_card_list"
					class="card_list mr-[10px] text-gray-600"
				>
					{#each getBodyTypes() as bodyType (bodyType.id)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="h-[50px] flex flex-row items-center cursor-pointer
                                   hover:bg-gray-100 dark:hover:bg-gray-700 rounded
                                   transition-colors duration-150 p-2"
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