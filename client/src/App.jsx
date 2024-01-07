import React, { Suspense, lazy } from "react";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import AuthProvider from "./context/auth";
import ProtectedRoutes from "./routes";

import AdminShopkeeperProduct from "./AdminComponents/AdminShopKeeperProduct/AdminShopkeeperProduct";
import AdminStats from "./AdminComponents/AdminStats/AdminStats";
import Allnews from "./AdminComponents/AllNews/Allnews";
import LateOrdersPage from "./AdminComponents/LateOrdersPage/LateOrdersPage";
import MakeModarator from "./AdminComponents/MakeModarator/MakeModarator";
import ManageModarator from "./AdminComponents/ManageModarator/ManageModarator";
import BestSellProduct from "./AdminComponents/Product/BestSellProduct/BestSellProduct";
import TagOrderHistory from "./AdminComponents/TagOrderHistory/TagOrderHistory";
import TagUserOrderHistory from "./AdminComponents/TagOrderHistory/TagUserOrderHistory";
import TagShopKeeper from "./AdminComponents/TagShopkeeper/TagShopKeeper";
import IndividualMessagePage from "./components/IndividualMessagePage/IndividualMessagePage";
import LoadingPage from "./components/LodingPage/LoadingPage";
import Footer from "./components/MainComponent/Footer";
import Header from "./components/MainComponent/Header";
import Offcanvas from "./components/MainComponent/Header/Offcanvas";
import ShopkeeperProfileCV from "./components/Shopkeeper/ShopkeeperProfileCV/ShopkeeperProfileCV";
import ShopkeepersProduct from "./components/Shopkeeper/ShopkeepersProduct/ShopkeepersProduct";
import TagUser from "./components/TagUser/TagUser";
import ReferCodeGenerator from "./helpers/ReferCodeGenerator";
import { DefaultLayout } from "./layouts";
import AddProductForm from "./pages/AddProductForm/AddProductForm";
import AddShopperProduct from "./pages/AddShopperProduct/AddShopperProduct";
import AddCatagoryForm from "./pages/Form/AddCatagoryForm/AddCatagoryForm";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import ShopperOrderHistory from "./pages/Order/OrderHistory/ShopperOrderHistory";
import OrderModal from "./pages/Order/OrderModal/OrderModal";
import OrderDetailsShopper from "./pages/OrderShopper/OrderModal";
import OrderShopper from "./pages/OrderShopper/OrderShopper";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import Policy from "./pages/Policy/Policy";
import RegisterShopper from "./pages/Register/RegisterShopper/RegisterShopper";
import ShopKeeperDashBoard from "./pages/ShopkeeperDashboard/ShopKeeperDashBoard";
import AdminProtactedRoutes from "./routes/AdminProtactedRoutes";

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
const AdminPage = lazy(() => import("./pages/AdminPage/Admin"));
const AllProductAdmin = lazy(() =>
	import("./AdminComponents/Product/AllProduct/AllProductAdmin")
);

