import React, { Suspense, lazy, useEffect, useState } from "react";
import { IoCloudOffline } from "react-icons/io5";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminTagShopControl from "./AdminComponents/AdminTagShopControl/AdminTagShopControl";
import { NotificationProvider } from "./context/NotificationProvider";
import AuthProvider from "./context/auth";
import ProtectedRoutes from "./routes";
import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";
import LiveChat from "./pages/LiveChat/LiveChat";
import ContactSupport from "./pages/ContactAndSupport/ContactSupport";
import AddContact from "./pages/AddContact/AddContact";
import Settings from "./pages/Settings/Settings";
import AccountAndSecurity from "./pages/AccountAndSecurity/AccountAndSecurity";
import Password from "./pages/Password/Password";
import Verification from "./pages/VerificationCode/Verification";
import ProfileDetails from "./pages/ProfileDetails/ProfileDetails";
import SendVerification from "./pages/SendVerificationCode/SendVerification";
//tetet

const AdminNewShopRequest = lazy(() =>
	import("./AdminComponents/AdminNewShopRequest/AdminNewShopRequest")
);
const AdminShopkeeperProduct = lazy(() =>
	import("./AdminComponents/AdminShopKeeperProduct/AdminShopkeeperProduct")
);
const AdminStats = lazy(() =>
	import("./AdminComponents/AdminStats/AdminStats")
);
const Allnews = lazy(() => import("./AdminComponents/AllNews/Allnews"));
const LateOrdersPage = lazy(() =>
	import("./AdminComponents/LateOrdersPage/LateOrdersPage")
);
const MakeModarator = lazy(() =>
	import("./AdminComponents/MakeModarator/MakeModarator")
);
const ManageModarator = lazy(() =>
	import("./AdminComponents/ManageModarator/ManageModarator")
);
const BestSellProduct = lazy(() =>
	import("./AdminComponents/Product/BestSellProduct/BestSellProduct")
);
const TagOrderHistory = lazy(() =>
	import("./AdminComponents/TagOrderHistory/TagOrderHistory")
);
const TagUserOrderHistory = lazy(() =>
	import("./AdminComponents/TagOrderHistory/TagUserOrderHistory")
);
const TagShopKeeper = lazy(() =>
	import("./AdminComponents/TagShopkeeper/TagShopKeeper")
);
const IndividualMessagePage = lazy(() =>
	import("./components/IndividualMessagePage/IndividualMessagePage")
);
const LoadingPage = lazy(() => import("./components/LoadingPage/LoadingPage"));
const ShopkeeperProfileCV = lazy(() =>
	import("./components/Shopkeeper/ShopkeeperProfileCV/ShopkeeperProfileCV")
);
const ShopkeepersProduct = lazy(() =>
	import("./components/Shopkeeper/ShopkeepersProduct/ShopkeepersProduct")
);
const ShopperWaitingPage = lazy(() =>
	import("./components/ShopperWaitngPage/ShopperWaitingPage")
);
const TagUser = lazy(() => import("./components/TagUser/TagUser"));
const Offcanvas = lazy(() =>
	import("./components/MainComponent/Header/Offcanvas")
);
const Footer = lazy(() => import("./components/MainComponent/Footer"));
const Header = lazy(() => import("./components/MainComponent/Header"));
const OtpVerificationProvider = lazy(() => import("./context/otpVerification"));
const ReferCodeGenerator = lazy(() => import("./helpers/ReferCodeGenerator"));
const AddCatagoryForm = lazy(() =>
	import("./pages/Form/AddCatagoryForm/AddCatagoryForm")
);
const AddProductForm = lazy(() =>
	import("./pages/Form/AddProductForm/AddProductForm")
);
const AddShopperProduct = lazy(() =>
	import("./pages/Form/AddShopperProduct/AddShopperProduct")
);
const ShopperOrderHistory = lazy(() =>
	import("./pages/Order/OrderHistory/ShopperOrderHistory")
);

