export interface User {
	id: number;
	url: string;
	title: string;
	created_at: string;
	profile_image: string;
	banner_image: string | null;
	dealer_company_name: string | null;
	dealer_display_name: string;
	dealer_contact: string | null;
	dealer_status: string;
}

export interface TechnicalSpecs {
	range: {
		city_warm: number | null;
		city_cold: number | null;
		highway_warm: number | null;
		highway_cold: number | null;
		combined_warm: number | null;
		combined_cold: number | null;
	};
	performance: {
		acceleration: number | null;
		top_speed: number | null;
		total_power_kw: number | null;
		total_power_hp: number | null;
		total_torque: number | null;
	};
	battery: {
		nominal_capacity: number | null;
		battery_type: string | null;
		number_of_cells: number | null;
		battery_architecture: string | null;
		battery_warranty: number | null;
		battery_warranty_mileage_km: number | null;
		usable_capacity: number | null;
		cathode_metal: string | null;
		pack_configuration: string | null;
		nominal_voltage: number | null;
		form_factor: string | null;
		battery_name_reference: string | null;
	};
	charging: {
		charging_home_port: string | null;
		charging_fast_port: string | null;
		charging_home_port_location: string | null;
		charging_fast_port_location: string | null;
		charging_home_time_0_100: number | null;
		charging_fast_time_10_80: number | null;
		charging_home_time_0_100_human_readable: string | null;
		charging_fast_time_10_80_human_readable: string | null;
	};
	dimensions_specs: {
		length: number | null;
		width: number | null;
		width_with_mirrors: number | null;
		height: number | null;
		wheelbase: number | null;
		weight_unladen: number | null;
		gross_vehicle_weight: number | null;
		max_payload: number | null;
		cargo_volume: number | null;
		cargo_volume_max: number | null;
		cargo_volume_frunk: number | null;
		tow_hitch_possible: boolean | null;
		towing_weight_unbraked: number | null;
		towing_weight_braked: number | null;
	};
}

export interface Configuration {
	id: number | null;
	title: string | null;
	brand_id: number | null;
	brand: string | null;
	model_id: number | null;
	model: string | null;
	configuration: string | null;
	from_year: number | null;
	from_month: number | null;
	to_year: number | null;
	to_month: number | null;
	seats: number | null;
	car_body: string | null;
	drive: string | null;
	total_power: number | null;
	nominal_capacity: number | null;
	technical_specs: TechnicalSpecs;
}

export interface Car {
	id: number;
	user_id: number;
	Status: string;
	time_posted: string;
	title: string;
	slug: string;
	vin: string | null;
	year: number | null;
	km: number;
	hp: string;
	IsBoosted: boolean;
	BoostExpiresAt: string | null;
	FirstPublishedAt: string | null;
	PublishedAt: string | null;
	ExpiresAt: string | null;
	ExpiredAt: string | null;
	DeactivatedAt: string | null;
	SoldAt: string | null;
	RejectionReason: string | null;
	RenewalCount: number;
	LastRenewedAt: string | null;
	ScheduledRenewalAt: string | null;
	PaymentStatus: string;
	PostPaymentID: string | null;
	brand: string | null;
	brand_id: number | null;
	model: string | null;
	model_id: number | null;
	model_not_found: boolean;
	custom_model_name: string | null;
	configuration_title: string | null;
	configuration_id: number | null;
	configuration_not_found: boolean;
	custom_configuration_name: string | null;
	custom_hp: string | null;
	custom_battery_size_kwh: number | null;
	custom_range_km: number | null;
	custom_0_100_s: number | null;
	custom_body_type: string | null;
	custom_drive: string | null;
	custom_charge_port_home: string | null;
	custom_charge_port_fast: string | null;
	seats: number | null;
	registered: boolean | null;
	firstRegistrationDay: number;
	firstRegistrationMonth: number;
	firstRegistrationYear: number;
	description: string | null;
	price: number;
	formatted_price: string;
	seller_pic_url: string | null;
	'main-picture-url': string;
	configuration: Configuration;
	features: never | null;
	has_warranty_left: boolean | null;
	warranty_until_day: number | null;
	warranty_until_month: number | null;
	warranty_until_year: number | null;
	warranty_until_km: number | null;
	seller: string;
	phone: string | null;
	location: string | null;
	pictures: any | null;
	views: number;
	user: User;
	is_favorite: boolean;
	// Added for client-side state
	isLiked?: boolean;
}
