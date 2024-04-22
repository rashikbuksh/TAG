import { Breadcrumb } from "@components";
import OrderProducTable from "@components/Product/OrderProductTable/OrderProducTable";
import { api } from "@lib/api";
import React, { useEffect, useMemo, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const OrderModal = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	const [orderStatus, setOrderStatus] = useState("");
	const [price, setPrice] = useState(null);
	const [addressTitle, setAddressTitle] = useState(null);
	const [address, setAddress] = useState(null);
	const [contactNo, setContactNo] = useState(null);
	const [customer_profile_id, setCustomer_profile_id] = useState(null);
	const [customer_profile_Name, setCustomer_profile_Name] = useState(null);
	const [customers_address_summary, setCustomers_address_summary] =
		useState(null);



	const [memoizedProducts, setMemoizedProducts] = useState(products);
	useEffect(() => {
		if (id) {
			// let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					// console.log("🚀 ~ .then ~ response:", response);
					setProducts(response.data);
					setOrderStatus(response.data[0].order_status);
					setAddressTitle(response.data[0].address_title);
					setAddress(response.data[0].address);
					setContactNo(response.data[0].phone_no);
					setCustomers_address_summary(
						response.data[0].customers_address_summary
					);
					setCustomer_profile_id(
						response.data[0].customer_profile_id
					);
					setCustomer_profile_Name(response.data[0].customer_name);
					setCustomers_address_summary(
						response.data[0].customers_address_summary
					);
					setPrice(response.data[0].totalPrice); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id, orderStatus]);

	useEffect(() => {
		setMemoizedProducts(products);
	}, [products]);
	const [showcart, setShowCart] = useState(false);
	useMemo(() => {
		if (JSON.stringify(products) !== JSON.stringify(memoizedProducts)) {
			setShowCart(true);
		}
	}, [products]);

	const statusColors = {
		accepted: "text-green-500",
		pending: "text-yellow-500",
	};

	const deliveryInfoStyle = {
		background: "#f7f7f7", // Background color
		padding: "10px", // Padding around the delivery information
		borderRadius: "5px", // Rounded corners
		marginBottom: "20px", // Spacing between delivery info and total amount
	};
	return (
		<div className=" px-2 pb-24 ">
			<Breadcrumb pageTitle={`Order Number: #${id}`} prevUrl="/order" />
			<div>
				<div className="overflow-x-auto">
					<div className="min-w-full  divide-gray-200 bg-white text-sm">
						<div style={deliveryInfoStyle} className="mt-1">
							<p className="text-xl font-bold">
								Customer Information:
							</p>
							<p className="text-lg">
								Customer Id:{customer_profile_id}
							</p>
							<p className="text-md">
								Customer Name:{" "}
								<span className="font-bold text-red-900">
									{customer_profile_Name}
								</span>
							</p>
							<p>{contactNo}</p>
							<div className="flex items-center justify-between ">
								<p className="capitalize">
									Status : {orderStatus}
								</p>
								<span>
									<FaCircle
										className={statusColors[orderStatus]}
									/>
								</span>
							</div>
						</div>
						<div className=" divide-gray-200">
							{/* <div className="flex items-center justify-end gap-2"></div> */}
							<p className="text-xl font-bold">Order Details:</p>
							{products.map((product) => (
								<OrderProducTable
									key={product.pid}
									product={product}
								></OrderProducTable>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="divider my-0"></div>
			<div className=" flex items-center justify-end gap-5 text-lg">
				<p>Total Amount :</p>
				<p>{price}</p>
			</div>
			<div className="divider my-0"></div>

			<div style={deliveryInfoStyle} className="">
				<p className="text-xl font-bold">Delivery Information:</p>
				{!addressTitle && !address && !contactNo && (
					<p>{customers_address_summary}</p>
				)}
				<p className="text-lg">{addressTitle}</p>
				<p className="text-md">{address}</p>
				<p>{contactNo}</p>
			</div>
		</div>
	);
};

export default OrderModal;
