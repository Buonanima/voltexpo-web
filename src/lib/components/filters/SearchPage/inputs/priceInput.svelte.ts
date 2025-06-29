// State for PriceInput component using Svelte 5 runes

class PriceInputState {
	fromPrice = $state<number | null>(null);
	toPrice = $state<number | null>(null);

	// Reset all values
	reset() {
		this.fromPrice = null;
		this.toPrice = null;
	}

	// Get current values as an object
	get values() {
		return {
			from: this.fromPrice,
			to: this.toPrice
		};
	}

	// Check if any value is set
	get hasValues() {
		return this.fromPrice !== null || this.toPrice !== null;
	}
}

// Export singleton instance
export const priceInputSvelte = new PriceInputState();
