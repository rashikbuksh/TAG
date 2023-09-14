import Axios from "axios";
import { useEffect, useState } from "react";
import { FaFontAwesomeFlag, FaHome } from "react-icons/fa";
import { FaBars, FaFileContract, FaMapPin } from "react-icons/fa6";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Timekeeper from "react-timekeeper";
import { api } from "../../lib/api";

const ShopKeeperDashBoard = () => {
	const shopname = "Rafi Edu Store";
	const locatiion = "New Market City Complex, Dhaka 1205";
	const [isOpen, setIsOpen] = useState(false);
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
	// get time
	const [time, setTime] = useState(
		date.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
		})
	);
	console.log(time);
	const onChange = (timeValue) => {
		setTime(timeValue.formatted12);
		console.log(timeValue.formatted12);
	};

	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`).then((res) => {
			console.log(res.data);
			setShopkeeper(res.data);
		});
		// get product count
		api.get(`/shopkeeperproduct/getshopkeeperproductCount/${id}`).then(
			(res) => {
				console.log(res.data[0].count);
				setProductCount(res.data[0].count);
			}
		);
	}, []);

	return (
		<>
			<div className="h-32 "></div>
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

							<Timekeeper time={time} onChange={onChange} />
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
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/profile.svg"
													}
												/>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/login"
												}
											>
												Login / Sign up
											</Link>
										</li>
										<li>
											<span className="icon">
												<FaHome></FaHome>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/home"
												}
											>
												Home
											</Link>
										</li>
										<li>
											<span className="icon">
												<ReactSVG
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/profile.svg"
													}
												/>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/contact"
												}
											>
												Contact Us
											</Link>
										</li>

										<li>
											<span className="icon">
												<FaFileContract></FaFileContract>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/wishlist"
												}
											>
												Terms and Condition
											</Link>
										</li>
										<li>
											<span className="icon">
												<FaFontAwesomeFlag></FaFontAwesomeFlag>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/edit-profile"
												}
											>
												Report
											</Link>
										</li>
										<li>
											<span className="icon">
												<ReactSVG
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/gear-two.svg"
													}
												/>
											</span>
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/edit-profile"
												}
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
					<div className="my-10">
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
									Toral Product : {productCount}
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
			<div className="h-44 "></div>
		</>
	);
};

export default ShopKeeperDashBoard;
