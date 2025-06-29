# fetchPostList API Documentation

The `fetchPostList` function provides a flexible interface to fetch car listings from the Go backend API with support for filtering, ordering, limiting, and excluding specific posts.

## Full Example

```typescript
import { fetchPostList } from './fetchPostList';
import { FilterHelpers } from '$lib/utils/filterHelpers';
import { OrderField, OrderDirection, OrderingHelpers } from '$lib/utils/orderingHelpers';

// Advanced search with all available parameters
const complexQuery = await fetchPostList({
	filters: {
		brand: FilterHelpers.brandFilter('mercedes'),
		model: FilterHelpers.modelFilter('e-class'),
		year: FilterHelpers.yearRange(2018, 2023),
		price: FilterHelpers.priceRange(25000, 60000),
		km: FilterHelpers.kmRange(undefined, 100000),
		power: FilterHelpers.powerRange(200, 400),
		range: FilterHelpers.electricRange(300, 600),
		bodyType: FilterHelpers.bodyTypeFilter('sedan')
	},
	ordering: OrderingHelpers.byFieldAndDirection(OrderField.PRICE, OrderDirection.ASC),
	excludedIds: [15, 28, 44, 102],
	limit: 20
});
```
