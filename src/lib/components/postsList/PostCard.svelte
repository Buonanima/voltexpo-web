<script lang="ts">
	import type { Post } from '$lib/types/post.js';
	import HeartButton from '../shared/HeartButton.svelte';
	import { carsActions } from '../../../routes/store/posts';

	export let car: Post;

	function handleHeartClick() {
		carsActions.toggleLike(car.id);
	}

	$: range = car.configuration?.technical_specs?.range?.combined_warm;
</script>

<div
	class="flex w-full flex-row overflow-hidden rounded-[16px] bg-zinc-100 dark:bg-zinc-925 max-[750px]:flex-col max-[750px]:rounded-none max-[750px]:border-0 min-[751px]:h-[275px]"
>
	<!-- Car Image -->
	<div
		class="shrink-0 max-[750px]:aspect-[16/9] min-[751px]:h-[275px] min-[751px]:w-[350px] min-[1000px]:w-[450px]"
	>
		<a href="/electric-car/{car.slug || car.id}" class="block h-full w-full">
			<img
				src={car.main_picture_url}
				alt={car.title}
				class="clear_image h-full w-full rounded-[16px] bg-gray-300 object-cover max-[750px]:rounded-none"
				loading="lazy"
			/>
		</a>
	</div>

	<!-- Car Content -->
	<div class="min-w-0 flex-1">
		<div
			class="h-full px-[20px] py-[10px] max-[750px]:px-[15px] min-[750px]:justify-between min-[751px]:flex min-[751px]:flex-col"
		>
			<div class="max-[750px]:mb-[20px]">
				<div class="flex w-full flex-row justify-between">
					<a href="/electric-car/{car.slug || car.id}" class="min-w-0 flex-1">
						<div
							class="flex w-full items-center pr-[15px] text-[18px] font-medium text-zinc-800 hover:underline dark:text-gray-200 max-[750px]:text-[16px]"
						>
							{car.title || 'no data'}
						</div>
					</a>

					<div class="flex flex-row items-center gap-3">
						<div class="flex flex-row flex-nowrap items-baseline gap-1.5 text-nowrap">
							<span
								class="items-baseline text-[21px] font-medium text-brand-blue_light_2 dark:text-brand-blue_light_2"
							>
								{car.price}
							</span>
							<span class="text-[19px] font-semibold text-gray-500 dark:text-gray-500">€</span>
						</div>
					</div>
				</div>

				<!-- Car Specs Row -->
				<div
					class="mb-[5px] flex w-full flex-row flex-wrap gap-[5px] text-[15px] font-medium text-gray-600 dark:text-gray-400"
				>
					<div class="">
						{car.first_registration_year || 'no data'} •
					</div>
					<div class="">
						{car.km} Km •
					</div>
					<div>
						{#if car.hp}
							{car.hp} HP{:else}
							no data HP{/if}
					</div>
				</div>

				<!-- Range -->
				<div class="mb-[10px] text-[15px]">
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
				<div class="flex flex-row items-center justify-start">
					<a href="/dealers/{car.user.url}">
						<img
							src={car.user.profile_image}
							alt={car.user.dealer_display_name}
							class="clear_image mr-[10px] h-[35px] w-[35px] rounded-[10px] bg-gray-300 object-cover"
						/>
					</a>

					<div class="flex flex-col font-medium">
						<a href="/dealers/{car.user.url}">
							<div class="text-[15px] text-gray-700 hover:underline dark:text-zinc-300">
								{car.user.dealer_display_name || '[No name]'}
							</div>
						</a>
						<div class="text-[14px] text-zinc-600 dark:text-gray-400">
							{car.time_posted} • {car.views} views
						</div>
					</div>
				</div>

				<!-- Heart Button -->
				<div
					class="flex flex-row flex-nowrap gap-[15px] text-[15px] font-semibold text-gray-500 dark:text-gray-400"
				>
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
