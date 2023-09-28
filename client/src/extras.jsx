/* eslint-disable no-mixed-spaces-and-tabs */
import { lazy, Suspense } from "react";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";

import { Preloader } from "./components";
import ShopkeeperProfileCV from "./components/ShopkeeperProfileCV/ShopkeeperProfileCV";
import ShopkeepersProduct from "./components/ShopkeepersProduct/ShopkeepersProduct";
import TestComponents from "./components/TestComponents/TestComponents";
import ScrollToTop from "./helpers/scroll-top";
import { DefaultLayout } from "./layouts";
import AddCatagoryForm from "./pages/AddCatagoryForm/AddCatagoryForm";
import AddProductForm from "./pages/AddProductForm/AddProductForm";
import AddShopperProduct from "./pages/AddShopperProduct/AddShopperProduct";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import OrderSingle from "./pages/OrderShopper/OrderShopper";
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

function App() {
	return (
		<Router>
			<ScrollToTop>
				<Suspense fallback={<Preloader />}>
					<Routes>
						<Route path={"/"} element={<Welcome />} />
						<Route path={"/welcome"} element={<Welcome />} />
						<Route path={"/register"} element={<Register />} />
						<Route path={"/login"} element={<Login />} />
						<Route
							element={
								<DefaultLayout>
									<Outlet />
								</DefaultLayout>
							}
						>
							<Route path={"/home"} element={<Home />} />
							<Route path={"/shop"} element={<Shop />} />
							<Route
								path={"/product/:id"}
								element={<Product />}
							/>
							<Route path={"/chat"} element={<Chat />} />
							<Route path={"/cart"} element={<Cart />} />
							{/* TODO: Delete This After Work done  */}
							<Route
								path={"/addcategory"}
								element={<AddCatagoryForm></AddCatagoryForm>}
							/>
							{/* TODO: Delete This After Work done  */}
							<Route
								path={"/testComponents"}
								element={<TestComponents></TestComponents>}
							/>
							<Route
								path={"/addshopperproduct"}
								element={
									<AddShopperProduct></AddShopperProduct>
								}
							/>
							<Route
								path={"/newsfeed"}
								element={<NewsFeed></NewsFeed>}
							/>
							<Route
								path={"/shopkeeperDashboard"}
								element={
									<ShopKeeperDashBoard></ShopKeeperDashBoard>
								}
							/>
							<Route
								path={"/shopkeeperProduct"}
								element={
									<ShopkeepersProduct></ShopkeepersProduct>
								}
							/>
							<Route
								path={"/registershopper"}
								element={<RegisterShopper></RegisterShopper>}
							/>
							<Route
								path={"/addproduct"}
								element={<AddProductForm></AddProductForm>}
							/>
							{/* TODO: need DELETE OR REMOVE EXTRA THIS CODE  */}
							<Route path={"/wishlist"} element={<Wishlist />} />
							<Route path={"/checkout"} element={<Checkout />} />
							<Route path={"/search"} element={<Search />} />
							<Route path={"/profile"} element={<Profile />} />
							<Route
								path={"/edit-profile"}
								element={<EditProfile />}
							/>
							<Route
								path={"/notification"}
								element={<Notification />}
							/>
							<Route path={"/contact"} element={<Contact />} />
							<Route path={"/order"} element={<Order />} />
							<Route
								path={"/order/:id"}
								element={<OrderSingle />}
							/>
							<Route
								path={"/shopkeeperProfileCV/:id"}
								element={
									<ShopkeeperProfileCV></ShopkeeperProfileCV>
								}
							/>
							<Route
								path={"/addheroslider"}
								element={<HeroSlider />}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Suspense>
			</ScrollToTop>
		</Router>
	);
}

export default App;
