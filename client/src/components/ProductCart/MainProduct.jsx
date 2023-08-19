/* eslint-disable no-mixed-spaces-and-tabs */
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	checkIfInCart,
	getDiscountPrice,
	getProductCartQuantity,
} from "../../helpers/product";
import {
	addToCart,
	increaseQuantityofProd,
} from "../../store/slices/cart-slice";

import { useSelector } from "react-redux";

const MainProduct = ({ shopperProduct, product }) => {
	const prod = product || shopperProduct;
	const { name, price, image, id, discount } = prod;
	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.cartItems);
	return (
		<div>
			<div className="divider m-0"></div>
			<div className="border-y-2 py-2 text-center border-gray-100">
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + `/product/${id}`}
				>
					<h1 className="text-2xl font-bold">{name}</h1>
				</Link>
			</div>
			<div className="relative flex items-center justify-center flex-col">
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + `/product/${id}`}
				>
					{" "}
					<img
						className="h-[200px]  my-3 rounded"
						src={`${import.meta.env.VITE_APP_IMG_URL}/${image}`}
						alt=""
					/>
				</Link>

				<div className=" absolute top-1 right-2 badge badge-success gap-2 rounded-sm">
					Click to view
				</div>
			</div>
			<div className="border-y-2 py-2 text-center my-3 border-gray-100 flex justify-around items-center">
				<div>
					<FaRegMessage className="text-xl"></FaRegMessage>
				</div>
				<div className=" divider divider-horizontal"></div>
				<div>
					<div className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 384 512"
						>
							<path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z" />
						</svg>{" "}
						<span className="text-xl font-semibold">
							{`${getDiscountPrice(price, discount)}`}
						</span>
					</div>
				</div>
				<div className="divider divider-horizontal"></div>
				<div>
					<FaMapMarkerAlt className="text-xl"></FaMapMarkerAlt>
				</div>
			</div>
			<button
				onClick={() => {
					if (checkIfInCart(cartItems, prod)) {
						dispatch(increaseQuantityofProd(prod));
					} else {
						dispatch(addToCart(prod));
					}
				}}
				className=" btn  btn-block rounded-none btn-success"
			>
				Add To Cart{" "}
			</button>
		</div>
	);
};

export default MainProduct;
