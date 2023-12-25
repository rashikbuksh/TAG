import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaBars, FaHome, FaUserPlus } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { DashBoardIcon } from "../../SvgHub/Icons";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
function Offcanvas(props) {
	const {
		toggleDrawer,
		mobileDrawerStyle,
		desktopDrawerStyle,
		isOffcanvasOpen,
		setIsOffcanvasOpen,
		userData,
	} = props;
	const userid = localStorage.getItem("user-id");
	const [userInfo, setUserInfo] = useState([]);
	const { user } = useAuth();
	// console.log(user);
	useEffect(() => {
		const offcanvasNavigations = document.querySelectorAll(
			".offcanvas-navigation > li"
		);
		offcanvasNavigations.forEach((single) => {
			single.addEventListener("click", () => {
				props.activeStatus(false);
			});
		});
		if (userid) {
			api.get(`/auth/getUserInfo/${userid}`).then((res) => {
				setUserInfo(res.data);
			});
		}
	}, [props, userid]);

	const logout = () => {
		localStorage.removeItem("user-id");
		Cookies.remove("user");
		Cookies.remove("auth");
		window.location.href = "/login";
	};
	const handeloffDrawer = () => {
		setIsOffcanvasOpen(!isOffcanvasOpen);
	};

	return (
		// <div className={`offcanvas-menu ${props.show ? "active" : ""}`}>

		// </div>
		<div>
			<button onClick={toggleDrawer}>
				<ReactSVG
					src={
						import.meta.env.VITE_API_PUBLIC_URL +
						"/assets/img/icons/menu.svg"
					}
				/>
			</button>
			<Drawer
				open={isOffcanvasOpen}
				onClose={toggleDrawer}
				direction="left"
				style={
					window.innerWidth < 768
						? mobileDrawerStyle
						: desktopDrawerStyle
				}
			>
				<div className="py-10 ">
					{userid
						? userInfo.map((item) => (
								<div
									key={item}
									className="profile-card text-center"
								>
									<div>
										<div className="avatar">
											<div className="w-20 rounded-full ring  ring-offset-2 ring-offset-[#00AAFF]">
												<img
													src={
														userData
															? `${
																	import.meta
																		.env
																		.VITE_APP_IMG_URL
															  }/usersProfilePic/${
																	userData.profile_picture
															  }`
															: `${
																	import.meta
																		.env
																		.VITE_API_PUBLIC_URL +
																	"/assets/img/profile.jpg"
															  }`
													}
													className="img-fluid"
													alt=""
												/>
											</div>
										</div>
									</div>
									<div className="profile-card__content">
										<p className="name text-lg">
											{item.name ? item.name : "Guest"}{" "}
											<span className="id">
												ID: {user ? user.id : "Guest"}{" "}
												{/* Assuming you want to display the user's ID */}
											</span>
										</p>
									</div>
								</div>
						  ))
						: ""}
					<div className="">
						<ul
							onClick={handeloffDrawer}
							className="offcanvas-navigation overflow-y-auto"
						>
							<li>
								<span className="icon">
									<FaHome />
								</span>
								<Link to={"/home"}> Home</Link>
							</li>

							{userid
								? userInfo.map((item) =>
										item.access == "shopper" ? (
											<li key={item.id}>
												<span className="icon">
													<DashBoardIcon></DashBoardIcon>
												</span>
												<Link
													key={user}
													to={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														`/shopkeeperDashboard`
													}
												>
													DashBoard
												</Link>
											</li>
										) : (
											""
										)
								  )
								: ""}

							<li>
								<span className="icon">
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/product.svg"
										}
									/>
								</span>
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/shop"
									}
								>
									All products
								</Link>
							</li>
							{userid && (
								<li>
									<span className="icon">
										<ReactSVG
											src={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												"/assets/img/icons/cart-two.svg"
											}
										/>
									</span>
									{userid
										? userInfo.map((item) =>
												item.access == "shopper" ? (
													<Link
														key={user}
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/orderShopper`
														}
													>
														Order
													</Link>
												) : (
													<Link
														key={user}
														to={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															`/order`
														}
													>
														My Orders
													</Link>
												)
										  )
										: ""}
								</li>
							)}

							{userid
								? userInfo.map((item) =>
										item.access == "shopper" ? (
											<li key={userInfo.id}>
												<span className="icon">
													<ReactSVG
														src={
															import.meta.env
																.VITE_API_PUBLIC_URL +
															"/assets/img/icons/cart-two.svg"
														}
													/>
												</span>
												<Link
													key={user}
													to={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														`/ordersHistoryDetails/${user.id}`
													}
												>
													Order History
												</Link>
											</li>
										) : (
											""
										)
								  )
								: ""}
							{user
								? user.access === "customer" && (
										<li>
											<span className="icon">
												<ReactSVG
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/cart-three.svg"
													}
												/>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/cart"
												}
											>
												Cart
											</Link>
										</li>
								  )
								: ""}
							{user ? (
								<li>
									<span className="icon">
										<FaUserPlus className="text-xl"></FaUserPlus>
									</span>
									<Link
										to={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/referPage"
										}
									>
										Refer
									</Link>
								</li>
							) : (
								""
							)}

							{userid
								? userInfo.map((item) =>
										item.access == "admin" ? (
											<li key={item.id}>
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
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/admin/stat"
													}
												>
													Admin Page
												</Link>
											</li>
										) : null
								  )
								: ""}
							{user ? (
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
							) : (
								<Link
									to={"/login"}
									className="w-full rounded-lg bg-primary py-2 text-center  text-white"
								>
									Login
								</Link>
							)}
						</ul>
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default Offcanvas;