// ... rest of your code
const OrderModal = lazy(() => import("./pages/Order/OrderModal/OrderModal"));
const NewsFeed = lazy(() => import("./pages/NewsFeed/NewsFeed"));
const OrderDetailsShopper = lazy(() =>
	import("./pages/Order/OrderShopper/OrderModal")
);
const OrderShopper = lazy(() =>
	import("./pages/Order/OrderShopper/OrderShopper")
);
const OrderStatus = lazy(() => import("./pages/Order/OrderStatus/OrderStatus"));
const Policy = lazy(() => import("./pages/Policy/Policy"));
const RegisterShopper = lazy(() =>
	import("./pages/Register/RegisterShopper/RegisterShopper")
);
const ShopKeeperDashBoard = lazy(() =>
	import("./pages/ShopkeeperDashboard/ShopKeeperDashBoard")
);
const ShopkeeperSchedule = lazy(() =>
	import("./pages/ShopkeeperDashboard/ShopkeeperSchedule")
);
const VerificationOTP = lazy(() => import("./pages/VerificationOTP/Index"));
const AdminProtactedRoutes = lazy(() =>
	import("./routes/AdminProtactedRoutes")
);
const ModeratorProtactedRoutes = lazy(() =>
	import("./routes/ModaretorProtactedRoutes")
);

const AdminProductRequest = lazy(() =>
	import("./pages/AdminProductReqPage/AdminProductRequest")
);
const ProductRequest = lazy(() =>
	import("./pages/ProductRequest/ProductRequest")
);
const UpdateQuantity = lazy(() =>
	import("./pages/ProductRequest/UpdateQuantity")
);

