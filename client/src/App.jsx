import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/auth";
import ProtectedRoutes from "./routes";


import ShopkeeperProfileCV from "./components/ShopkeeperProfileCV/ShopkeeperProfileCV";
import ShopkeepersProduct from "./components/ShopkeepersProduct/ShopkeepersProduct";
import AddCatagoryForm from "./pages/AddCatagoryForm/AddCatagoryForm";
import AddProductForm from "./pages/AddProductForm/AddProductForm";
import AddShopperProduct from "./pages/AddShopperProduct/AddShopperProduct";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import OrderSingle from "./pages/OrderSingle/OrderSingle";
import RegisterShopper from "./pages/RegisterShopper/RegisterShopper";
import ShopKeeperDashBoard from "./pages/ShopkeeperDashboard/ShopKeeperDashBoard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Offcanvas from "./components/Header/Offcanvas";

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

// const AllProducts = lazy(() => import("./components/AllProducts/AllProducts"));
// const BestSellerProduct = lazy(() => import("./components/BestSellerProduct/BestSellerProduct"));
// const Breadcrumb = lazy(() => import("./components/Breadcrumb"));
// const CategorySlider = lazy(() => import("./components/CategorySlider/CategorySlider"));
// const ErrorMessage = lazy(() => import("./components/ErrorMessage"));
// const SearchKeywords = lazy(() => import("./components/Header/SearchKeywords"));
// const HeroSliderADD = lazy(() => import("./pages/hero-slider/HeroSlider"));
// const NewsFeedInput = lazy(() => import("./components/NewsFeedInput/NewsFeedInput"));
// const Preloader = lazy(() => import("./components/Preloader"));
// const ProductCart = lazy(() => import("./components/ProductCart/ProductCart"));
// const MainProduct = lazy(() => import("./components/ProductCart/MainProduct"));
// const Rating = lazy(() => import("./components/Rating"));


const PROTECTED_ROUTES = [
	{
		id: 1,
		name: "Home",
		path: "/home",
		element: Home,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 5,
		name: "Shop",
		path: "/shop",
		element: Shop,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 6,
		name: "Product",
		path: "/product/:id",
		element: Product,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 7,
		name: "Chat",
		path: "/chat",
		element: Chat,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 8,
		name: "Cart",
		path: "/cart",
		element: Cart,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 9,
		name: "Wishlist",
		path: "/wishlist",
		element: Wishlist,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 10,
		name: "Checkout",
		path: "/checkout",
		element: Checkout,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 11,
		name: "Search",
		path: "/search",
		element: Search,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 12,
		name: "Profile",
		path: "/profile",
		element: Profile,
		assigned: ["admin", "customer"],
	},
	{
		id: 13,
		name: "Edit Profile",
		path: "/edit-profile",
		element: EditProfile,
		assigned: ["admin", "customer"],
	},
	{
		id: 14,
		name: "Notification",
		path: "/notification",
		element: Notification,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 15,
		name: "Contact",
		path: "/contact",
		element: Contact,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 16,
		name: "Order",
		path: "/order",
		element: Order,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 17,
		name: "Order Single",
		path: "/order/:id",
		element: OrderSingle,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 18,
		name: "ShopkeeperProfileCV",
		path: "/shopkeeperProfileCV/:id",
		element: ShopkeeperProfileCV,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 19,
		name: "AddCatagoryForm",
		path: "/addcategory",
		element: AddCatagoryForm,
		assigned: ["admin"],
	},
	{
		id: 20,
		name: "AddProductForm",
		path: "/addproduct",
		element: AddProductForm,
		assigned: ["admin"],
	},
	{
		id: 21,
		name: "AddShopperProduct",
		path: "/addshopperproduct",
		element: AddShopperProduct,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 22,
		name: "NewsFeed",
		path: "/newsfeed",
		element: NewsFeed,
		assigned: ["admin", "customer", "shopper"],
	},
	{
		id: 23,
		name: "ShopKeeperDashBoard",
		path: "/shopkeeperDashboard",
		element: ShopKeeperDashBoard,
		assigned: ["admin", "shopper"],
	},
	{
		id: 24,
		name: "ShopkeepersProduct",
		path: "/shopkeeperProduct",
		element: ShopkeepersProduct,
		assigned: ["admin", "shopper"],
	},
	{
		id: 26,
		name: "HeroSlider",
		path: "/addheroslider",
		element: HeroSlider,
		assigned: ["admin"],
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
	return (
		// show header and footer

		<Router>
			<Header />
			<Offcanvas />
			<Footer />
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
