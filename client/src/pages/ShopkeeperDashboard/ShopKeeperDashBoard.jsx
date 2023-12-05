import Axios from "axios";
import { useEffect, useState } from "react";
import {
	FaBars,
	FaFileContract,
	FaFontAwesomeFlag,
	FaHome,
	FaMapPin,
} from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Timekeeper from "react-timekeeper";
import { Logger } from "sass";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import { Breadcrumb } from "../../components";

const ShopKeeperDashBoard = () => {
	// const shopname = "Rafi Edu Store";
	// const locatiion = "New Market City Complex, Dhaka 1205";
	// const [isOpen, setIsOpen] = useState(false);
	const [isClockOpen, setIsClockOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	const [activeStatus, setActiveStatus] = useState(false);
	// const {user}=useAuth()
	// // console.log(user);

	// const toggleDrawer = () => {
	// 	setIsOpen((prevState) => !prevState);
	// };

	// const mobileDrawerStyle = {
	// 	width: "60%", // Adjust this value as needed for mobile
	// };

	// const desktopDrawerStyle = {
	// 	width: "25%", // Adjust this value as needed for desktop
	// };

	const id = localStorage.getItem("user-id");
	// console.log(id);

	const [shopkeeper, setShopkeeper] = useState([]);
	const [productCount, setProductCount] = useState(0);

	// clock
	const date = new Date();
	// console.log(activeStatus);

	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`).then((res) => {
			// console.log(res.data, "resdata");
			setShopkeeper(res.data[0]);
			setActiveStatus(res.data[0].active_status === 0 ? false : true);
		});

		// get product count
		api.get(`/shopkeeperproduct/getshopkeeperproductCount/${id}`).then(
			(res) => {
				setProductCount(res.data[0].count);
			}
		);
	}, [id]);

	// const handleOpenClockModal = () => {
	// 	setIsClockOpen(!isClockOpen);
	// };
	// const id = user.id
	const handleToggleChange = (e) => {
		const newActiveStatus = e.target.checked;
		// setIsClockOpen(e.target.checked);
		setActiveStatus(newActiveStatus);
		api.post(`/profile/edit_active_status/${id}`, {
			active_status: newActiveStatus,
		})
			.then((response) => {
				alert(response.data.message);
				if (response.status === 200) {
					alert("Change seccess");
				}
			})
			.catch((error) => {
				alert(error);
			});
	};
	// console.log(shopkeeper);
	const boxShadowStyle = {
		boxShadow: "0px 80px 100px 0px rgba(0, 0, 0, 0.03)",
	};
	const handleOpenClockModal = () => {
		setIsClockOpen(!isClockOpen);
	};
	const dates = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
	return (
		<div className="body-wrapper mt-10 space-pb--120">
			<Breadcrumb pageTitle="DashBoard" prevUrl="/home" />
			<div className="mx-auto rounded-lg  p-4 md:w-[50%]">
				<div className="flex items-center justify-between">
					<div className=" flex flex-col items-center justify-center gap-1 ">
						<div>
							<p className="text-sm font-bold lg:text-xl">
								Activity
							</p>
						</div>
						<div className="flex flex-col items-center ">
							<input
								type="checkbox"
								className="toggle toggle-accent"
								checked={activeStatus}
								onChange={handleToggleChange}
							/>
							<button onClick={handleOpenClockModal} className="font-bold">
								Set
							</button>
							<Modal
								isOpen={isClockOpen}
								setIsOpen={setIsClockOpen}
								title={"Set  Day & Time"}
							>
								<div className="mx-auto  mt-3">
									{/* <div className="flex flex-grow items-center gap-7 mb-4">
									{
										days.map((day,index)=> <div className="border-1 border-blue-500 h-5 w-5 flex items-center justify-center text-black  rounded-full font-bold " key={index}>{day}</div>)
									}
									</div> */}
									<form className="flex  gap-2 items-center">
										<label className="text-lg font-bold">
											Time:{" "}
										</label>
										<input
											type="time"
											id="datetime"
											name="datetime"
											defaultValue={"10:00"}
											className=" h-[30px] w-[120px]  rounded border px-2 py-2 font-semibold"
										/>
										<p>TO</p>
										<input
											type="time"
											id="datetime"
											defaultValue={"03:00"}
											name="datetime1"
											className=" h-[30px] w-[120px]  rounded border px-2 py-2 font-semibold"
										/>
									</form>
									<div className="mt-6 flex gap-2">
										<p className="text-lg font-bold">
											Day:
										</p>
										<div className="flex flex-wrap gap-3">
											{dates.map((date, index) => (
												<p
													key={index}
													className="rounded border px-3 py-1 font-semibold"
												>
													{date}
												</p>
											))}
										</div>
									</div>
									<div className="flex justify-end mt-4">
										<button onClick={()=>setIsClockOpen(!isClockOpen)} className="action-button">Done</button>
									</div>
								</div>

								<div className="my-3 flex flex-col items-center justify-center">
									<p className="text-xl font-bold ">
										{selectedTime}
									</p>
									{/* <p>{timeDifference}</p> */}
								</div>
							</Modal>
						</div>
					</div>
					<div>
						{/* <button onClick={toggleDrawer}>
							<FaBars className="text-3xl"></FaBars>
						</button> */}
						{/* <Drawer
							open={isOpen}
							onClose={toggleDrawer}
							direction="right"
							style={
								window.innerWidth < 768
									? mobileDrawerStyle
									: desktopDrawerStyle
							}
						>
							<div className="pt-32">
								<div>
									<ul className="offcanvas-navigation">
										<li>
											<span className="icon">
												<ReactSVG
													src={`${
														import.meta.env
															.VITE_API_PUBLIC_URL
													}/assets/img/icons/profile.svg`}
												/>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/login`}
											>
												Login / Sign up
											</Link>
										</li>
										<li>
											<span className="icon">
												<FaHome></FaHome>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/home`}
											>
												Home
											</Link>
										</li>
										<li>
											<span className="icon">
												<ReactSVG
													src={`${
														import.meta.env
															.VITE_API_PUBLIC_URL
													}/assets/img/icons/profile.svg`}
												/>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/contact`}
											>
												Contact Us
											</Link>
										</li>
										<li>
											<span className="icon">
												<FaFileContract></FaFileContract>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/wishlist`}
											>
												Terms and Condition
											</Link>
										</li>
										<li>
											<span className="icon">
												<FaFontAwesomeFlag></FaFontAwesomeFlag>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/edit-profile`}
											>
												Report
											</Link>
										</li>
										<li>
											<span className="icon">
												<ReactSVG
													src={`${
														import.meta.env
															.VITE_API_PUBLIC_URL
													}/assets/img/icons/gear-two.svg`}
												/>
											</span>
											<Link
												to={`${
													import.meta.env
														.VITE_API_PUBLIC_URL
												}/edit-profile`}
											>
												Settings
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</Drawer> */}
					</div>
				</div>

				<div className="my-10">
					<div className="flex flex-col items-center justify-center">
						<div
							className={`avatar ${
								activeStatus ? "online" : "offline"
							} `}
						>
							<div className="w-24 rounded-full">
								<img
									src={
										shopkeeper
											? `${
													import.meta.env
														.VITE_APP_IMG_URL
											  }/usersProfilePic/${
													shopkeeper.profile_picture
											  }`
											: `${
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/assets/img/profile.jpg"
											  }`
									}
									className="img-fluid"
									alt=""
								/>
							</div>
						</div>

						<h1 className="my-3 text-base font-bold ">
							{shopkeeper.name}
						</h1>
						<p className="flex items-center gap-2 text-sm text-black lg:text-xl">
							<FaMapPin></FaMapPin>{" "}
							{shopkeeper.shipping_address
								? shopkeeper.shipping_address
								: "No Adress provided"}
						</p>
					</div>
					<div className="divider"></div>
					<div className="flex gap-10">
						<div
							style={boxShadowStyle}
							className="flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px] "
						>
							<h1 className="text-base font-bold text-black ">
								<Link
									to={`${
										import.meta.env.VITE_API_PUBLIC_URL
									}/shopkeeperProduct`}
								>
									My Product
								</Link>
							</h1>
							<p className="text-sm font-semibold lg:text-xl">
								Total Product : {productCount}
							</p>
						</div>
						<div
							style={boxShadowStyle}
							className=" flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px]"
						>
							<h1 className="text-base font-bold text-black ">
								Notification
							</h1>
							<p className="text-sm font-semibold lg:text-xl">
								3
							</p>
						</div>
					</div>
					<div style={boxShadowStyle} className="my-10 flex gap-10">
						<div className="flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px]">
							<h1 className="text-base font-bold text-black ">
								News
							</h1>
						</div>
						<div className="flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px]">
							<h1 className="text-base font-bold text-black ">
								Order History
							</h1>
						</div>
					</div>
					<div className="my-10 flex gap-10">
						<div
							style={boxShadowStyle}
							className="flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px]"
						>
							<h1 className="text-center text-base font-bold text-black ">
								Add Social Media
							</h1>
						</div>
						<div
							style={boxShadowStyle}
							className="flex h-[120px] w-[150px] flex-col items-center justify-center gap-2 rounded-lg bg-[#FFF] lg:h-[200px]"
						>
							<h1 className="text-base font-bold text-black ">
								My Account
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopKeeperDashBoard;
