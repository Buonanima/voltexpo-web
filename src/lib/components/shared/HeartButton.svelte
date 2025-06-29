<script lang="ts">
	export let isLiked: boolean = false;
	export let size: 'small' | 'large' = 'small';
	export let onclick: (() => void) | undefined = undefined;

	function handleClick() {
		onclick?.();
	}
</script>

<button
	class="heart-button {size}"
	class:liked={isLiked}
	on:click={handleClick}
	aria-label={isLiked ? 'Unlike post' : 'Like post'}
>
	<svg
		viewBox="0 0 24 24"
		fill={isLiked ? 'currentColor' : 'none'}
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
</button>

<style>
	.heart-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.2s ease;
		color: #64748b;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.heart-button:hover {
		background-color: #f1f5f9;
		transform: scale(1.1);
	}

	.heart-button.liked {
		color: #dc2626;
	}

	.heart-button.small svg {
		width: 20px;
		height: 20px;
	}

	.heart-button.large svg {
		width: 32px;
		height: 32px;
	}

	.heart-button:active {
		transform: scale(0.95);
	}
</style>
