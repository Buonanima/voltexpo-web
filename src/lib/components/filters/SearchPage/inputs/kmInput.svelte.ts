// State for KmInput component using Svelte 5 runes

class KmInputState {
	fromKm = $state<number | null>(null);
	toKm = $state<number | null>(null);

	// Reset all values
	reset() {
		this.fromKm = null;
		this.toKm = null;
	}

	// Get current values as an object
	get values() {
		return {
			from: this.fromKm,
			to: this.toKm
		};
	}

	// Check if any value is set
	get hasValues() {
		return this.fromKm !== null || this.toKm !== null;
	}
}

// Export singleton instance
export const kmInputSvelte = new KmInputState();