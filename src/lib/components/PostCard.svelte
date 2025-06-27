<script lang="ts">
	import type { Post } from '$lib/types/post.js';
	import HeartButton from './HeartButton.svelte';
	import { carsActions } from '$lib/stores/posts';

	export let car: Post;

	function handleHeartClick() {
		carsActions.toggleLike(car.id);
	}

	$: range = car.configuration?.technical_specs?.range?.combined_warm;
</script>

<div
	class="w-full min-[751px]:h-[275px] flex max-[750px]:flex-col flex-row max-[750px]:border-0 rounded-[16px] max-[750px]:rounded-none bg-zinc-100 dark:bg-zinc-925 overflow-hidden">
	<!-- Car Image -->
	<div class="shrink-0 min-[751px]:w-[350px] min-[1000px]:w-[450px] min-[751px]:h-[275px] max-[750px]:aspect-[16/9]">
		<a href="/electric-car/{car.slug || car.id}" class="block w-full h-full">
			<img
				src={car.main_picture_url}
				alt={car.title}
				class="bg-gray-300 rounded-[16px] max-[750px]:rounded-none w-full h-full object-cover clear_image"
				loading="lazy"
			/>
		</a>
	</div>

	<!-- Car Content -->
	<div class="flex-1 min-w-0">
		<div
			class="px-[20px] max-[750px]:px-[15px] py-[10px] h-full min-[751px]:flex min-[751px]:flex-col min-[750px]:justify-between">
			<div class="max-[750px]:mb-[20px]">
				<div class="w-full flex flex-row justify-between">
					<a href="/electric-car/{car.slug || car.id}" class="flex-1 min-w-0">
						<div
							class="w-full flex items-center text-zinc-800 dark:text-gray-200 font-medium text-[18px] max-[750px]:text-[16px] pr-[15px] hover:underline">
							{car.title || 'no data'}
						</div>
					</a>

					<div class="flex flex-row items-center gap-3">
						<div class="flex flex-row flex-nowrap items-baseline gap-1.5 text-nowrap">
							<span class="items-baseline text-brand-blue_light_2 dark:text-brand-blue_light_2 font-medium text-[21px]">
								{car.price}
							</span>
							<span class="text-gray-500 dark:text-gray-500 text-[19px] font-semibold">€</span>
						</div>
					</div>
				</div>

				<!-- Car Specs Row -->
				<div
					class="w-full flex flex-row flex-wrap font-medium text-gray-600 dark:text-gray-400 text-[15px] gap-[5px] mb-[5px]">
					<div class="">
						{car.first_registration_year || 'no data'} •
					</div>
					<div class="">
						{car.km} Km •
					</div>
					<div>
						{#if car.hp} {car.hp} HP{:else} no data HP{/if}
					</div>
				</div>

				<!-- Range -->
				<div class="text-[15px] mb-[10px]">
					<span class="font-medium text-gray-700 dark:text-gray-200">Range:</span>
					<span class="font-semibold text-brand-green_text dark:text-brand-green_light">
						{#if car.custom_range_km}
							{car.custom_range_km} Km
						{:else if range}
							{range} km
						{:else}
							no data range
						{/if}
					</span>
				</div>
			</div>

			<!-- Bottom Section -->
			<div class="flex flex-row justify-between">
				<!-- Seller Info -->
				<div class="flex flex-row justify-start items-center">
					<a href="/dealers/{car.user.url}">
						<img
							src={car.user.profile_image}
							alt={car.user.dealer_display_name}
							class="clear_image h-[35px] w-[35px] object-cover bg-gray-300 rounded-[10px] mr-[10px]"
						/>
					</a>

					<div class="flex flex-col font-medium">
						<a href="/dealers/{car.user.url}">
							<div class="text-gray-700 dark:text-zinc-300 text-[15px] hover:underline">
								{car.user.dealer_display_name || '[No name]'}
							</div>
						</a>
						<div class="text-zinc-600 dark:text-gray-400 text-[14px]">
							{car.time_posted} • {car.views} views
						</div>
					</div>
				</div>

				<!-- Heart Button -->
				<div class="text-[15px] font-semibold text-gray-500 dark:text-gray-400 flex flex-row flex-nowrap gap-[15px]">
					<div class="flex flex-row items-center gap-[5px] text-nowrap">
						<div class="cursor-pointer select-none p-[10px]">
							<HeartButton isLiked={car.isLiked || false} onclick={handleHeartClick} />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
