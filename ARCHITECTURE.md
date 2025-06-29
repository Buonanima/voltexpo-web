# VoltExpo Architecture Guide

## Overview

This document outlines the architectural principles and patterns used in the VoltExpo SvelteKit application. Our architecture prioritizes **performance**, **maintainability**, and **scalability** while leveraging modern web development best practices.

### Core Principles

1. **Server-First Architecture**: Prioritize server-side rendering for optimal performance and SEO
2. **State Isolation**: Prevent state bleeding through scoped state management
3. **Props-Down Data Flow**: Unidirectional data flow with clear ownership boundaries
4. **Progressive Enhancement**: Applications work without JavaScript, enhanced with client-side interactivity
5. **Type Safety**: Comprehensive TypeScript integration throughout the application

## 1. SvelteKit SSR Architecture

### Server-Side Rendering Lifecycle

SvelteKit follows a predictable server-to-client data transfer pattern:

```
1. Server: +page.server.ts runs → loads data
2. Server: Renders HTML with data
3. Client: Receives HTML + serialized data
4. Client: Hydrates components with server data
```

**Key Principle**: Data loaded on server should be available immediately on client without additional API calls.

### Data Loading Strategy

#### Server-Side Loading (+page.server.ts)

```typescript
export const load: PageServerLoad = async ({ url, params }) => {
	// Parse URL parameters for initial state
	const filters = parseFiltersFromUrl(url.searchParams);

	// Parallel data fetching
	const [brands, models, posts] = await Promise.allSettled([
		getBrandsList(), // Always needed
		filters.brandId ? getModelsById(filters.brandId) : [], // Conditional
		fetchPostList({ filters }) // Based on filters
	]);

	return {
		availableBrands: brands.value?.data || [],
		availableModels: models.value?.data || [],
		searchResults: posts.value || { data: [], total: 0 }
	};
};
```

#### Data Serialization and Hydration

```typescript
// Server serializes data automatically
// +page.svelte receives it as props
const { data } = $props<{ data: PageData }>();

// Initialize client state with server data
let availableBrands = $state(data.availableBrands || []);
let availableModels = $state(data.availableModels || []);
```

### Performance Goals

- **✅ IDEAL**: Server loads, client uses
- **❌ WASTEFUL**: Server loads → Client reloads (duplicate API calls)

**Expected Behavior**: No loading spinners for server-preloaded data.

## 2. State Management Principles

### Svelte 5 Runes Patterns

#### $state() Rune Usage

```typescript
// Component-local reactive state
let isOpen = $state(false);
let searchText = $state('');

// Complex state objects
let filterState = $state({
	selectedBrand: null,
	selectedModel: null,
	disabled: true
});

// Scoped state for feature areas
export const homeFilterState = $state<{
	selectedBrand: Brand | null;
	selectedModel: Model | null;
}>({
	selectedBrand: null,
	selectedModel: null
});
```

#### $derived() Rune Patterns

```typescript
// Computed values with automatic dependency tracking
const filteredBrands = $derived(
	searchText
		? brands.filter((brand) => brand.brand_name.toLowerCase().includes(searchText.toLowerCase()))
		: brands
);

// Complex aggregations
const pageTitle = $derived.by(() => {
	const { brand, model } = filterState;
	if (brand && model) return `${brand.name} ${model.name} Electric Cars`;
	if (brand) return `${brand.name} Electric Cars`;
	return 'Electric Cars';
});
```

#### $effect() Rune Patterns

```typescript
// Side effects and async operations
$effect(() => {
	if (selectedBrandId && !modelsLoading) {
		loadModelsForBrand(selectedBrandId);
	}
});

// URL synchronization
$effect(() => {
	if (filtersChanged) {
		updateUrlParams(currentFilters);
	}
});

// Cleanup and reset
$effect(() => {
	if (!isOpen) {
		searchText = '';
	}
});
```

### State Bleeding Prevention

**State Bleeding**: When shared global state persists across page contexts, causing inconsistent behavior.

#### ❌ Problematic Pattern

```typescript
// Global state shared across pages
export const globalCardState = $state({
	models: [],
	loading: false
});

// Auto-loading side effects
loadModels().then(); // Called on every module import!
```

#### ✅ Solution Pattern

```typescript
// Scoped state per feature/page
export const homeFilterState = $state({ /* ... */ });
export const searchFilterState = $state({ /* ... */ });

// Props-down data flow
<Component
  data={serverLoadedData}
  onUpdate={handleUpdate}
/>
```

