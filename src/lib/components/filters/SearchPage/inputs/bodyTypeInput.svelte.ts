// State for BodyTypeInput component using Svelte 5 runes

class BodyTypeInputState {
	selectedBodyType = $state<string | null>(null);

	// Reset all values
	reset() {
		this.selectedBodyType = null;
	}

	// Get current value
	get value() {
		return this.selectedBodyType;
	}

	// Check if any value is set
	get hasValue() {
		return this.selectedBodyType !== null;
	}
}

// Export singleton instance
export const bodyTypeInputSvelte = new BodyTypeInputState();