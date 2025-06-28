<script lang="ts">
	import { goto } from '$app/navigation';
	import { brandInputSvelte } from './FilterHome/brandInput.svelte';
	import { modelInputSvelte } from './FilterHome/modelInput.svelte';

	function handleSearch() {
		const params = new URLSearchParams();
		
		if (brandInputSvelte.selectedBrand) {
			params.set('brand', brandInputSvelte.selectedBrand.brand_name);
		}
		
		if (modelInputSvelte.selectedModel) {
			params.set('model', modelInputSvelte.selectedModel.model_name);
		}
		
		const queryString = params.toString();
		const url = queryString ? `/electric-cars?${queryString}` : '/electric-cars';
		
		goto(url);
	}
</script>

<div class='w-full max-[750px]:px-[15px]'>
    <div class='flex flex-row
              grid grid-cols-3
              max-[750px]:grid-cols-2
              rounded-[15px]'>

        <button onclick={handleSearch}>
            <div id='advanced_search_button' class='
             w-full mr-[-1px] h-[44px]
             flex justify-center items-center gap-[10px]
             text-[15px] max-[750px]:text-[14px]
             text-zinc-800 hover:text-zinc-900
             dark:text-zinc-100 dark:hover:text-white
             max-[750px]:border-r-[0px]
             bg-zinc-100 hover:bg-zinc-200
             dark:bg-zinc-900 dark:hover:bg-zinc-850
             rounded-full max-[750px]:rounded-r-none
             hover:cursor-pointer
             transition-all
             duration-150'>
                <span id="advanced_search_button_text">Advanced Search</span>
            </div>
        </button>

        <div class='w-full max-[750px]:hidden'></div>

        <button onclick={handleSearch}>
            <div id='search_button'
                 class='h-[44px]
                    flex items-center justify-center
                    rounded-full max-[750px]:rounded-l-none
                    bg-brand-blue_light_2 hover:bg-brand-blue
                    dark:bg-brand-blue_dark dark:hover:bg-brand-blue
                    cursor-pointer duration-150'
            >
                <div id='search_button_text' class='text-[16px] max-[750px]:text-[15px] text-white font-[500]'> Search
                </div>
            </div>
        </button>

    </div>
</div>