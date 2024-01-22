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
		api.get(`/notification/getnotification/${userid}/${userid}`).then(
			(res) => {
				setNotification(res.data);
			}
		);
	}, []);

	const notificationsWithStatusOne = notification.filter(
		(item) => item.status === 1
	);

	// {notification.map((single) => (
	// 	<div
	// 		className={clsx(
	// 			"notification-item",
	// 			single.status === 1 && "notification-item--unread"
	// 		)}
	// 		key={single.id}
	// 	>
	// 		{/* Other notification content */}
	// 		{single.status === 1 && <NotificationSound />}

	// 		{/* Rest of your notification rendering */}
	// 	</div>
	// ))}
	// console.log(notificationsWithStatusOne.length);

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
									>
										<FaBell className="text-4xl   text-yellow-500" />
										{notificationsWithStatusOne.length >
											0 && (
											<p className="absolute -top-2 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
												{
													notificationsWithStatusOne.length
												}
												<NotificationSound />
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
