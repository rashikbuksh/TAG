import React from "react";
import { FaRegBell, FaRegNewspaper } from "react-icons/fa6";
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
					to={import.meta.env.VITE_API_PUBLIC_URL + "/newsfeed"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<FaRegNewspaper className="text-2xl"></FaRegNewspaper>
						<span>News</span>
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
					to={import.meta.env.VITE_API_PUBLIC_URL + "/notification"}
					className="footer-nav-single"
				>
					<div className="menu-wrapper">
						<FaRegBell className="text-2xl"> </FaRegBell>
						<span>Notification</span>
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
