import { writable } from 'svelte/store';

// Client-side store for managing like states
export const likedCars = writable<Set<number>>(new Set());

export const carsActions = {
	toggleLike(carId: number) {
		likedCars.update((liked) => {
			const newLiked = new Set(liked);
			if (newLiked.has(carId)) {
				newLiked.delete(carId);
			} else {
				newLiked.add(carId);
			}
			return newLiked;
		});
	},

	isLiked(carId: number, likedSet: Set<number>): boolean {
		return likedSet.has(carId);
	}
};
