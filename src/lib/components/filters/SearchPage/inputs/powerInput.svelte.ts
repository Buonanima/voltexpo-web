// State for PowerInput component using Svelte 5 runes

class PowerInputState {
	fromPower = $state<number | null>(null);
	toPower = $state<number | null>(null);

	// Reset all values
	reset() {
		this.fromPower = null;
		this.toPower = null;
	}

	// Get current values as an object
	get values() {
		return {
			from: this.fromPower,
			to: this.toPower
		};
	}

	// Check if any value is set
	get hasValues() {
		return this.fromPower !== null || this.toPower !== null;
	}
}

// Export singleton instance
export const powerInputSvelte = new PowerInputState();
