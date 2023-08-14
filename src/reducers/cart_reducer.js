import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;

		const tempItem = state.cart.find((i) => {
			i.id === id + color;
		});
		if (tempItem) {
			const curcart = state.cart.map((item) => {
				if (item.id == id + color) {
					return {
						...item,
						amount: Math.min(max, item.amount + amount),
					};
				} else return item;
			});
			return { ...state, cart: curcart };
		} else {
			const newItem = {
				color,
				amount,
				name: product.name,
				image: product.images[0].url,
				id: id + color,
				price: product.price,
				max: product.stock,
			};
			return {
				...state,
				cart: [...state.cart, newItem],
				total_items: state.total_items + 1,
				total_amount: state.total_amount + amount,
			};
		}
	}
	if (action.type === REMOVE_CART_ITEM) {
		const tempCart = state.cart.filter(
			(item) => item.id !== action.payload
		);
		return { ...state, cart: tempCart };
	}
	if (action.type === CLEAR_CART) return { ...state, cart: [] };
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				const tempItem = { ...item };

				if (value === "inc") {
					tempItem.amount = Math.min(item.max, item.amount + 1);
				} else {
					tempItem.amount = Math.max(1, item.amount - 1);
				}
				return tempItem;
			} else return item;
		});

		return { ...state, cart: tempCart };
	}
	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { amount, price } = cartItem;
				total.total_items += amount;
				total.total_amount += amount * price;
				return total;
			},
			{ total_items: 0, total_amount: 0 }
		);
		return { ...state, total_amount, total_items };
	}
	return state;
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
