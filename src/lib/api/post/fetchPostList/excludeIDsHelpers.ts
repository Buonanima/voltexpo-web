import type { Post } from '$lib/types/post';

export function extractCarIds(cars: Post[]): number[] {
	return cars.map((car) => car.id);
}
