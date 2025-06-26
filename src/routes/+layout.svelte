<main class="min-h-screen bg-slate-200 text-slate-700">
	<slot />
</main>

<style>
    :global(*) {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
