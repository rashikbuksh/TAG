import { Breadcrumb } from "@components";
import OrderProductTable from "@components/Product/OrderProductTable/OrderProductTable";
import { api } from "@lib/api";
import React, { useEffect, useMemo, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const OrderModal = () => {
	const { id } = useParams();

	const [order, setOrder] = useState(null);
	const [orderedProducts, setOrderedProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [memoizedProducts, setMemoizedProducts] = useState(order);

	useEffect(() => {
		if (id != null || id != undefined) {
			api.get(`/order/get-product-by-id/${id}`).then((response) => {
				setOrder(response.data);
				setOrderedProducts(response.data?.ordered_product);
			});
		} else {
			setLoading(false);
		}
	}, [id, order?.order_status]);

	useEffect(() => {
		setMemoizedProducts(order);
	}, [order]);

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
								Shopper id:{order?.shopper_id}
							</p>
							<p className="text-md">
								Shopper Name:{" "}
								<span className="font-bold text-red-900">
									{order?.shopper_name}
								</span>
							</p>
							<p>{order?.phone_no}</p>
							<div className="flex items-center justify-between ">
								<p className="capitalize">
									Status : {order?.order_status}
								</p>
								<span>
									<FaCircle
										className={
											statusColors[order?.order_status]
										}
									/>
								</span>
							</div>
						</div>
						<div className=" divide-gray-200">
							{/* <div className="flex items-center justify-end gap-2"></div> */}
							<p className="text-xl font-bold">Order Details:</p>
							{orderedProducts.map((product) => (
								<OrderProductTable
									key={product.pid}
									product={product}
								></OrderProductTable>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="divider my-0"></div>
			<div className=" flex items-center justify-end gap-5 text-lg">
				<p>Total Amount :</p>
				<p>{order?.totalPrice}</p>
			</div>
			<div className="divider my-0"></div>

			<div style={deliveryInfoStyle} className="">
				<p className="text-xl font-bold">Delivery Information:</p>
				{!order?.address_title &&
					!order?.address &&
					!order?.phone_no && (
						<p>{order?.customers_address_summary}</p>
					)}
				<p className="text-lg">{order?.address_title}</p>
				<p className="text-md">{order?.address}</p>
				<p>{order?.phone_no}</p>
			</div>
		</div>
	);
};

export default OrderModal;
