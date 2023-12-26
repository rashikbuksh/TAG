import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";

function Header() {
	const [activateOffcanvas, setActivateOffcanvas] = useState(false);
	const [activateSearch, setActivateSearch] = useState(false);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const [userData, setUserdata] = useState(null);
	const { user } = useAuth();
	const id = user ? user.id : null;

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
	return (
		<header>
			<div className="px-6 py-3">
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
						<div className=" ">
							{/* header logo */}
							<div className="">
								{isOffcanvasOpen ? (
									<FaX className="text-2xl   text-pink-500"></FaX>
								) : (
									<div className="avatar">
										{userData ? (
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/profile"
												}
											>
												<div className="w-8 rounded-full ring ring-[#2F5BA9] ">
													<img
														src={`${
															import.meta.env
																.VITE_APP_IMG_URL
														}/usersProfilePic/${
															userData.profile_picture
														}`}
													/>
												</div>
											</Link>
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
						</div>
					</div>
				</div>
			</div>
			{/* search keywords */}
			<SearchKeywords show={activateSearch} />
			{/* offcanvas menu */}
		</header>
	);
}

export default Header;
