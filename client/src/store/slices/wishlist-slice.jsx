import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState: {
		wishlistItems: [],
	},
	reducers: {
		addToWishlist(state, action) {
			const isInWishlist = state.wishlistItems.findIndex(
				(item) => item.id === action.payload.id
			);
			if (isInWishlist > -1) {
				toast.info("Product already in wishlist", {
					position: "bottom-left",
				});
			} else {
				state.wishlistItems.push(action.payload);
				toast.success("Added To wishlist", {
					position: "bottom-left",
				});
			}
		},
		deleteFromWishlist(state, action) {
			state.wishlistItems = state.wishlistItems.filter(
				(item) => item.id !== action.payload
			);
			toast.error("Removed From Wishlist", {
				position: "bottom-left",
			});
		},
		deleteAllFromWishlist(state) {
			state.wishlistItems = [];
		},
	},
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } =
	wishlistSlice.actions;
export default wishlistSlice.reducer;
