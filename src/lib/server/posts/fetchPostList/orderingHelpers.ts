// orderingHelpers.ts

export enum OrderField {
	PRICE = 'price',
	VIEWS = 'views',
	TIME_POSTED = 'time_posted',
	// Add more fields as needed
}

export enum OrderDirection {
	ASC = 'asc',
	DESC = 'desc',
}

export const OrderingHelpers = {
	byFieldAndDirection: (field: OrderField, direction: OrderDirection) => ({
		field,
		order: direction
	})
};
