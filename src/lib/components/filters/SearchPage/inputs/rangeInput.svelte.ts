// State for RangeInput component using Svelte 5 runes

class RangeInputState {
	fromRange = $state<number | null>(null);
	toRange = $state<number | null>(null);

	// Reset all values
	reset() {
		this.fromRange = null;
		this.toRange = null;
	}

	// Get current values as an object
	get values() {
		return {
			from: this.fromRange,
			to: this.toRange
		};
	}

	// Check if any value is set
	get hasValues() {
		return this.fromRange !== null || this.toRange !== null;
	}
}

// Export singleton instance
export const rangeInputSvelte = new RangeInputState();