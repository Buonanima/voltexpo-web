export interface RangeSpecs {
	city_warm: number | null;
	city_cold: number | null;
	highway_warm: number | null;
	highway_cold: number | null;
	combined_warm: number | null;
	combined_cold: number | null;
}

export interface PerformanceSpecs {
	acceleration: number | null;
	top_speed: number | null;
	total_power_kw: number | null;
	total_power_hp: number | null;
	total_torque: number | null;
}

export interface BatterySpecs {
	nominal_capacity: number | null;
	battery_type: string | null;
	number_of_cells: number | null;
	battery_architecture: string | null;
	battery_warranty: number | null;
	battery_warranty_mileage_km: string | null;
	usable_capacity: number | null;
	cathode_metal: string | null;
	pack_configuration: string | null;
	nominal_voltage: number | null;
	form_factor: string | null;
	battery_name_reference: string | null;
}

export interface ChargingSpecs {
	charging_home_port: string | null;
	charging_fast_port: string | null;
	charging_home_port_location: string | null;
	charging_fast_port_location: string | null;
	charging_home_time_0_100: number | null;
	charging_fast_time_10_80: number | null;
	charging_home_time_0_100_human_readable: string | null;
	charging_fast_time_10_80_human_readable: string | null;
}

export interface DimensionsSpecs {
	length: string | null;
	width: string | null;
	width_with_mirrors: string | null;
	height: string | null;
	wheelbase: string | null;
	weight_unladen: string | null;
	gross_vehicle_weight: string | null;
	max_payload: string | null;
	cargo_volume: string | null;
	cargo_volume_max: string | null;
	cargo_volume_frunk: string | null;
	tow_hitch_possible: string | null;
	towing_weight_unbraked: string | null;
	towing_weight_braked: string | null;
}

export interface TechnicalSpecs {
	range: RangeSpecs;
	performance: PerformanceSpecs;
	battery: BatterySpecs;
	charging: ChargingSpecs;
	dimensions: DimensionsSpecs;
}
