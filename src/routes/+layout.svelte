<script>
	import '../app.css';
	
	// Define props or state that you need to pass to the navbar component

	// Any other global state or logic
</script>

<main class="min-h-screen">
	<slot />
</main>

<style>
    :global(*) {
        box-sizing: border-box;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
