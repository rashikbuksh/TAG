import React, { useEffect, useMemo, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartimg from '../../assets/img/system-solid-64-shopping-bag.gif';

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
		}
	}, [cartItems]);
	console.log(cartItems);
	useEffect(() => {
		if (cartItems.length === 0) {
			setShowCart(false);
		}
	}, [cartItems]);
	return (
		<Link to={"/cart"}>
			<div
				className={`primary-background fixed ${
					showcart
						? "right-0 transition-all duration-300 ease-in-out"
						: "-right-72 transition-all duration-300 ease-in-out"
				} top-96 z-20 flex h-[46px] w-[50px] items-center justify-center rounded-l-full shadow-lg`}
			>
				<img className=" w-[40px] h-[40px]" src={cartimg} alt="" />
				<div className=" absolute right-2 top-1 rounded-full bg-red-700 p-[2px] text-xs  text-white">
					{cartItems.length}
				</div>
			</div>
		</Link>
	);
};

export default ShowCartIcon;
