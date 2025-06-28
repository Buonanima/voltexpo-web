// State for BodyTypeInput component using Svelte 5 runes
import type { BodyType } from '../../cards/bodyTypeCard.svelte.js';

class BodyTypeInputState {
	selectedBodyType = $state<BodyType | null>(null);

	// Reset all values
	reset() {
		this.selectedBodyType = null;
	}

	// Get current value
	get value() {
		return this.selectedBodyType?.value || null;
	}

	// Check if any value is set
	get hasValue() {
		return this.selectedBodyType !== null;
	}

	// Get display value
	get displayValue() {
		return this.selectedBodyType?.value || '';
	}
}

// Export singleton instance
export const bodyTypeInputSvelte = new BodyTypeInputState();