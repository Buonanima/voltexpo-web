export interface User {
	id: number;
	url: string | null;
	title: string;
	created_at: string;
	profile_image: string | null;
	banner_image: string | null;

	dealer_company_name: string | null;
	dealer_display_name: string | null;
	dealer_contact: string | null;

	dealer_status: string;

	favorite_car_ids: number[];
}