const Welcome = lazy(() => import("./pages/Welcome"));
const Register = lazy(() =>
	import("./pages/Register/RegisterCustomer/Register")
);
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Product = lazy(() => import("./pages/Product"));
const Chat = lazy(() => import("./pages/Chat"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout2 = lazy(() => import("./pages/Checkout2/Checkout2"));
const COD = lazy(() => import("./pages/CashOnDelivery/CashOnDelivery"));
const PaymentGateway = lazy(() =>
	import("./pages/PaymentGateway/PaymentGateway")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Notification = lazy(() => import("./pages/Notification"));
const Contact = lazy(() => import("./pages/Contact"));
const Order = lazy(() => import("./pages/Order"));
const HeroSlider = lazy(() => import("./pages/hero-slider/HeroSlider"));
const AllProductAdmin = lazy(() =>
	import("./AdminComponents/Product/AllProduct/AllProductAdmin")
);

const PROTECTED_ROUTES = [
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
	// RUNNING
	{
		id: 10,
		name: "Checkout",
		path: "/checkout",
		element: Checkout2,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 12,
		name: "Profile",
		path: "/profile",
		element: Profile,
		access: ["admin", "customer", "shopper"],
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
		name: "Order History Shopper",
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
	{
		id: 32,
		name: "Shopkeeper Schedule",
		path: "/shopkeeperSchedule",
		element: ShopkeeperSchedule,
		access: ["admin", "shopper"],
	},
	{
		id: 33,
		name: "Cash On Delivery",
		path: "/cashOnDelivery",
		element: COD,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 34,
		name: " Payment Gateway",
		path: "/paymentGateway",
		element: PaymentGateway,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 35,
		name: " Product Request",
		path: "/productRequest",
		element: ProductRequest,
		access: ["admin", "shopper"],
	},
	{
		id: 35,
		name: " Update Quantity",
		path: "/updateProductQuantity/:id",
		element: UpdateQuantity,
		access: ["admin", "shopper"],
	},
	{
		id: 36,
		name: "Help and support",
		path: "/helpAndSupport",
		element: HelpAndSupport,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 37,
		name: "Live Chat",
		path: "/liveChat",
		element: LiveChat,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 38,
		name: "Contact and support",
		path: "/contactSupport",
		element: ContactSupport,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 39,
		name: "Add contact",
		path: "/addContact",
		element: AddContact,
		access: ["admin", "customer", "shopper"],
	},
	{
		id: 40,
		name: "Setting",
		path: "/settings",
		element: Settings,
		access: ["admin", "customer", "shopper"],
	},
	{
		id:41,
		name:"Account and Security",
		path:"/accountAndSecurity",
		element:AccountAndSecurity,
		access: ["admin", "customer", "shopper"],
	},
	{
		id:42,
		name:"Password",
		path:"/password",
		element:Password,
		access: ["admin", "customer", "shopper"],
	},
	{
		id:43,
		name:"Verification",
		path:"/verification",
		element:Verification,
		access: ["admin", "customer", "shopper"],
	},
	{
		id:44,
		name:"Profile details",
		path:"/profileDetails",
		element:ProfileDetails,
		access: ["admin", "customer", "shopper"],
	},{
		id:45,
		name:"Send verification code ",
		path:"/sendVerificationCode",
		element:SendVerification,
		access:["admin","customer","shopper"]
	}
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
		path: "/search/:keyword",
		element: Search,
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
		path: "/product/:id/:name",
		element: Product,
	},
	{
		path: "/shopkeeperProfileCV/:id",
		element: ShopkeeperProfileCV,
	},
	{
		path: "/shopper/:id/:name",
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
		path: "/shop/:params",
		element: Shop,
	},
	{
		path: "/OTPVerification",
		element: VerificationOTP,
	},
	{
		path: "/no-access",
		element: NotFound,
	},
	{
		path: "/waitForVerify",
		element: ShopperWaitingPage,
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
		name: "Late Orders Page",
		path: "/lateorderSubmition",
		element: LateOrdersPage,
		access: ["admin"],
	},
	{
		id: 16,
		name: "New Shop",
		path: "/newShopRequest",
		element: AdminNewShopRequest,
		access: ["admin"],
	},
	{
		id: 17,
		name: "Tag Store",
		path: "/tagStore",
		element: AdminTagShopControl,
		access: ["admin"],
	},
	{
		id: 18,
		name: "Stock product",
		path: "/stockProduct",
		element: AdminProductRequest,
		access: ["admin"],
	},
];
const MODERATORS_ROUTES = [
	{
		id: 1,
		name: "AddProductForm",
		path: "/moderator/addproduct",
		element: AddProductForm,
		access: ["moderator"],
	},
	{
		id: 2,
		name: "AllAdminProduct",
		path: "/moderator/allAdminProduct",
		element: AllProductAdmin,
		access: ["moderator"],
	},
	{
		id: 3,
		name: "Admin Stats",
		path: "/moderator/stat",
		element: AdminStats,
		access: ["moderator"],
	},
	{
		id: 4,
		name: "AddCatagoryForm",
		path: "/moderator/addcategory",
		element: AddCatagoryForm,
		access: ["moderator"],
	},
];

function App() {
	const [isOnline, setOnline] = useState(true);
	const isAdminPage = "admin";
	//check internet connection
	useEffect(() => {
		let internetConnection = window.navigator.onLine;

		if (!internetConnection) {
			setOnline(false);
		}

		window.addEventListener("online", (connect) => {
			console.log(connect.type);
			if (connect.type == "online") {
				setOnline(true);
			}
			console.log("Became online");
		});
		window.addEventListener("offline", (connect) => {
			if (connect.type == "offline") {
				setOnline(false);
			}
			console.log("Became offline");
		});
	}, []);

	return (
		// show header and footer

		<div>
			{isOnline ? (
				<Suspense fallback={<div>Loading...</div>}>
					<Router>
						{!isAdminPage && <Header />}
						{!isAdminPage && <Offcanvas />}
						{!isAdminPage && <Footer />}
						<AuthProvider>
							<NotificationProvider>
								<OtpVerificationProvider>
									<ToastContainer />
									<Routes>
										<Route element={<ProtectedRoutes />}>
											{PROTECTED_ROUTES?.map((route) => (
												<Route
													key={route?.path}
													path={`${route?.path}/*`}
													element={
														<Suspense
															fallback={
																<LoadingPage></LoadingPage>
															}
														>
															<route.element />
														</Suspense>
													}
												/>
											))}
										</Route>
										<Route
											element={<AdminProtactedRoutes />}
										>
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
										<Route
											element={
												<ModeratorProtactedRoutes />
											}
										>
											{MODERATORS_ROUTES?.map((route) => (
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
								</OtpVerificationProvider>
							</NotificationProvider>
						</AuthProvider>
					</Router>
				</Suspense>
			) : (
				<div className="flex min-h-screen items-center justify-center bg-gray-100">
					<div className="max-w-md text-center">
						<h1 className="mb-4 text-4xl font-bold text-gray-800">
							Offline
						</h1>
						<p className="mb-8 text-lg text-gray-600">
							Oops! It seems like you are offline. Please check
							your internet connection and try again.
						</p>
						<div className="mb-4 flex scale-150 justify-center">
							<IoCloudOffline size={40} />
						</div>
						<button
							onClick={() => window.location.reload()}
							className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
						>
							Refresh
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
export { ADMIN_ROUTES, MODERATORS_ROUTES, PROTECTED_ROUTES };
