import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Offcanvas from "./Offcanvas";
import SearchKeywords from "./SearchKeywords";
import { FaX } from "react-icons/fa6";
import { api } from "../../lib/api";
import { useAuth } from "../../context/auth";

function Header() {
	const [activateOffcanvas, setActivateOffcanvas] = useState(false);
	const [activateSearch, setActivateSearch] = useState(false);
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const [userData,setUserdata]=useState(null)
	const {user}=useAuth()

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
	useEffect(()=>{
		const id =user.id
		
		api.get(`/profile/get_profile/${id}`).then((response) => {
			setUserdata(response.data[0]);
		});
	},[])
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
									<Link
										to={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/profile"
										}
									>
										<div className="avatar">
											<div className="w-8 rounded-full ring ring-[#2F5BA9] ">
												{
													userData ?<img src={`${
														import.meta.env
															.VITE_APP_IMG_URL
													}/usersProfilePic/${userData.profile_picture}`} /> :<img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-857.jpg?w=826&t=st=1698678969~exp=1698679569~hmac=d417d6f9ad9358edb074ff1c92bb9159a1c59174c4b378a2d24adad5d8699075" />
												}
												
											</div>
										</div>
									</Link>
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