### Component State Organization (.svelte.ts Pattern)

Each major component should have a corresponding `.svelte.ts` file for state management:

```
Component.svelte          # Presentation and user interaction
Component.svelte.ts       # State management and business logic
```

**Example Structure:**

```typescript
// BrandCard.svelte.ts
class BrandCardState {
	searchText = $state('');
	selectedBrand = $state<Brand | null>(null);

	get filteredBrands() {
		return this.searchText ? this.brands.filter(/* ... */) : this.brands;
	}

	selectBrand(brand: Brand) {
		this.selectedBrand = brand;
	}
}

export const brandCardState = new BrandCardState();
```

## 3. Component Architecture Patterns

### Props-Down Data Flow

Components receive all data as props and communicate changes through callback functions:

```typescript
// Parent component manages data and state
let availableBrands = $state(serverData.brands);
let brandsLoading = $state(false);
let brandsError = $state(false);

async function handleLoadBrands() {
  brandsLoading = true;
  try {
    const { data } = await getBrandsList();
    availableBrands = data;
  } catch (error) {
    brandsError = true;
  } finally {
    brandsLoading = false;
  }
}

// Child component receives data and callbacks
<BrandCard
  brands={availableBrands}
  loading={brandsLoading}
  error={brandsError}
  onSelect={handleBrandSelect}
  onRetry={handleLoadBrands}
/>
```

### Component Responsibilities

#### Data Provider Components (Page Level)

- **Own Data**: Manage all data loading and async states
- **Handle Errors**: Implement retry logic and error states
- **Coordinate State**: Synchronize multiple related data sources

#### Presentational Components

- **Receive Props**: Accept data and callback functions
- **Emit Events**: Communicate user interactions through callbacks
- **Local UI State**: Manage only presentation-related state (modals, animations)

### File Organization Principles

```
feature/
├── FeatureMain.svelte           # Main component orchestrator
├── featureState.svelte.ts       # Feature-scoped state management
├── components/                  # Feature-specific components
│   ├── ComponentA.svelte
│   ├── ComponentA.svelte.ts     # Component state if needed
│   └── ComponentB.svelte
├── shared/                      # Reusable utilities
│   ├── utils.ts
│   └── types.ts
└── types.ts                     # Feature type definitions
```

## 4. Server vs Client Loading Strategy

### Decision Tree

```
Data Loading Decision:
├── Always needed on page load?
│   ├── Yes → Server load (brands, categories)
│   └── No → Client load on demand
├── Derivable from URL?
│   ├── Yes → Server load (models from brand param)
│   └── No → Client load on interaction
├── Large dataset?
│   ├── Yes → Client load with pagination
│   └── No → Server load for instant access
```

### Server Loading (Primary Strategy)

**When to Use:**

- Data frequently accessed by users
- Data that can be pre-determined from URL parameters
- Small to medium datasets that improve perceived performance

**Implementation:**

```typescript
// +page.server.ts
export async function load({ url }) {
	const tasks = [];

	// Always load core data
	tasks.push(getBrandsList());

	// Conditionally load based on URL
	const brandSlug = url.searchParams.get('brand');
	if (brandSlug) {
		tasks.push(getModelsForBrand(brandSlug));
	}

	const results = await Promise.allSettled(tasks);
	return {
		brands: results[0].value || [],
		models: results[1]?.value || []
	};
}
```

### Client Loading (Secondary Strategy)

**When to Use:**

- User-specific data that varies per session
- Large datasets that would slow server response
- Data that changes frequently during user interaction

**Implementation:**

```typescript
// Fallback loading
$effect(() => {
	if (serverData.length === 0 && !loading && !error) {
		loadDataOnClient();
	}
});

// Interactive loading
async function handleUserInteraction() {
	loading = true;
	try {
		const newData = await fetchData();
		updateLocalState(newData);
	} catch (error) {
		handleError(error);
	} finally {
		loading = false;
	}
}
```

### Progressive Enhancement

Start with server data, enhance with client capabilities:

```typescript
// Initialize with server data (immediate availability)
let data = $state(serverData);

// Enhance with real-time updates
$effect(() => {
	if (userInteracted) {
		subscribeToRealtimeUpdates();
	}
});

// Graceful degradation
$effect(() => {
	if (!browserSupportsFeature) {
		fallbackToBasicFunctionality();
	}
});
```

## 5. Development Patterns & Best Practices

