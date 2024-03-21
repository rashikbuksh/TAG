import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaLocationDot, FaMapLocationDot, FaX } from "react-icons/fa6";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // need to keep this for map purpose
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useAuth } from "../../../context/auth";
import NotificationSound from "../../../helpers/NotificationSound";
import { api } from "../../../lib/api";
import MapDistanceModal from "../../Modal/LocationModal/MapDistanceModal";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";
import { useNotification } from "../../../context/NotificationProvider";
import { BellIcon } from "@/SvgHub/Icons";

function Header() {
	const [activateOffcanvas, setActivateOffcanvas] = useState(false);
	const [activateSearch, setActivateSearch] = useState(false);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const [userData, setUserdata] = useState(null);
	const { user } = useAuth();
	const id = user ? user.id : null;

	const [locationModal, setLocationModal] = useState(false);

	const handleClickOffcanvas = (e) => {
		e.preventDefault();
		setActivateOffcanvas(!activateOffcanvas);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setActivateSearch(!activateSearch);
	};

	const getMenuActiveStatus = (status) => {
		setActivateOffcanvas(status);
	};
	const toggleDrawer = () => {
		setIsOffcanvasOpen((prevState) => !prevState);
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

	const [search, setSearch] = useState("");

	const handleSearchProductChange = (e) => {
		setSearch(e.target.value);
	};

	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/search/" + search);
	};
	useEffect(() => {
		api.get(`/profile/get_profile/${id}`).then((response) => {
			setUserdata(response.data[0]);
		});
	}, []);

	const [notification, setNotification] = useState([]);
	const [userAccess, setUserAccess] = useState(null);
	const [suser, setsUser] = useState(null);
	const userid = localStorage.getItem("user-id");
	useEffect(() => {
		api.get(`/auth/getShopperInfo`).then((res) => {
			setsUser(res.data);
		});
	}, []);

	const { notifications } = useNotification();

	const notificationsWithStatusOne = notifications.filter(
		(item) => item.status == 1
	);

	// useEffect(() => {
	// 	// Play notification sound for new notifications
	// 	if (notificationsWithStatusOne.length > 0) {
	// 		NotificationSound();
	// 		// Update the status of the notifications after playing the sound
	// 		updateNotificationStatus();
	// 	}
	// }, [notificationsWithStatusOne]);

	// const updateNotificationStatus = async () => {
	// 	try {
	// 		// Update the status of notifications to 2 (played)
	// 		const id = userid;
	// 		console.log(id);
	// 		await api.post(`/notification/readNotification/${id}`);
	// 		// Update the local state with updated notifications
	// 		setNotification((prevNotifications) =>
	// 			prevNotifications.map((notification) =>
	// 				notification.status === 1
	// 					? { ...notification, status: 0 }
	// 					: notification
	// 			)
	// 		);
	// 	} catch (error) {
	// 		console.error("Error updating notification status:", error);
	// 	}
	// };

	const HandleLocationClick = () => {
		setLocationModal(true);
	};
	return (
		<>
			<header>
				<div className="px-6 py-3 ">
					<div className="">
						<div className="flex items-center justify-between">
							<div className="">
								<Offcanvas
									isOffcanvasOpen={isOffcanvasOpen}
									setIsOffcanvasOpen={setIsOffcanvasOpen}
									toggleDrawer={toggleDrawer}
									mobileDrawerStyle={mobileDrawerStyle}
									show={activateOffcanvas}
									desktopDrawerStyle={desktopDrawerStyle}
									activeStatus={getMenuActiveStatus}
									userData={userData}
								/>
							</div>

							<div className="">
								{/* header search */}
								<div className="header-search">
									<form onSubmit={onSubmit}>
										<input
											onChange={(e) =>
												handleSearchProductChange(e)
											}
											name="search"
											type="text"
											placeholder="Search anything"
										/>
										<Link
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												"/search/" +
												search
											}
										>
											<ReactSVG
												src={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/assets/img/icons/search.svg"
												}
											/>
										</Link>
									</form>
								</div>
							</div>
							<div className="flex items-center justify-center gap-3 ">
								{/* header logo */}

								{user && user.access === "shopper" ? (
									<Link
										to={"/notification"}
										className="relative"
										// todo
									>
										
										<span className="w-10 h-10 scale-50">
											<BellIcon></BellIcon>
										</span>

										{notificationsWithStatusOne.length >
											0 && (
											<p className="absolute -top-2 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
												{
													notificationsWithStatusOne.length
												}
											</p>
										)}
									</Link>
								) : (
									<div className="">
										{isOffcanvasOpen ? (
											<>
												(
												<FaX className="text-2xl   text-pink-500"></FaX>
												){" "}
											</>
										) : (
											<div>
												{userData ? (
													<div className="flex items-center justify-center gap-3">
														<FaLocationDot
															color="red"
															size={30}
															onClick={
																HandleLocationClick
															}
														></FaLocationDot>
														{locationModal && (
															<MapDistanceModal
																isOpen={
																	locationModal
																}
																setIsOpen={
																	setLocationModal
																}
																latlong={suser.map(
																	(
																		single
																	) => {
																		const splittedLoc =
																			single.shipping_address.split(
																				","
																			);
																		return {
																			lat: splittedLoc[0],
																			lng: splittedLoc[1],
																		};
																	}
																)}
																popup={
																	userData.name
																}
															/>
														)}

														<div className="avatar">
															<Link
																to={
																	import.meta
																		.env
																		.VITE_API_PUBLIC_URL +
																	"/profile"
																}
															>
																<div className="h-8 w-8 rounded-full ring ring-[#2F5BA9] ">
																	{userData.profile_picture !==
																	null ? (
																		<img
																			className="rounded-full"
																			src={`${
																				import.meta
																					.env
																					.VITE_APP_IMG_URL
																			}/usersProfilePic/${
																				userData.profile_picture
																			}`}
																		/>
																	) : (
																		""
																	)}
																</div>
															</Link>
														</div>
													</div>
												) : (
													<Link
														to={"/login"}
														className="w-[60px] rounded-lg bg-primary py-2 text-center  text-white"
													>
														Login
													</Link>
												)}
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* search keywords */}
				<SearchKeywords show={activateSearch} />
				{/* offcanvas menu */}
			</header>
		</>
	);
}

export default Header;
