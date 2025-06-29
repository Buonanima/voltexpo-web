<script>
	export let currentNavbarTab = 'home';
	export let isAuthenticated = false;
	export let createNewPostUrl = '/create-post';
	export let logInUrl = '/login';

	const activeBgClass = 'bg-zinc-800/10 dark:bg-white/10';
</script>

<div class="fixed top-0 z-10 w-full bg-white/40 py-[5px] backdrop-blur-[10px] dark:bg-zinc-950/40">
	<nav class="container flex h-[55px] flex-row flex-nowrap items-center justify-between">
		<div class="relative h-[22px] w-[170px] shrink-0 max-[750px]:h-[18px] max-[750px]:w-[150px]">
			<a href="/" aria-label="Home">
				<div class="select-none">
					<img
						src="/brand/AutoAstroLogoDark.png"
						alt="AutoAstro Logo Dark"
						class="absolute align-middle"
					/>
					<img
						src="/brand/AutoAstroLogo.png"
						alt="AutoAstro Logo"
						class="absolute align-middle dark:hidden"
					/>
				</div>
			</a>
		</div>

		<div class="flex flex-row gap-[20px] text-[16px] max-[750px]:hidden">
			<a href="/" aria-label="Home">
				<div
					class={`rounded-[10px] font-medium ${currentNavbarTab === 'home' ? activeBgClass : ''} px-[15px] py-[4px] text-zinc-800 dark:text-white`}
				>
					Home
				</div>
			</a>

			<a href="/electric-cars" aria-label="Search Electric Cars">
				<div
					class={`rounded-[10px] font-medium ${currentNavbarTab === 'search' ? activeBgClass : ''} px-[15px] py-[4px] text-zinc-800 dark:text-white`}
				>
					Search
				</div>
			</a>

			<a href={createNewPostUrl} aria-label="Post a Car">
				<div
					class={`rounded-[10px] font-medium ${currentNavbarTab === 'post-car' ? activeBgClass : ''} px-[15px] py-[4px] text-zinc-800 dark:text-white`}
				>
					Post car
				</div>
			</a>
		</div>

		<div class="flex flex-row items-center gap-[20px] max-[750px]:gap-[30px]">
			{#if isAuthenticated}
				<a href="/favorites" aria-label="Favorites">
					<svg
						class="heart-icon heart-empty h-5 w-5 text-gray-400 transition-colors max-[750px]:h-6 max-[750px]:w-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path
							d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
						/>
					</svg>
				</a>
			{:else}
				<a href={logInUrl} aria-label="Log In">
					<svg
						class="heart-icon heart-empty h-5 w-5 text-gray-400 transition-colors max-[750px]:h-6 max-[750px]:w-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path
							d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
						/>
					</svg>
				</a>
			{/if}

			<div class="max-[750px]:hidden">
				<!-- Include the dark button component here, ensure it has an aria-label -->
			</div>

			{#if isAuthenticated}
				<div class="max-[750px]:hidden">
					<!-- Include the user picture component here, ensure it has an aria-label -->
				</div>
			{:else}
				<!-- Include the login button component here, ensure it has an aria-label -->
			{/if}

			<!-- Include the menu button component here, ensure it has an aria-label -->
		</div>
	</nav>
</div>
<div class="h-[65px]"></div>

{#if isAuthenticated}
	<!-- Include the user menu logged component here, ensure it has appropriate aria-labels -->
{/if}

<!-- Include the navbar menu component here, ensure it has appropriate aria-labels -->

<style>
	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 15px;
	}
</style>
