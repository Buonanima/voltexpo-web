import type { TechnicalSpecs } from '$lib/types/technicalSpecs';

export interface DbVariant {
	id: number | null;
	title: string | null;
	brand_id: string | null;
	brand: string | null;
	model_id: string | null;
	model: string | null;
	configuration: string | null;
	from_year: number | null;
	from_month: number | null;
	to_year: number | null;
	to_month: number | null;
	seats: number | null;
	car_body: string | null;
	drive: string | null;
	system_power: number | null;
	nominal_capacity: number | null;
	technical_specs: TechnicalSpecs;
}