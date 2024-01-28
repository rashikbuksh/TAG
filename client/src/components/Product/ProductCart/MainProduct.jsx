/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { FaEye, FaLocationDot, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AddToCartIcon2, MapIcon } from "../../../SvgHub/Icons";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { useAuth } from "../../../context/auth";
import { checkIfInCart, getDiscountPrice } from "../../../helpers/product";
import { api } from "../../../lib/api";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
	increaseQuantityofProd,
} from "../../../store/slices/cart-slice";
import MapDistanceModal from "../../Modal/LocationModal/MapDistanceModal";

const MainProduct = ({ shopperProduct, product, height, width }) => {
	const navigate = useNavigate();
	const prod = product || shopperProduct;
	const {
		name,
		price,
		image,
		id,
		discount,
		view,
		isVerified,
		active_status,
		shopper_id,
		product_count,
		shipping_address,
	} = prod;

	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(0);
	const [display, setDisplay] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [isLocationOpen, setIsLocationOpen] = useState(false);
	const [latLong, setLatLong] = useState({ lat: 0, lng: 0 });
	const [userInfo, setUserInfo] = useState([]);

	const { user } = useAuth();
	const handleMouseEnter = () => {
		setDisplay(1); // Set the quantity to 1 when hovering
	};
	const GetUserInfo = () => {
		api.get(`/auth/getUserInfo/${shopper_id}`).then((res) => {
			setUserInfo(res.data[0]);
		});
	};

	const handleMouseLeave = () => {
		setDisplay(0); // Reset the quantity when leaving
	};

	const [cartItem, setCartItem] = useState(0);

	const increasePQuantity = () => {
		if (cartItem) {
			dispatch(
				increaseQuantity({
					cartItem,
					quantity: cartItem.quantity,
				})
			);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const decreasePQuantity = () => {
		if (cartItem) {
			dispatch(decreaseQuantity(cartItem));
		} else {
			if (quantity > 0) {
				setQuantity(quantity - 1);
			}
		}
	};
	useEffect(() => {
		// Find the product in the cart based on the 'id' parameter
		const productInCart = cartItems.find((item) => item.id == id);

		if (productInCart) {
			// If the product is in the cart, set the product and quantity in the state
			setCartItem(productInCart);
			setQuantity(productInCart.quantity);
		} else {
			// Handle the case when the product is not found in the cart
			// You can set appropriate default values or show an error message.
		}
	}, [cartItems, id]);

	const handelOpenMessageModal = () => {
		setIsOpen(!isOpen);
	};
	const handelOpenLocationModal = () => {
		GetUserInfo();
		let positionFromDb = shipping_address?.split("__");
		setLatLong({
			lat: positionFromDb[0],
			lng: positionFromDb[1],
		});
		setIsLocationOpen(!isOpen);
	};
	const navigateProductPage = (id) => {
		api.post(`/shopperproduct/increaseView/${id}`);
		navigate(`/product/${id}`);
	};
	const divStyle = {
		borderRadius: "12px",
		background: "#FFF",
		boxShadow: "0px 8px 32px 0px rgba(184, 184, 184, 0.10)",
	};
	const showQuantitypalet = () => {
		setDisplay(1);
	};

	return (
		<div className="relative">
			{active_status === 1 ? (
				""
			) : (
				<button
					onClick={() => {
						navigateProductPage(id);
					}}
					className="absolute left-0 top-[40%] z-50 w-full rounded-lg bg-primary py-1 text-white"
				>
					Shop Closed Now
				</button>
			)}
			<div
				className={`${
					active_status === 1 ? "" : "blur-sm"
				} relative z-0 `}
				style={divStyle}
			>
				<div
					className="relative flex flex-col items-center justify-center"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<img
						className={`${height ? `h-[${height}px]` : "h-1/2"}  ${
							width ? `w-[${width}px]` : "w-1/2"
						}  my-1 object-cover `}
						src={`${
							import.meta.env.VITE_APP_IMG_URL
						}/products/${image}`}
						alt=""
					/>
					{/* quantity  */}
					<div className="badge absolute right-2 top-3 bg-[#2D8FCA] text-white">
						<p>{product_count}</p>
					</div>

					{display > 0 &&
						user &&
						user.access == "customer" &&
						active_status === 1 && (
							<div
								className={`absolute  flex   ${
									height ? `h-[150px]` : "h-full"
								}  ${
									width ? `w-[150px]` : "w-full"
								}  items-center justify-center gap-2 rounded-sm bg-black bg-opacity-50`}
							>
								<div className="relative mt-1 flex flex-col items-center justify-center gap-10">
									<h4 className="flex items-center text-base text-white">
										৳{" "}
										{`${(
											parseFloat(
												getDiscountPrice(
													price,
													discount
												)
											) * quantity
										).toFixed(2)}`}
									</h4>
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={decreasePQuantity}
											className="flex h-5 w-5 items-center justify-center rounded-full bg-white  transition hover:opacity-95"
										>
											<FaMinus className="text-primary" />
										</button>

										<input
											type="number"
											id="Quantity"
											value={quantity}
											disabled
											className="h-5 w-12 rounded border border-gray-200 bg-white text-center "
										/>

										<button
											type="button"
											onClick={increasePQuantity}
											className="flex h-5 w-5 items-center justify-center rounded-full bg-white leading-10   transition hover:opacity-75"
										>
											<FaPlus className="text-primary" />
										</button>
									</div>
								</div>
								<div className="absolute right-2 top-1 lg:hidden">
									<button
										type="button"
										onClick={handleMouseLeave}
										className=" flex items-center justify-center rounded-md  p-1 leading-10  transition hover:opacity-75"
									>
										<FaX className="rounded-md text-xl text-pink-400 " />
									</button>
								</div>
							</div>
						)}
				</div>
				{/* name  */}
				<div className="my-1 flex items-start justify-start gap-3 px-2">
					<button
						type="button"
						onClick={() => {
							navigateProductPage(id);
						}}
					>
						<div className="h-10 text-left ">
							<h1 className="text-sm ">{name}</h1>
						</div>
					</button>

					<div>
						{isVerified === "verified" ? (
							<FaCheckCircle className=" primary-text"></FaCheckCircle>
						) : (
							""
						)}
					</div>
				</div>
				<div className="h-3 px-6">
					{user && user.access === "customer" ? (
						""
					) : !user ? (
						""
					) : user.id == shopper_id ? (
						<div className="flex items-center justify-end gap-2">
							<FaEye></FaEye>
							<p>{view}</p>
						</div>
					) : (
						""
					)}
				</div>

				{/* price  */}
				<div className="px-2">
					<div className="flex items-center gap-2">
						<Takaicon></Takaicon>
						<span className="text-sm font-semibold">{`${getDiscountPrice(
							price,
							discount
						)}`}</span>
					</div>
				</div>

				<div className=" flex items-end justify-between   ">
					<div className=" flex items-center">
						{user && user.access === "admin" ? (
							""
						) : user && user.access === "shopper" ? (
							""
						) : (
							<div className=" flex items-center p-1">
								<button
									disabled={active_status !== 1}
									onClick={handelOpenLocationModal}
								>
									<FaLocationDot color="red" size={30} />
								</button>

								{isLocationOpen && (
									<MapDistanceModal
										isOpen={isLocationOpen}
										setIsOpen={setIsLocationOpen}
										popup={userInfo.name}
										latlong={latLong}
									/>
								)}
							</div>
						)}
					</div>

					<div className="flex items-end">
						{user && user.access === "admin" ? (
							""
						) : user && user.access === "shopper" ? (
							""
						) : user && user.access === "new_shopper" ? (
							""
						) : user ? (
							<button
								disabled={active_status !== 1}
								onClick={() => {
									prod.quantity = quantity;
									if (checkIfInCart(cartItems, prod)) {
										dispatch(increaseQuantityofProd(prod));
									} else {
										dispatch(addToCart(prod));
									}
								}}
								className=""
							>
								<span onClick={showQuantitypalet}>
									<AddToCartIcon2></AddToCartIcon2>
								</span>
							</button>
						) : (
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/login"
								}
							>
								<AddToCartIcon2></AddToCartIcon2>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainProduct;
