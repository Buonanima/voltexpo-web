<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import HeartButton from '$lib/components/shared/HeartButton.svelte';
	import type { PageData } from './$types';
	import { carsActions, likedCars } from '../../store/posts';

	export let data: PageData;

	// Add isLiked property based on client state
	$: carWithLikeState = {
		...data.car,
		isLiked: browser ? carsActions.isLiked(data.car.id, $likedCars) : false
	};

	function handleHeartClick() {
		carsActions.toggleLike(data.car.id);
	}

	function goBack() {
		goto('/');
	}

	$: car = data.car;
	$: registrationDate = `${car.first_registration_month}/${car.first_registration_year}`;
	$: range = car.configuration?.technical_specs?.range?.combined_warm;
	$: specs = car.configuration?.technical_specs;
</script>

<svelte:head>
	<title>{car.title}</title>
	<meta name="description" content="{car.title} - {car.price} - {car.hp} HP Electric Vehicle" />
</svelte:head>

<div class="container">
	<nav class="breadcrumb">
		<button class="back-btn" on:click={goBack}>
			← Back to Cars
		</button>
	</nav>

	<article class="car-detail">
		<div class="car-images">
			<img
				src={car.main_picture_url}
				alt={car.title}
				class="main-image"
			/>
		</div>

		<div class="car-info">
			<header class="car-header">
				<div class="title-section">
					<h1>{car.title}</h1>
					<div class="price">{car.price}</div>
				</div>
				<HeartButton
					isLiked={carWithLikeState.isLiked}
					size="large"
					onclick={handleHeartClick}
				/>
			</header>

			<div class="car-specs">
				<div class="specs-grid">
					<div class="spec-card">
						<h3>Power & Performance</h3>
						<div class="spec-item">
							<span class="label">Power:</span>
							<span class="value">{car.hp} HP</span>
						</div>
						{#if specs?.performance?.acceleration}
							<div class="spec-item">
								<span class="label">0-100 km/h:</span>
								<span class="value">{specs.performance.acceleration}s</span>
							</div>
						{/if}
						{#if specs?.performance?.top_speed}
							<div class="spec-item">
								<span class="label">Top Speed:</span>
								<span class="value">{specs.performance.top_speed} km/h</span>
							</div>
						{/if}
					</div>

					<div class="spec-card">
						<h3>Range & Battery</h3>
						{#if range}
							<div class="spec-item">
								<span class="label">Range (WLTP):</span>
								<span class="value">{range} km</span>
							</div>
						{/if}
						{#if specs?.battery?.nominal_capacity}
							<div class="spec-item">
								<span class="label">Battery:</span>
								<span class="value">{specs.battery.nominal_capacity} kWh</span>
							</div>
						{/if}
						{#if specs?.charging?.charging_fast_time_10_80_human_readable}
							<div class="spec-item">
								<span class="label">Fast Charging:</span>
								<span class="value">{specs.charging.charging_fast_time_10_80_human_readable}</span>
							</div>
						{/if}
					</div>

					<div class="spec-card">
						<h3>Vehicle Details</h3>
						<div class="spec-item">
							<span class="label">Year:</span>
							<span class="value">{registrationDate}</span>
						</div>
						{#if car.km != null}
							<div class="spec-item">
								<span class="label">Mileage:</span>
								<span class="value">{car.km.toLocaleString()} km</span>
							</div>
						{/if}
						{#if car.configuration?.car_body}
							<div class="spec-item">
								<span class="label">Body Type:</span>
								<span class="value">{car.configuration.car_body}</span>
							</div>
						{/if}
						{#if car.configuration?.seats}
							<div class="spec-item">
								<span class="label">Seats:</span>
								<span class="value">{car.configuration.seats}</span>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="seller-section">
				<h3>Seller Information</h3>
				<div class="seller-card">
					<img
						src={car.user.profile_image}
						alt={car.user.dealer_display_name}
						class="seller-avatar"
					/>
					<div class="seller-info">
						<h4>{car.user.dealer_display_name}</h4>
						<p class="seller-status">Verified Dealer</p>
					</div>
					<div class="listing-stats">
						<div class="stat">
							<span class="stat-label">Posted:</span>
							<span class="stat-value">{car.time_posted}</span>
						</div>
						<div class="stat">
							<span class="stat-label">Views:</span>
							<span class="stat-value">{car.views}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</article>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .breadcrumb {
        margin-bottom: 2rem;
    }

    .back-btn {
        background: none;
        border: 1px solid #e2e8f0;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s;
        font-weight: 500;
    }

    .back-btn:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
        color: #475569;
    }

    .car-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .car-images {
        position: sticky;
        top: 2rem;
        height: fit-content;
    }

    .main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .car-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        gap: 1rem;
    }

    .title-section h1 {
        margin: 0 0 0.5rem 0;
        color: #1e293b;
        font-size: 2rem;
        line-height: 1.2;
    }

    .price {
        color: #059669;
        font-weight: 700;
        font-size: 1.75rem;
    }

    .car-specs {
        margin-bottom: 2rem;
    }

    .specs-grid {
        display: grid;
        gap: 1.5rem;
    }

    .spec-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
    }

    .spec-card h3 {
        margin: 0 0 1rem 0;
        color: #475569;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .spec-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e2e8f0;
    }

    .spec-item:last-child {
        border-bottom: none;
    }

    .spec-item .label {
        color: #64748b;
        font-weight: 500;
    }

    .spec-item .value {
        color: #1e293b;
        font-weight: 600;
    }

    .seller-section h3 {
        margin: 0 0 1rem 0;
        color: #1e293b;
        font-size: 1.25rem;
    }

    .seller-card {
        background: #f8fafc;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .seller-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .seller-info {
        flex: 1;
    }

    .seller-info h4 {
        margin: 0 0 0.25rem 0;
        color: #1e293b;
        font-weight: 600;
    }

    .seller-status {
        margin: 0;
        color: #059669;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .listing-stats {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }

    .stat-label {
        color: #64748b;
    }

    .stat-value {
        color: #1e293b;
        font-weight: 500;
    }

    @media (max-width: 1024px) {
        .car-detail {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .car-images {
            position: static;
        }

        .main-image {
            height: 300px;
        }
    }

    @media (max-width: 640px) {
        .container {
            padding: 1rem;
        }

        .car-detail {
            padding: 1.5rem;
        }

        .car-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .title-section h1 {
            font-size: 1.5rem;
        }

        .price {
            font-size: 1.5rem;
        }

        .seller-card {
            flex-direction: column;
            text-align: center;
        }

        .listing-stats {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
        }
    }
</style>
