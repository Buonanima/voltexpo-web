<script>
	// Define props or state that you need to pass to the Navbar component
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	let currentNavbarTab = 'home'; // Example value, update as needed
	let isAuthenticated = false;   // Example value, update as needed
	let createNewPostUrl = '/create-post'; // Example URL, update as needed
	let logInUrl = '/login'; // Example URL, update as needed

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
