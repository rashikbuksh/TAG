import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";

function Header() {
	const [activateOffcanvas, setActivateOffcanvas] = useState(false);
	const [activateSearch, setActivateSearch] = useState(false);

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

	return (
		<header>
			<div className="py-3 px-2">
				<div className="">
					<div className="flex justify-between items-center">
						<div className=" ">
							{/* header logo */}
							<div className="">
								<Link
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/home"
									}
								>
									<img
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/Tag-logo-blue-get_50_50.png"
										}
										className="img-fluid"
										alt=""
									/>
								</Link>
							</div>
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
						<div className="">
							{/* header menu trigger */}
							<button
								className="header-menu-trigger"
								onClick={(e) => handleClickOffcanvas(e)}
							>
								<ReactSVG
									src={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/assets/img/icons/menu.svg"
									}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* search keywords */}
			<SearchKeywords show={activateSearch} />
			{/* offcanvas menu */}
			<Offcanvas
				show={activateOffcanvas}
				activeStatus={getMenuActiveStatus}
			/>
		</header>
	);
}

export default Header;
