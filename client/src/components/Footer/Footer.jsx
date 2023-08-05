import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const Footer = () => {
	return (
		<footer>
			<div className="footer-nav-wrapper">
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/home"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/home.svg"
							}
						/>
						<span>Home</span>
					</div>
				</Link>
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/chat"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/chat.svg"
							}
						/>
						<span>Chat</span>
					</div>
				</Link>
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/cart"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/cart.svg"
							}
						/>
						<span>Cart</span>
					</div>
				</Link>
				<Link
					to={import.meta.env.VITE_API_PUBLIC_URL + "/profile"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<ReactSVG
							src={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/assets/img/icons/profile.svg"
							}
						/>
						<span>Profile</span>
					</div>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
