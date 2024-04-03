import "animate.css";
import axios from "axios";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "swiper/swiper-bundle.min.css";
import App from "./App";
import "./assets/scss/style.scss";
import "./index.css";
import PersistProvider from "./store/providers/persist-provider";
// import { setProducts } from "./store/slices/product-slice";
import { store } from "./store/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<PersistProvider>
			<div className="bg-[#FDFDFD] ">
				<App />
			</div>
		</PersistProvider>
	</Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
