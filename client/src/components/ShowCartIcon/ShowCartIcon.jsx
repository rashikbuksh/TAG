import React, { useEffect, useMemo, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShowCartIcon = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [memoizedCartItem, setMemoizedCartItems] = useState(cartItems);
	const memoizedCartItems = useMemo(() => cartItems, [cartItems]);
	useEffect(() => {
		setMemoizedCartItems(memoizedCartItems);
	}, [memoizedCartItems]);
	const [showcart, setShowCart] = useState(false);
	useMemo(() => {
		if (JSON.stringify(cartItems) !== JSON.stringify(memoizedCartItem)) {
			setShowCart(true);

			const redirectTimer = setTimeout(() => {
				setShowCart(false);
			}, 10000);
			// Clear the timer when the component unmounts
			return () => {
				clearTimeout(redirectTimer);
			};
		}
	}, [cartItems]);
    // console.log(cartItems);
	return (
		<Link to={"/cart"}>
        <div
			className={`primary-background fixed ${
				showcart
					? "right-0 transition-all duration-300 ease-in-out"
					: "-right-72 transition-all duration-300 ease-in-out"
			} top-96 z-20 flex h-[46px] w-[50px] items-center justify-center rounded-l-full shadow-lg`}
		>
			<FaShoppingBag className="text-2xl text-white"></FaShoppingBag>
			<div className=" absolute right-2 top-1 rounded-full bg-red-700 p-[2px] text-xs  text-white">
				{cartItems.length}
			</div>
		</div>
        </Link>

	);
};

export default ShowCartIcon;
