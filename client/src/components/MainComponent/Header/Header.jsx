import { useNotification } from "@context/NotificationProvider";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import React, { useEffect, useState, useCallback } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import MapDistanceModal from "../../Modal/LocationModal/MapDistanceModal";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";

import { FaLocationDot, FaX } from "react-icons/fa6";
import { BellIcon } from "@/SvgHub/Icons";
function Header() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [locationModal, setLocationModal] = useState(false);
	const [latLong, setLatLong] = useState([]);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const { notifications } = useNotification();
	const [search, setSearch] = useState("");

	const toggleDrawer = () => {
		setIsOffcanvasOpen((prevState) => !prevState);
	};

	const handleSearchProductChange = useCallback((e) => {
		setSearch(e.target.value);
	}, []);

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			navigate("/search/" + search);
		},
		[navigate, search]
	);

	const HandleLocationClick = useCallback(() => {
		setLocationModal(true);
	}, []);
	const unReadNotification = notifications.filter(
		(notification) => notification.status === 1
	);
	useEffect(() => {
		if (!locationModal) return;

		api.get(`/auth/getShopperInfo`)
			.then((res) => {
				const coordinates = res.data.map((item) => {
					const positionFromDb = item.shipping_address?.split(",");
					return {
						lat: parseFloat(positionFromDb[0]),
						lng: parseFloat(positionFromDb[1]),
					};
				});
				setLatLong(coordinates);
			})
			.catch((error) => {
				console.error("Error fetching shopper info: ", error);
			});
	}, [locationModal]);

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
								/>
							</div>

							<div className="">
								<div className="header-search">
									<form onSubmit={onSubmit}>
										<input
											onChange={handleSearchProductChange}
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
								{user && user.access === "shopper" ? (
									<Link
										to={"/notification"}
										className="relative"
									>
										<BellIcon></BellIcon>
										{unReadNotification.length > 0 && (
											<p className="absolute -top-2 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
												{unReadNotification.length}
											</p>
										)}
									</Link>
								) : (
									<div className="">
										{isOffcanvasOpen ? (
											<>
												<FaX className="text-2xl   text-pink-500"></FaX>{" "}
											</>
										) : (
											<div>
												{user ? (
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
																latLong={
																	latLong
																}
																single={false}
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
																	{user.profile_picture !==
																	null ? (
																		<img
																			className="rounded-full"
																			src={`${
																				import.meta
																					.env
																					.VITE_APP_IMG_URL
																			}/usersProfilePic/${
																				user.profile_picture
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
			</header>
			<SearchKeywords />
		</>
	);
}
export default Header;