const PROTECTED_ROUTES = [
	// {
	// 	id: 1,
	// 	name: "Home",
	// 	path: "/home",
	// 	element: Home,
	// 	access: ["admin", "customer", "shopper", "modarator"],
	// },
	// {
	// 	id: 5,
	// 	name: "Shop",
	// 	path: "/shop",
	// 	element: Shop,
	// 	access: ["admin", "customer", "shopper"],
	// },
	// {
	// 	id: 6,
	// 	name: "Product",
	// 	path: "/product/:id",
	// 	element: Product,
	// 	access: ["admin", "customer", "shopper"],
	// },
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
		path: "/search/:keyword",
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
		name: "Order Shopper",
		path: "/orderShopper",
		element: OrderShopper,
		access: ["admin", "shopper"],
	},
	// {
	// 	id: 18,
	// 	name: "ShopkeeperProfileCV",
	// 	path: "/shopkeeperProfileCV/:id",
	// 	element: ShopkeeperProfileCV,
	// 	access: ["admin", "customer", "shopper"],
	// },

	{
		id: 19,
		name: "orderStatus",
		path: "/orderStatus",
		element: OrderStatus,
		access: ["admin", "customer", "shopper"],
	},
	// {
	// 	id: 20,
	// 	name: "AddProductForm",
	// 	path: "/addproduct",
	// 	element: AddProductForm,
	// 	access: ["admin"],
	// },
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
	// {
	// 	id: 26,
	// 	name: "HeroSlider",
	// 	path: "/addheroslider",
	// 	element: HeroSlider,
	// 	access: ["admin"],
	// },
	{
		id: 27,
		name: "Order Details",
		path: "/orderDetails/:id",
		element: OrderModal,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 30,
		name: "Order Details Shoper",
		path: "/orderShoperDetails/:id",
		element: OrderDetailsShopper,
		access: ["admin", "shopper"],
	},
	{
		id: 31,
		name: "Order History Shoper",
		path: "/ordersHistoryDetails/:id",
		element: ShopperOrderHistory,
		access: ["admin", "shopper"],
	},
	{
		id: 32,
		name: "IndividualMessagePage",
		path: "/individualMessagePage",
		element: IndividualMessagePage,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 29,
		name: "Refer Page",
		path: "/referPage",
		element: ReferCodeGenerator,
		access: ["admin", "customer", "shopper"],
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
		path: "/register/:id",
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
		path: "/product/:id",
		element: Product,
	},
	{
		path: "/shopkeeperProfileCV/:id",
		element: ShopkeeperProfileCV,
	},
	{
		path: "/home",
		element: Home,
	},
	{
		path: "/Policy",
		element: Policy,
	},
	{
		path: "/shop",
		element: Shop,
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
const ADMIN_ROUTES = [
	{
		id: 27,
		name: "Admin Stats",
		path: "/admin/stat",
		element: AdminStats,
		access: ["admin"],
	},
	{
		id: 1,
		name: "AddCatagoryForm",
		path: "/addcategory",
		element: AddCatagoryForm,
		access: ["admin"],
	},
	{
		id: 2,
		name: "AddProductForm",
		path: "/addproduct",
		element: AddProductForm,
		access: ["admin"],
	},
	{
		id: 3,
		name: "TagUser",
		path: "/tagUser",
		element: TagUser,
		access: ["admin"],
	},
	{
		id: 4,
		name: "TagUser",
		path: "/tagShopkeeper",
		element: TagShopKeeper,
		access: ["admin"],
	},
	{
		id: 5,
		name: "TagShoer",
		path: "/tagShopkeeper",
		element: TagShopKeeper,
		access: ["admin"],
	},
	{
		id: 6,
		name: "AllAdminProduct",
		path: "/allAdminProduct",
		element: AllProductAdmin,
		access: ["admin"],
	},
	{
		id: 7,
		name: "HeroSlider",
		path: "/addheroslider",
		element: HeroSlider,
		access: ["admin"],
	},
	{
		id: 8,
		name: "Best Sell",
		path: "/bestsellProduct",
		element: BestSellProduct,
		access: ["admin"],
	},
	{
		id: 10,
		name: "ShopKeepoper Product",
		path: "/shopkeeperProduct/:id",
		element: AdminShopkeeperProduct,
		access: ["admin"],
	},
	{
		id: 11,
		name: "Order History",
		path: "/tagorderhistory/:id",
		element: TagOrderHistory,
		access: ["admin"],
	},
	{
		id: 12,
		name: "Order History",
		path: "/taguserorderhistory/:id",
		element: TagUserOrderHistory,
		access: ["admin"],
	},
	{
		id: 13,
		name: "All Newa",
		path: "/allnews",
		element: Allnews,
		access: ["admin"],
	},
	{
		id: 14,
		name: "Make Modarator",
		path: "/manageModarator",
		element: ManageModarator,
		access: ["admin"],
	},
	{
		id: 15,
		name: "Make Modarator",
		path: "/lateorderSubmition",
		element: LateOrdersPage,
		access: ["admin"],
	},
];

function App() {
	const isadminPage = "admin";
	return (
		// show header and footer

		<Router>
			{!isadminPage && <Header />}
			{!isadminPage && <Offcanvas />}
			{!isadminPage && <Footer />}
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoutes />}>
						{PROTECTED_ROUTES?.map((route) => (
							<Route
								key={route?.path}
								path={`${route?.path}/*`}
								element={
									<Suspense
										fallback={<LoadingPage></LoadingPage>}
									>
										<route.element />
									</Suspense>
								}
							/>
						))}
					</Route>
					<Route element={<AdminProtactedRoutes />}>
						{ADMIN_ROUTES?.map((route) => (
							<Route
								key={route?.path}
								path={`${route?.path}/*`}
								element={
									<Suspense
										fallback={
											<div>
												<LoadingPage></LoadingPage>
											</div>
										}
									>
										<route.element />
									</Suspense>
								}
							/>
						))}
					</Route>

					{PUBLIC_ROUTES?.map((route) => (
						<Route
							key={route?.path}
							path={`${route?.path}/*`}
							element={
								<Suspense
									fallback={
										<div>
											<LoadingPage></LoadingPage>
										</div>
									}
								>
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
export { ADMIN_ROUTES, PROTECTED_ROUTES };
