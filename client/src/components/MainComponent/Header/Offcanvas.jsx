import { ChatIcon, DashBoardIcon } from "@SvgHub/Icons";
import { useAuth } from "@context/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
	FaHome,
	FaUserPlus,
	FaShoppingCart,
	FaClipboardList,
} from "react-icons/fa";
import Drawer from "react-modern-drawer";
import { Link, NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";

function Offcanvas(props) {
	const { toggleDrawer, isOffcanvasOpen, setIsOffcanvasOpen } = props;

	const { user, Logout } = useAuth();
	const [routes, setRoutes] = useState([]);
	const publicRoutes = [
		{ title: "Home", path: "/home", icon: <FaHome /> },
		{
			title: "All Products",
			path: "/shop",
			icon: (
				<ReactSVG
					src={
						import.meta.env.VITE_API_PUBLIC_URL +
						"/assets/img/icons/product.svg"
					}
				/>
			),
		},
	];
	useEffect(() => {
		// Define routes based on user access level
		const userRoutes = [
			{
				title: "Home",
				path: "/home",
				access: ["customer", "shopper", "admin", "moderator"],
				icon: <FaHome />,
			},
			{
				title: "Dashboard",
				path: "/shopkeeperDashboard",
				access: ["shopper"],
				icon: <DashBoardIcon />,
			},
			{
				title: "My Orders",
				path: "/order",
				access: ["shopper"],
				icon: <FaClipboardList />,
			},
			{
				title: "All Products",
				path: "/shop",
				access: ["customer", "shopper"],
				icon: (
					<ReactSVG
						src={
							import.meta.env.VITE_API_PUBLIC_URL +
							"/assets/img/icons/product.svg"
						}
					/>
				),
			},
			{
				title: "Order",
				path: "/orderShopper",
				access: ["shopper"],
				icon: <FaShoppingCart />,
			},
			{
				title: "My Order",
				path: "/order",
				access: ["customer"],
				icon: <FaShoppingCart />,
			},
			{
				title: "Order History",
				path: "/ordersHistoryDetails/:userId",
				access: ["shopper"],
				icon: <FaClipboardList />,
			},
			{
				title: "Cart",
				path: "/cart",
				access: ["customer"],
				icon: <FaShoppingCart />,
			},
			{
				title: "Refer",
				path: "/referPage",
				access: ["customer", "shopper"],
				icon: <FaUserPlus className="text-xl" />,
			},
			{
				title: "Admin Page",
				path: "/admin/stat",
				access: ["admin"],
				icon: (
					<img
						width="50"
						height="50"
						src="https://img.icons8.com/ios-filled/50/administrator-male--v1.png"
						alt="administrator-male--v1"
					/>
				),
			},
			{
				title: "Moderator Page",
				path: "/moderator/stat",
				access: ["moderator"],
				icon: (
					<img
						width="50"
						height="50"
						src="https://img.icons8.com/ios-filled/50/administrator-male--v1.png"
						alt="administrator-male--v1"
					/>
				),
			},
		];

		// Filter routes based on user's access level
		const filteredRoutes = userRoutes.filter((route) =>
			user ? route.access.includes(user.access) : true
		);

		setRoutes(filteredRoutes);
	}, [user]);

	const handleOffDrawer = () => {
		setIsOffcanvasOpen(!isOffcanvasOpen);
	};
	const mobileDrawerStyle = {
		width: "60%",
		marginTop: "50px", // You can adjust the margin value as needed
		borderRadius: "10px",
		backgroundColor: "#EFEFEF",
		boxShadow: "inset 0 54px 56px rgba(0, 0, 0, 0.1)", // Add border radius
	};

	const desktopDrawerStyle = {
		width: "25%", // Adjust this value as needed for desktop
		marginTop: "50px", // You can adjust the margin value as needed
		borderRadius: "10px",
		backgroundColor: "#EFEFEF",
		boxShadow: "inset 0 54px 56px rgba(0, 0, 0, 0.1)",
	};

	return (
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
					{user && (
						<div className="profile-card text-center">
							<div>
								<div className="avatar">
									<div className="w-20 rounded-full ring  ring-offset-2 ring-offset-[#00AAFF]">
										<img
											src={
												user
													? `${
															import.meta.env
																.VITE_APP_IMG_URL
													  }/usersProfilePic/${
															user.profile_picture
													  }`
													: `${
															import.meta.env
																.VITE_API_PUBLIC_URL
													  }/assets/img/profile.jpg`
											}
											className="img-fluid"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className="profile-card__content">
								<p className="name text-lg">
									{user.name ? user.name : "Guest"}{" "}
									<span className="id">
										ID: {user.id ? user.id : "Guest"}
									</span>
								</p>
							</div>
						</div>
					)}
					{user && (
						<div className="">
							<ul
								onClick={handleOffDrawer}
								className="offcanvas-navigation overflow-y-auto"
							>
								{/* Render routes based on user access */}
								{routes.map((route, index) => (
									<li key={index}>
										<NavLink
											className={({
												isActive,
												isPending,
											}) =>
												isPending
													? ""
													: isActive
													? "rounded-md bg-primary p-2 font-semibold text-white "
													: ""
											}
											to={route.path}
										>
											<div className="flex items-center">
												<span className="icon">
													{route.icon}
												</span>
												{route.title}
											</div>
										</NavLink>
									</li>
								))}
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
										<button onClick={Logout}>Logout</button>
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
					)}
					{!user && (
						<div className="">
							<ul
								onClick={handleOffDrawer}
								className="offcanvas-navigation overflow-y-auto"
							>
								{/* Render routes based on user access */}
								{publicRoutes.map((route, index) => (
									<li key={index}>
										<span className="icon">
											{route.icon}
										</span>
										<Link to={route.path}>
											{route.title}
										</Link>
									</li>
								))}
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
										<button onClick={Logout}>Logout</button>
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
					)}
				</div>
			</Drawer>
		</div>
	);
}

export default Offcanvas;
