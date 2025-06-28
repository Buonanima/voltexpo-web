// State for YearInput component using Svelte 5 runes

class YearInputState {
	fromYear = $state<number | null>(null);
	toYear = $state<number | null>(null);

	// Reset all values
	reset() {
		this.fromYear = null;
		this.toYear = null;
	}

	// Get current values as an object
	get values() {
		return {
			from: this.fromYear,
			to: this.toYear
		};
	}

	// Check if any value is set
	get hasValues() {
		return this.fromYear !== null || this.toYear !== null;
	}
}

// Export singleton instance
export const yearInputSvelte = new YearInputState();