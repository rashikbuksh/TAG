import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { api } from "../../lib/api";

function Offcanvas(props) {
	const user = localStorage.getItem("user-id");
	const [userInfo, setUserInfo] = useState([]);
	useEffect(() => {
		const offcanvasNavigations = document.querySelectorAll(
			".offcanvas-navigation > li"
		);
		offcanvasNavigations.forEach((single) => {
			single.addEventListener("click", () => {
				props.activeStatus(false);
			});
		});
		if (user) {
			api.get(`/auth/getUserInfo/${user}`).then((res) => {
				setUserInfo(res.data);
			});
		}
	}, [props]);

	const logout = () => {
		localStorage.removeItem("user-id");
		Cookies.remove("user");
		Cookies.remove("auth");
		window.location.href = "/login";
	};

	return (
		<div className={`offcanvas-menu ${props.show ? "active" : ""}`}>
			{userInfo.map((item) => (
				<div key={user} className="profile-card text-center">
					<div className="profile-card__image space-mb--10">
						<img
							src={
								item.image
									? `${
											import.meta.env.VITE_APP_IMG_URL
									  }/user/${item.image}`
									: `${
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/profile.jpg"
									  }`
							}
							className="img-fluid"
							alt=""
						/>
					</div>
					<div className="profile-card__content">
						<p className="name text-lg">
							{item.name ? item.name : "Guest"}{" "}
							<span className="id">
								{" "}
								ID: {user ? user : "Guest"}
							</span>
						</p>
					</div>
				</div>
			))}
			<div className="offcanvas-navigation-wrapper space-mt--40">
				<ul className="offcanvas-navigation">
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/profile-two.svg"
								}
							/>
						</span>
						{userInfo.map((item) =>
							item.access == "shopper" ? (
								<Link
									key={user}
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/shopkeeperDashboard`
									}
								>
									Shop Profile
								</Link>
							) : (
								<Link
									key={user}
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										`/profile`
									}
								>
									Profile
								</Link>
							)
						)}
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/notification.svg"
								}
							/>
						</span>
						<Link
							to={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/notification"
							}
						>
							Notification
						</Link>
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/product.svg"
								}
							/>
						</span>
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/shop"}
						>
							All products
						</Link>
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/cart-two.svg"
								}
							/>
						</span>
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/order"}
						>
							My Order
						</Link>
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/cart-three.svg"
								}
							/>
						</span>
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/cart"}
						>
							Cart
						</Link>
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/wishlist.svg"
								}
							/>
						</span>
						<Link
							to={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/wishlist"
							}
						>
							Wishlist
						</Link>
					</li>
					<li>
						<span className="icon">
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/gear-two.svg"
								}
							/>
						</span>
						<Link
							to={
								import.meta.env.VITE_API_PUBLIC_URL +
								"/edit-profile"
							}
						>
							Settings
						</Link>
					</li>
					<li>
						<span className="icon">
							<img
								width="24"
								height="24"
								src="https://img.icons8.com/material-outlined/24/add-contact-to-company.png"
								alt="add-contact-to-company"
							/>
						</span>
						<Link
							to={
								import.meta.env.VITE_API_PUBLIC_URL + "/contact"
							}
						>
							Contact Us
						</Link>
					</li>
					{userInfo.map((item) =>
						item.access == "admin" ? (
							<li>
								<span className="icon">
									<img
										width="50"
										height="50"
										src="https://img.icons8.com/ios-filled/50/administrator-male--v1.png"
										alt="administrator-male--v1"
									/>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/admin"
									}
								>
									Admin Page
								</Link>
							</li>
						) : null
					)}
					<li>
						<span className="icon">
							<img
								width="24"
								height="24"
								src="https://img.icons8.com/material-outlined/24/exit.png"
								alt="exit"
							/>
						</span>
						<button onClick={logout}>Logout</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Offcanvas;
