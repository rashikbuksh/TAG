import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		addToCart(state, action) {
			const product = action.payload;
			if (!product) {
				const cartItem = state.cartItems.find(
					(item) => item.id === product.id
				);
				if (!cartItem) {
					state.cartItems.push({
						...product,
						quantity: product.quantity ? product.quantity : 1,
						cartItemId: uuidv4(),
					});
				} else {
					state.cartItems = state.cartItems.map((item) => {
						if (item.cartItemId === cartItem.cartItemId) {
							return {
								...item,
								quantity: product.quantity
									? item.quantity + product.quantity
									: item.quantity + 1,
							};
						}
						return item;
					});
				}
			} else {
				const cartItem = state.cartItems.find(
					(item) =>
						item.id === product.id &&
						// product.selectedProductColor &&
						// product.selectedProductColor ===
						// 	item.selectedProductColor &&
						(product.cartItemId
							? product.cartItemId === item.cartItemId
							: true)
				);
				if (!cartItem) {
					state.cartItems.push({
						...product,
						quantity: product.quantity ? product.quantity : 1,
						cartItemId: uuidv4(),
					});
				} else if (
					cartItem !== undefined
					// &&
					// cartItem.selectedProductColor !==
					// 	product.selectedProductColor
				) {
					state.cartItems = [
						...state.cartItems,
						{
							...product,
							quantity: product.quantity ? product.quantity : 1,
							cartItemId: uuidv4(),
						},
					];
				} else {
					state.cartItems = state.cartItems.map((item) => {
						if (item.cartItemId === cartItem.cartItemId) {
							return {
								...item,
								quantity: product.quantity
									? item.quantity + product.quantity
									: item.quantity + 1,
								// selectedProductColor:
								// 	product.selectedProductColor,
							};
						}
						return item;
					});
				}
			}

			toast.success("Added To Cart", { position: "bottom-left" });
		},
		deleteFromCart(state, action) {
			const product = action.payload;
			state.cartItems = state.cartItems.filter(
				(item) => item.cartItemId !== product.cartItemId
			);
			toast.error("Removed From Cart", { position: "bottom-left" });
		},
		decreaseQuantity(state, action) {
			const product = action.payload;
			if (product.quantity === 1) {
				state.cartItems = state.cartItems.filter(
					(item) => item.cartItemId !== product.cartItemId
				);
				toast.error("Removed From Cart", { position: "bottom-left" });
			} else {
				state.cartItems = state.cartItems.map((item) =>
					item.cartItemId === product.cartItemId
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			}
		},
		increaseQuantity(state, action) {
			const product = action.payload;
			state.cartItems = state.cartItems.map((item) =>
				item.id == product.cartItem.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		},
		increaseQuantityofProd(state, action) {
			const product = action.payload;
			state.cartItems = state.cartItems.map((item) =>
				item.id == product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		},
		deleteAllFromCart(state) {
			state.cartItems = [];
		},
	},
});

export const {
	addToCart,
	deleteFromCart,
	decreaseQuantity,
	deleteAllFromCart,
	increaseQuantity,
	increaseQuantityofProd,
} = cartSlice.actions;
export default cartSlice.reducer;