### Type Safety Implementation

```typescript
// Comprehensive interfaces
interface PageData {
	availableBrands: Brand[];
	availableModels: Model[];
	searchResults: PostSearchResult;
}

// Props typing
const { brands, onSelect, onRetry } = $props<{
	brands: Brand[];
	onSelect: (brand: Brand) => void;
	onRetry?: () => void;
}>();

// State typing
let filterState = $state<{
	selectedBrand: Brand | null;
	selectedModel: Model | null;
}>({
	selectedBrand: null,
	selectedModel: null
});
```

### Error Handling Patterns

```typescript
// Graceful error boundaries
$effect(() => {
	if (error && !hasShownError) {
		showErrorNotification(error.message);
		hasShownError = true;
	}
});

// Retry mechanisms
async function handleRetry() {
	error = null;
	loading = true;
	try {
		await refetchData();
	} catch (newError) {
		error = newError;
	} finally {
		loading = false;
	}
}

// Fallback data
const safeData = $derived(data || fallbackData || []);
```

### Performance Monitoring

```typescript
// Loading performance tracking
console.time('page-ready');
$effect(() => {
	if (allCriticalDataLoaded) {
		console.timeEnd('page-ready'); // Target: <100ms
	}
});

// State change monitoring
$effect(() => {
	if (DEV) {
		console.log('State updated:', {
			component: 'ComponentName',
			state: getCurrentState()
		});
	}
});
```

## 6. Implementation Guidelines

### Adding New Features

1. **Plan Data Flow**: Identify what data is needed and when
2. **Choose Loading Strategy**: Server vs client based on usage patterns
3. **Create State Structure**: Use .svelte.ts pattern for complex state
4. **Implement Props-Down**: Parent manages data, children receive props
5. **Add Error Handling**: Implement loading states and retry logic
6. **Type Everything**: Comprehensive TypeScript interfaces

### Common Pitfalls to Avoid

❌ **Global State Overuse**

```typescript
// Don't: Shared global state across features
export const globalAppState = $state({
	/* everything */
});
```

✅ **Scoped State Management**

```typescript
// Do: Feature-scoped state
export const featureState = $state({
	/* feature-specific */
});
```

❌ **Client-Side Duplication**

```typescript
// Don't: Load on server AND client
const serverData = await loadOnServer();
const clientData = await loadOnClient(); // Duplicate!
```

✅ **Smart Loading Strategy**

```typescript
// Do: Server loads, client uses fallback only
const data = serverData || (await fallbackLoad());
```

### Code Review Checklist

- [ ] Server data passed as props to components
- [ ] No global state shared between unrelated features
- [ ] Error states and loading states properly handled
- [ ] TypeScript interfaces for all props and state
- [ ] No duplicate API calls (server + client)
- [ ] Proper use of Svelte 5 runes ($state, $derived, $effect)
- [ ] Component responsibilities clearly separated

## 7. Migration Patterns

### From Global State to Props-Down

```typescript
// Before: Global state dependency
export const globalState = $state({ data: [] });

// Component uses global state
<Component />

// After: Props-down pattern
let localData = $state(serverData);

<Component
  data={localData}
  onUpdate={handleUpdate}
/>
```

### From Client Loading to SSR

```typescript
// Before: Client-only loading
$effect(() => {
	loadData().then(setData);
});

// After: SSR with client fallback
// +page.server.ts
export async function load() {
	return { data: await loadData() };
}

// +page.svelte
let data = $state(serverData.data);
$effect(() => {
	if (data.length === 0) {
		// Fallback only if server failed
		loadData().then(setData);
	}
});
```

## Conclusion

This architecture provides a foundation for building performant, maintainable SvelteKit applications. By following these patterns, we ensure:

- **Predictable Performance**: Consistent loading times through SSR optimization
- **Maintainable Code**: Clear separation of concerns and scoped state management
- **Type Safety**: Comprehensive TypeScript integration
- **Scalability**: Patterns that work for simple components and complex features
- **Developer Experience**: Clear guidelines for implementation and code review

For feature-specific implementation details, refer to the relevant documentation in each feature directory:

- **Filter System**: [Filter Implementation Guide](src/lib/components/filters/filter_DOCS.md) - Comprehensive guide to the filter system architecture and implementation
- **API Layer**: [API Documentation](src/lib/api/) - Server-side data fetching patterns
- **Component Library**: [Component Documentation](src/lib/components/) - Reusable component patterns
