import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Breadcrumb } from "../../components";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";

const ShopKeeperDashBoard = () => {
	const [isClockOpen, setIsClockOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	const [activeStatus, setActiveStatus] = useState(false);
	const [productCountContent, setProductCountContent] = useState("");
	const [notificationContent, setNotificationContent] = useState("");
	const [addProductContent, setAddProductContent] = useState("");
	const [newOrderContent, setNewOrderContent] = useState("");
	const [buyProductContent, setBuyProductContent] = useState("");
	const [orderHistoryContent, setOrderHistoryContent] = useState("");
	const [shopkeeperScheduleContent, setShopkeeperScheduleContent] =
		useState();
	const id = localStorage.getItem("user-id");

	const [shopkeeper, setShopkeeper] = useState([]);
	const [productCount, setProductCount] = useState(0);

	useEffect(() => {
		api.get(`/auth/getUserInfo/${id}`).then((res) => {
			setShopkeeper(res.data[0]);
			setActiveStatus(res.data[0].active_status === 0 ? false : true);
		});

		// get product count
		api.get(`/shopkeeperproduct/getshopkeeperproductCount/${id}`).then(
			(res) => {
				setProductCountContent(res.data[0].count);
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
				toast(response.data.message);
				if (response.status === 200) {
					toast("Change seccess");
				}
			})
			.catch((error) => {
				toast(error);
			});
	};
	const { user } = useAuth();
	const boxShadowStyle = {
		boxShadow: "0px 80px 100px 0px rgba(0, 0, 0, 0.03)",
	};
	const handleOpenClockModal = () => {
		setIsClockOpen(!isClockOpen);
	};
	const dates = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
	const sections = [
		{
			title: "My Product",
			link: `/shopkeeperProduct`,
			content: `Total Product: ${productCountContent}`,
		},
		{
			title: "Notification",
			content: notificationContent.toString(), // Assuming notificationCount is a variable containing the count
			link: "/notification", // Placeholder link for notifications
		},
		{
			title: "Add Product",
			content: addProductContent, // Assuming addProductContent is a variable containing 'Add Product' data
			link: "/addshopperproduct", // Placeholder link for adding a product
		},
		{
			title: "New Order",
			content: newOrderContent, // Assuming newOrderContent is a variable containing 'New Order' data
			link: "/orderShopper", // Placeholder link for new orders
		},
		{
			title: "Buy Product",
			content: buyProductContent, // Assuming buyProductContent is a variable containing 'Buy Product' data
			link: "/buy-product", // Placeholder link for buying a product
		},
		{
			title: "Order History",
			content: orderHistoryContent, // Assuming orderHistoryContent is a variable containing 'Order History' data
			link: `/ordersHistoryDetails/${user.id}`, // Placeholder link for order history
		},
		{
			title: "Shopkeeper Schedule",
			content: shopkeeperScheduleContent, // Assuming shopkeeperScheduleContent is a variable containing 'Order History' data
			link: `/shopkeeperSchedule`, // Placeholder link for order history
		},
	];
	return (
		<div className="body-wrapper space-pb--120 mt-10 bg-gray-50">
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
							<button
								onClick={handleOpenClockModal}
								className="primary-text  link font-bold"
							>
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
									<form className="flex  items-center gap-2">
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
									<div className="mt-4 flex justify-end">
										<button
											onClick={() =>
												setIsClockOpen(!isClockOpen)
											}
											className="action-button"
										>
											Done
										</button>
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
					<div></div>
				</div>

				<div className="">
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

						<h1 className="my-1 text-base font-bold ">
							{shopkeeper.name}
						</h1>
						{/* <p className="flex items-center gap-2 text-sm text-black lg:text-xl">
							<FaMapPin></FaMapPin>{" "}
							{shopkeeper.shipping_address
								? shopkeeper.shipping_address
								: "No Adress provided"}
						</p> */}
						<p className="flex items-center gap-2 text-sm text-black lg:text-xl">
							<FaAddressCard></FaAddressCard>{" "}
							{shopkeeper.address
								? shopkeeper.address
								: "No Adress provided"}
						</p>
					</div>
					<div className="divider"></div>
					<div className="grid grid-cols-2 gap-4 ">
						{sections.map((section, index) =>
							section.link ? (
								<Link
									key={index}
									to={`${
										import.meta.env.VITE_API_PUBLIC_URL
									}${section.link}`}
									className="text-center text-black"
								>
									<div
										key={index}
										// style={boxShadowStyle}
										className={` dashboardCard flex ${
											section.content ? "" : "flex-col "
										}`}
									>
										<div
											className={`flex h-[120px] w-full flex-col items-center justify-center rounded-lg bg-[#FFf] ${
												section.content
													? ""
													: "text-center"
											}`}
										>
											<h1 className="text-base font-bold text-black">
												{section.title}
											</h1>
											{section.content && (
												<p className="text-sm font-semibold lg:text-xl">
													{section.content}
												</p>
											)}
										</div>
									</div>
								</Link>
							) : null
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopKeeperDashBoard;
