import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";
import { FaBell } from "react-icons/fa";

function Header() {
	const [activateOffcanvas, setActivateOffcanvas] = useState(false);
	const [activateSearch, setActivateSearch] = useState(false);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
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
		boxShadow: "inset 0 54px 56px rgba(0, 0, 0, 0.1)",// Add border radius
	};

	const desktopDrawerStyle = {
		width: "25%", // Adjust this value as needed for desktop
		marginTop: "50px", // You can adjust the margin value as needed
		borderRadius: "10px", 
		backgroundColor: "#EFEFEF", 
		boxShadow: "inset 0 54px 56px rgba(0, 0, 0, 0.1)",
	};

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
							/>
						</div>

						<div className="">
							{/* header search */}
							<div className="header-search">
								<form>
									<input
										type="text"
										onClick={(e) => handleSearch(e)}
										placeholder="Search anything"
									/>
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/search.svg"
										}
									/>
								</form>
							</div>
						</div>
						<div className=" ">
							{/* header logo */}
							<div className="">
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/notification"
									}
								>
									<span className="icon">
										<FaBell className="text-3xl text-[#00AAFF]"></FaBell>
									</span>
								</Link>
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
