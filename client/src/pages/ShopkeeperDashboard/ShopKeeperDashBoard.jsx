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
import { api } from "../../lib/api";
import Modal from "../../components/Modal/Modal";

const ShopKeeperDashBoard = () => {
	const shopname = "Rafi Edu Store";
	const locatiion = "New Market City Complex, Dhaka 1205";
	const [isOpen, setIsOpen] = useState(false);
	const [isClockOpen, setIsClockOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	const [timeDifference, setTimeDifference] = useState("");

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const mobileDrawerStyle = {
		width: "60%", // Adjust this value as needed for mobile
	};

	const desktopDrawerStyle = {
		width: "25%", // Adjust this value as needed for desktop
	};

	const id = localStorage.getItem("user-id");

	const [shopkeeper, setShopkeeper] = useState([]);
	const [productCount, setProductCount] = useState(0);

	// clock
	const date = new Date();
	const [time, setTime] = useState(
		date.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
		})
	);

	const onChange = (timeValue) => {
		setTime(timeValue.formatted12);
	};

	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`).then((res) => {
			setShopkeeper(res.data);
		});

		// get product count
		api.get(`/shopkeeperproduct/getshopkeeperproductCount/${id}`).then(
			(res) => {
				setProductCount(res.data[0].count);
			}
		);
	}, [id]);

	const handleOpenClockModal = () => {
		setIsClockOpen(true);
	};

	const handleTimeChange = (timeValue) => {
		try {
			const selectedDate = new Date();
			const formattedTime = timeValue.formatted12;

			const [hours, minutes, period] = formattedTime.split(/[: ]/);
			let selectedHours = parseInt(hours, 10);
			const selectedMinutes = parseInt(minutes, 10);

			// Adjust hours for PM time
			if (period === "PM" && selectedHours !== 12) {
				selectedHours += 12;
			}

			// Convert 12 AM to 00 hours in 24-hour format
			if (period === "AM" && selectedHours === 12) {
				selectedHours = 0;
			}

			selectedDate.setHours(selectedHours, selectedMinutes, 0, 0);

			// Format selectedDate in 24-hour format
			const formattedSelectedTime = selectedDate.toLocaleTimeString(
				"en-US",
				{
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}
			);

			const currentDate = new Date();

			// Format the entire date in "Bangladesh Standard Time"
			const options = {
				timeZoneName: "short",
				timeZone: "Asia/Dhaka",
			};

			const formattedCurrentDate = currentDate.toLocaleString(
				"en-US",
				options
			);

			// Calculate the time difference in milliseconds
			const timeDiff = currentDate - selectedDate;
			const minutesDiff = Math.floor(timeDiff / 60000);

			if (minutesDiff >= 0) {
				setSelectedTime(formattedSelectedTime);
				setTimeDifference(`${minutesDiff} minutes after`);
			} else {
				setSelectedTime("");
				setTimeDifference("Please select a future time");
			}
		} catch (error) {
			console.error("Error parsing time:", error.message);
			setSelectedTime("");
			setTimeDifference("Invalid time format");
		}
	};

	return (
		<>
			<div className="h-20 "></div>
			<div className="mx-auto rounded-lg bg-gray-100 p-4 md:w-[50%]">
				<div className="flex items-center justify-between">
					<div className=" flex flex-col items-center justify-center gap-2 ">
						<div>
							<p className="text-sm font-bold lg:text-xl">
								Activity
							</p>
						</div>
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								className="toggle toggle-accent"
							/>
							<button onClick={handleOpenClockModal}>
								Set Time
							</button>
							<Modal
								isOpen={isClockOpen}
								setIsOpen={setIsClockOpen}
								title={"Set Time"}
							>
								<div className="mx-auto my-5 flex items-center justify-center">
									<Timekeeper
										time={time}
										onChange={handleTimeChange}
									/>
								</div>
								<div className="my-3 flex flex-col items-center justify-center">
									<p className="text-xl font-bold ">
										{selectedTime}
									</p>
									<p>{timeDifference}</p>
									<button className="bg-blue-500 px-4 py-1 text-white">
										Set
									</button>
								</div>
							</Modal>
						</div>
					</div>
					<div>
						<button onClick={toggleDrawer}>
							<FaBars className="text-3xl"></FaBars>
						</button>
						<Drawer
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
						</Drawer>
					</div>
				</div>
				{shopkeeper.map((shopkeeper) => (
					<div className="my-10" key={shopkeeper.id}>
						<div className="flex flex-col items-center justify-center">
							<img
								className="h-[200px] w-[200px] rounded-full"
								src="https://img.freepik.com/free-vector/people-standing-store-queue_23-2148594615.jpg?w=1380&t=st=1691338675~exp=1691339275~hmac=f00912cda4fe496dab3007a5dd750d515926e3fcd71d77d27ff693258b4c5a1f"
								alt=""
							/>
							<h1 className="my-3 text-2xl font-bold lg:text-4xl">
								{shopkeeper.name}
							</h1>
							<p className="flex items-center gap-2 text-sm text-black lg:text-xl">
								<FaMapPin></FaMapPin> {locatiion}
							</p>
						</div>
						<div className="divider"></div>
						<div className="flex gap-10">
							<div className="flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-2xl font-extrabold text-white lg:text-4xl">
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
							<div className=" flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-2xl font-extrabold text-white lg:text-4xl">
									Notification
								</h1>
								<p className="text-sm font-semibold lg:text-xl">
									3
								</p>
							</div>
						</div>
						<div className="my-10 flex gap-10">
							<div className="flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-2xl font-extrabold text-white lg:text-4xl">
									News
								</h1>
							</div>
							<div className="flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-2xl font-extrabold text-white lg:text-4xl">
									Order History
								</h1>
							</div>
						</div>
						<div className="my-10 flex gap-10">
							<div className="flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-center text-2xl font-extrabold text-white lg:text-4xl">
									Add Social Media
								</h1>
							</div>
							<div className="flex h-[100px] w-[500px] flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 lg:h-[200px]">
								<h1 className="text-2xl font-extrabold text-white lg:text-4xl">
									My Account
								</h1>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className=""></div>
		</>
	);
};

export default ShopKeeperDashBoard;
