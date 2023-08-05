import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slices/cart-slice";
import productReducer from "./slices/product-slice";
import wishlistReducer from "./slices/wishlist-slice";

const persistConfig = {
	key: "flone",
	version: 1.1,
	storage,
};

export const rootReducer = combineReducers({
	product: productReducer,
	cart: cartReducer,
	wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);
