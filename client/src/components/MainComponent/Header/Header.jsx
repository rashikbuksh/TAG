import { useNotification } from "@context/NotificationProvider";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import React, { useCallback, useEffect, useState } from "react";
import { FaBell, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import MapDistanceModal from "../../Modal/LocationModal/MapDistanceModal";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";

import { BellIcon } from "@/SvgHub/Icons";

import { FaLocationDot, FaX } from "react-icons/fa6";
function Header() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [locationModal, setLocationModal] = useState(false);
	const [latLong, setLatLong] = useState([]);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const { notifications } = useNotification();
	const [search, setSearch] = useState("");
	const [showProfileMenu, setShowProfileMenu] = useState(false);

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
					const positionFromDb = item.shipping_address?.split("__");
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

	const handleShowProfileMenu = () => {
		setShowProfileMenu(!showProfileMenu);
	};

	return (
		<>
			<header>
				<div className="px-6 py-3">
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
											<div className="">
												{user ? (
													<>
														{/* Hidden section */}
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
																	single={
																		false
																	}
																/>
															)}

															<div
																className="avatar"
																onClick={
																	handleShowProfileMenu
																}
															>
																<div
																	className={`absolute -ml-20 mt-10 h-36 w-28 rounded bg-slate-100  ${
																		showProfileMenu
																			? ""
																			: "invisible"
																	}`}
																>
																	<ul className="mx-3  mt-3 flex flex-col justify-center gap-2 font-bold ">
																		<Link
																			to={
																				import.meta
																					.env
																					.VITE_API_PUBLIC_URL +
																				"/profile"
																			}
																		>
																			Profile
																		</Link>
																		{/* <li>
																			Scan
																		</li> */}
																		{/* <Link to={
																				import.meta
																					.env
																					.VITE_API_PUBLIC_URL +
																				"/addContact"
																			}>
																			Add
																			Contact
																		</Link> */}
																		<Link 	to={
																				import.meta
																					.env
																					.VITE_API_PUBLIC_URL +
																				"/cart"
																			}>
																			My
																			Cart
																		</Link>
																	</ul>
																</div>
																<Link
																// to={
																// 	import.meta
																// 		.env
																// 		.VITE_API_PUBLIC_URL +
																// 	"/profile"
																// }
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
																			<div className="flex justify-center pt-[2px]">
																				<FaUserTie
																					size={
																						25
																					}
																				/>
																			</div>
																		)}
																	</div>
																</Link>
															</div>
														</div>
													</>
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
