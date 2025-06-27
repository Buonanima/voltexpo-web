<script lang="ts">
	export let title = "No items available";
	export let description = "Unable to load items at the moment.";
</script>

<div class="empty-state">
	<h2 class="empty-state-title">{title}</h2>
	<p class="empty-state-description">{description}</p>
</div>

<style>
    .empty-state {
        text-align: center;
        padding: 3rem 1rem;
        color: rgb(100 116 139); /* slate-500 */
    }

    .empty-state-title {
        color: rgb(220 38 38); /* red-600 */
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
    }

    :global(.dark) .empty-state-title {
        color: rgb(248 113 113); /* red-400 */
    }

    .empty-state-description {
        margin-bottom: 2rem;
    }
</style>
