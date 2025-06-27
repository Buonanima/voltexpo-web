<!-- RetryButton.svelte -->
<script>
	export let onClick = () => {};
</script>

<button class="retry-button" on:click={onClick}>
	Try Again
</button>
