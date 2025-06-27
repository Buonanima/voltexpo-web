import type { User } from '$lib/types/user';
import type { DbVariant } from '$lib/types/variant';
import type { PostFeatures } from '$lib/types/features';
import type { Image } from '$lib/types/image';

export interface Post {
	id: number;
	user_id: number | null;
	status: string;
	time_posted: string | null;
	title: string | null;
	slug: string | null;
	vin: string | null;
	year: string | null;
	km: number | null;
	hp: number | null;

	is_boosted: boolean;
	boost_expires_at: string | null;
	first_published_at: string | null;
	published_at: string | null;
	expires_at: string | null;
	expired_at: string | null;
	deactivated_at: string | null;
	sold_at: string | null;
	rejection_reason: string | null;
	renewal_count: number;
	last_renewed_at: string | null;
	scheduled_renewal_at: string | null;
	payment_status: string;
	post_payment_id: number | null;

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

	// Custom technical specs
	custom_hp: number | null;
	custom_battery_size_kwh: number | null;
	custom_range_km: number | null;
	custom_0_100_s: number | null;
	custom_body_type: string | null;
	custom_drive: string | null;
	custom_charge_port_home: string | null;
	custom_charge_port_fast: string | null;

	seats: number | null;
	registered: boolean | null;

	first_registration_day: number | null;
	first_registration_month: number | null;
	first_registration_year: number | null;

	description: string | null;

	price: number | null;
	formatted_price: string;

	seller_pic_url: string | null;
	main_picture_url: string | null;

	configuration: DbVariant | null;
	features: PostFeatures | null;

	has_warranty_left: boolean | null;
	warranty_until_day: number | null;
	warranty_until_month: number | null;
	warranty_until_year: number | null;
	warranty_until_km: number | null;

	seller: string | null;
	phone: string | null;
	location: string | null;

	pictures: Image | null;
	views: number | null;

	user: User;
	is_favorite: boolean;

	// Client-side only
	isLiked?: boolean;
}
