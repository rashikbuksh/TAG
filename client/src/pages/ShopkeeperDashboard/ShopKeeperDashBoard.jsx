import { Breadcrumb } from "@components";
import Modal from "@components/Modal/Modal";
import { useNotification } from "@context/NotificationProvider";
import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShopKeeperDashBoard = () => {
	const [isClockOpen, setIsClockOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState("");
	let [activeStatus, setActiveStatus] = useState(false);
	const [productCountContent, setProductCountContent] = useState("");
	const [notificationContent, setNotificationContent] = useState("");
	let [addProductContent, setAddProductContent] = useState("");
	let [newOrderContent, setNewOrderContent] = useState("");
	let [buyProductContent, setBuyProductContent] = useState("");
	let [orderHistoryContent, setOrderHistoryContent] = useState("");
	let [shopkeeperScheduleContent, setShopkeeperScheduleContent] = useState();
	const id = localStorage.getItem("user-id");

	const [shopkeeper, setShopkeeper] = useState([]);
	const [productCount, setProductCount] = useState(0);
	const [pendingOrder, setPendingOrder] = useState(0);
	const [notification, setNotification] = useState(0);

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};

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
		api.get(`/order/getordershopper/${id}`)
			.then((response) => {
				setPendingOrder(response.data.length);
				// console.log(response.data.length);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [id]);
	const { notifications } = useNotification();
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
			isActive: false,
		},
		{
			title: "Notification",
			content: notificationContent.toString(), // Assuming notificationCount is a variable containing the count
			link: "/notification",
			isActive: notifications > 0, // Placeholder link for notifications
		},
		{
			title: "Add Product",
			content: addProductContent, // Assuming addProductContent is a variable containing 'Add Product' data
			link: "/addshopperproduct", // Placeholder link for adding a product
			isActive: false,
		},
		{
			title: "New Order",
			content: newOrderContent, // Assuming newOrderContent is a variable containing 'New Order' data
			link: "/orderShopper", // Placeholder link for new orders
			isActive: pendingOrder > 0,
		},
		{
			title: "Product Request",
			content: buyProductContent, // Assuming buyProductContent is a variable containing 'Buy Product' data
			link: "/productRequest", // Placeholder link for buying a product
			isActive: false,
		},
		{
			title: "Order History",
			content: orderHistoryContent, // Assuming orderHistoryContent is a variable containing 'Order History' data
			link: `/ordersHistoryDetails/${user.id}`,
			// Placeholder link for order history
			isActive: false,
		},
		// {
		// 	title: "Shopkeeper Schedule",
		// 	content: shopkeeperScheduleContent, // Assuming shopkeeperScheduleContent is a variable containing 'Order History' data
		// 	link: `/shopkeeperSchedule`, // Placeholder link for order history
		// },
	];
	return (
		<div className="body-wrapper space-pb--120 mt-10 bg-gray-50">
			<Breadcrumb pageTitle="DashBoard" prevUrl="/home" />
			{/* <p className="text-md text-center font-black mt-">DashBoard</p> */}
			<div className="mx-auto rounded-lg  px-4 md:w-[50%]">
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

				{/* Modal */}
				{showModal && (
					<Modal
						isOpen={showModal}
						setIsOpen={setShowModal}
						color={"black"}
					>
						<div className="flex h-[60vh] items-center justify-center bg-black">
							<img
								src={
									shopkeeper.profile_picture
										? `${
												import.meta.env.VITE_APP_IMG_URL
										  }/usersProfilePic/${
												shopkeeper.profile_picture
										  }`
										: ""
								}
								alt=""
								className="max-h-full max-w-full"
							/>
						</div>
					</Modal>
				)}

				<div className="">
					<div className="flex flex-col items-center justify-center">
						<div
							className={`avatar ${
								activeStatus ? "online" : "offline"
							} `}
						>
							<div
								className="w-24 rounded-full"
								onClick={toggleModal}
							>
								{shopkeeper.profile_picture ? (
									<img
										src={`${
											import.meta.env.VITE_APP_IMG_URL
										}/usersProfilePic/${
											shopkeeper.profile_picture
										}`}
										className="img-fluid"
										alt=""
									/>
								) : (
									<img
										src={
											"../../../src/assets/img/Tag-logo-blue-get_100_100.png"
										}
										className="img-fluid"
										alt=""
									/>
								)}
							</div>
						</div>

						<h1 className="my-1 text-base font-bold ">
							{shopkeeper.name}
						</h1>

						<p className="flex items-center gap-2 text-sm text-black lg:text-xl">
							<FaAddressCard></FaAddressCard>{" "}
							{shopkeeper.address
								? shopkeeper.address
								: "No Address provided"}
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
									className="text-center text-black "
								>
									<div
										key={index}
										// style={boxShadowStyle}
										className={` dashboardCard relative flex  ${
											section.content ? "" : "flex-col "
										}`}
									>
										<div
											className={`flex h-[120px] w-full flex-col items-center justify-center rounded-lg bg-[#FFf] hover:bg-cyan-200 active:bg-cyan-500  ${
												section.content
													? ""
													: "text-center"
											}`}
										>
											{section.isActive ? (
												<div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
											) : (
												""
											)}
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
