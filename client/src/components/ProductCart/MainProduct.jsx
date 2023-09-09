/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import {
	FaCross,
	FaMapMarkerAlt,
	FaMinus,
	FaPlus,
	FaWindowClose,
} from "react-icons/fa";
import { FaEye, FaRegMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
	checkIfInCart,
	getDiscountPrice,
	getProductCartQuantity,
} from "../../helpers/product";
import { api } from "../../lib/api";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";

const MainProduct = ({ shopperProduct, product }) => {
	const navigate = useNavigate();
	const prod = product || shopperProduct;
	const { name, price, image, id, discount, view } = prod;
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(0);
	const [display, setDisplay] = useState(0);

	const { user } = useAuth();
	const handleMouseEnter = () => {
		setDisplay(1); // Set the quantity to 1 when hovering
	};

	const handleMouseLeave = () => {
		setDisplay(0); // Reset the quantity when leaving
	};
	// State for quantity
	// const [quantity, setQuantity] = useState(product_count);

	// Function to increase quantity
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	// Function to decrease quantity
	const decreaseQuantity = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};
	const navigateProductPage = (id) => {
		api.post(`/shopperproduct/increaseView/${id}`);
		navigate(`/product/${id}`);
	};
	const cartItems = useSelector((state) => state.cart.cartItems);
	return (
		<div>
			<div className="divider m-0"></div>
			<div className=" flex items-end justify-between px-2">
				<button
					type="button"
					onClick={() => {
						navigateProductPage(id);
					}}
				>
					<h1 className="text-xl font-bold">{name}</h1>
				</button>
				<div className="flex gap-2">
					<FaEye></FaEye>
					<p className="text-xs">{view}</p>
				</div>
			</div>
			<div
				className="relative flex flex-col items-center justify-center"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<img
					className={`my-1 rounded  object-contain px-1 ${
						quantity > 0
							? "transition-transform hover:scale-90"
							: ""
					}`}
					src={`${import.meta.env.VITE_APP_IMG_URL}/${image}`}
					alt=""
				/>
				{display > 0 && (
					<div className="absolute  flex h-52  w-full items-center justify-center gap-2 rounded-sm bg-black bg-opacity-50">
						<div className="relative flex flex-col items-center justify-center gap-10">
							<h4 className="text-xl text-white">
								Total Price:{" "}
								{`${getDiscountPrice(price, discount)}` *
									quantity}
							</h4>
							<div className="flex items-center gap-1">
								<button
									type="button"
									onClick={decreaseQuantity}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 leading-10  transition hover:opacity-75"
								>
									<FaMinus className="text-black" />
								</button>

								<input
									type="number"
									id="Quantity"
									value={quantity}
									disabled
									className="h-10 w-16 rounded border border-gray-200 bg-white text-center "
								/>

								<button
									type="button"
									onClick={increaseQuantity}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 leading-10   transition hover:opacity-75"
								>
									<FaPlus className="text-black" />
								</button>
							</div>
						</div>
						<div className="absolute right-2 top-2 lg:hidden">
							<button
								type="button"
								onClick={handleMouseLeave}
								className=" flex items-center justify-center rounded-md bg-white  p-1 leading-10  transition hover:opacity-75"
							>
								<FaWindowClose className="rounded-md text-2xl text-black " />
							</button>
						</div>
					</div>
				)}
			</div>
			<div className="my-1 flex items-center justify-between border-b border-gray-100 py-2">
				<div className="mx-auto flex items-center">
					<FaRegMessage className="text-xl" />
				</div>
				<div className="mx-auto flex items-center">
					<div className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 384 512"
						>
							<path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0-32-14.3 32-32s14.3-32 32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
						</svg>
						<span className="text-xl font-semibold">{`${getDiscountPrice(
							price,
							discount
						)}`}</span>
					</div>
				</div>
				<div className="mx-auto flex items-center">
					<FaMapMarkerAlt className="text-xl" />
				</div>
			</div>

			<button
				onClick={() => {
					prod.quantity = quantity;
					if (checkIfInCart(cartItems, prod)) {
						dispatch(increaseQuantityofProd(prod));
					} else {
						dispatch(addToCart(prod));
					}
				}}
				className=" btn  btn-success btn-block rounded-none"
			>
				Add To Cart{" "}
			</button>
		</div>
	);
};

export default MainProduct;
