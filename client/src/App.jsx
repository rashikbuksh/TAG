import React, { Suspense, lazy } from "react";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import AuthProvider from "./context/auth";
import ProtectedRoutes from "./routes";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Offcanvas from "./components/Header/Offcanvas";
import ShopkeeperProfileCV from "./components/ShopkeeperProfileCV/ShopkeeperProfileCV";
import ShopkeepersProduct from "./components/ShopkeepersProduct/ShopkeepersProduct";
import { DefaultLayout } from "./layouts";
import AddCatagoryForm from "./pages/AddCatagoryForm/AddCatagoryForm";
import AddProductForm from "./pages/AddProductForm/AddProductForm";
import AddShopperProduct from "./pages/AddShopperProduct/AddShopperProduct";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import OrderSingle from "./pages/OrderSingle/OrderSingle";
import RegisterShopper from "./pages/RegisterShopper/RegisterShopper";
import ShopKeeperDashBoard from "./pages/ShopkeeperDashboard/ShopKeeperDashBoard";

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Product = lazy(() => import("./pages/Product"));
const Chat = lazy(() => import("./pages/Chat"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Notification = lazy(() => import("./pages/Notification"));
const Contact = lazy(() => import("./pages/Contact"));
const Order = lazy(() => import("./pages/Order"));
const HeroSlider = lazy(() => import("./pages/hero-slider/HeroSlider"));

const PROTECTED_ROUTES = [
	{
		id: 1,
		name: "Home",
		path: "/home",
		element: Home,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 5,
		name: "Shop",
		path: "/shop",
		element: Shop,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 6,
		name: "Product",
		path: "/product/:id",
		element: Product,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 7,
		name: "Chat",
		path: "/chat",
		element: Chat,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 8,
		name: "Cart",
		path: "/cart",
		element: Cart,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 9,
		name: "Wishlist",
		path: "/wishlist",
		element: Wishlist,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 10,
		name: "Checkout",
		path: "/checkout",
		element: Checkout,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 11,
		name: "Search",
		path: "/search",
		element: Search,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 12,
		name: "Profile",
		path: "/profile",
		element: Profile,
		access: ["admin", "customer"],
	},
	{
		id: 13,
		name: "Edit Profile",
		path: "/edit-profile",
		element: EditProfile,
		access: ["admin", "customer"],
	},
	{
		id: 14,
		name: "Notification",
		path: "/notification",
		element: Notification,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 15,
		name: "Contact",
		path: "/contact",
		element: Contact,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 16,
		name: "Order",
		path: "/order",
		element: Order,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 17,
		name: "Order Single",
		path: "/order/:id",
		element: OrderSingle,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 18,
		name: "ShopkeeperProfileCV",
		path: "/shopkeeperProfileCV/:id",
		element: ShopkeeperProfileCV,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 19,
		name: "AddCatagoryForm",
		path: "/addcategory",
		element: AddCatagoryForm,
		access: ["admin"],
	},
	{
		id: 20,
		name: "AddProductForm",
		path: "/addproduct",
		element: AddProductForm,
		access: ["admin"],
	},
	{
		id: 21,
		name: "AddShopperProduct",
		path: "/addshopperproduct",
		element: AddShopperProduct,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 22,
		name: "NewsFeed",
		path: "/newsfeed",
		element: NewsFeed,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 23,
		name: "ShopKeeperDashBoard",
		path: "/shopkeeperDashboard",
		element: ShopKeeperDashBoard,
		access: ["admin", "shopper"],
	},
	{
		id: 24,
		name: "ShopkeepersProduct",
		path: "/shopkeeperProduct",
		element: ShopkeepersProduct,
		access: ["admin", "shopper"],
	},
	{
		id: 26,
		name: "HeroSlider",
		path: "/addheroslider",
		element: HeroSlider,
		access: ["admin"],
	},
];

const PUBLIC_ROUTES = [
	{
		path: "/login",
		element: Login,
	},
	{
		path: "/register",
		element: Register,
	},
	{
		path: "/registershopper",
		element: RegisterShopper,
	},
	{
		path: "/",
		element: Welcome,
	},
	{
		path: "/no-access",
		element: NotFound,
	},
	{
		path: "*",
		element: NotFound,
	},
];

function App() {
	const isLoginPage = window.location.pathname === "/login";
	const isWelcomePage = window.location.pathname === "/";
	return (
		// show header and footer

		<Router>
			{!isLoginPage && !isWelcomePage && <Header />}
			{!isLoginPage && !isWelcomePage && <Offcanvas />}
			{!isLoginPage && !isWelcomePage && <Footer />}
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoutes />}>
						{PROTECTED_ROUTES?.map((route) => (
							<Route
								key={route?.path}
								path={route?.path}
								element={
									<Suspense fallback={<div>Loading...</div>}>
										<route.element />
									</Suspense>
								}
							/>
						))}
					</Route>
					{PUBLIC_ROUTES?.map((route) => (
						<Route
							key={route?.path}
							path={route?.path}
							element={
								<Suspense fallback={<div>Loading...</div>}>
									<route.element />
								</Suspense>
							}
						/>
					))}
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
export { PROTECTED_ROUTES };
