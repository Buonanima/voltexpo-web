<script lang="ts">
	export let error: string = '';
	export let retry: (() => void) | undefined = undefined;
</script>

<div class="error-container">
	<div class="error-content">
		<h2>Something went wrong</h2>
		<p>{error}</p>
		{#if retry}
			<button class="retry-btn" on:click={retry}>
				Try Again
			</button>
		{/if}
	</div>
</div>

<style>
    .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        padding: 2rem;
    }

    .error-content {
        text-align: center;
        max-width: 400px;
    }

    .error-content h2 {
        color: #dc2626;
        margin-bottom: 1rem;
    }

    .error-content p {
        color: #64748b;
        margin-bottom: 1.5rem;
    }

    .retry-btn {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .retry-btn:hover {
        background: #1d4ed8;
    }
</style>
