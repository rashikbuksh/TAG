import React, { useEffect, useMemo, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components";
import Modal from "../../../components/Modal/Modal";
import OrderProducTable from "../../../components/Product/OrderProductTable/OrderProducTable";
import { api } from "../../../lib/api";

const OrderModal = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	const [orderStatus, setOrderStatus] = useState("");
	const [price, setPrice] = useState(null);

	const [memoizedProducts, setMemoizedProducts] = useState(products);
	useEffect(() => {
		if (id) {
			// let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data);
					setOrderStatus(response.data[0].order_status);
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
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle={`Order Number: #${id}`} prevUrl="/order" />
			<div>
				<div className="overflow-x-auto">
					<div className="min-w-full  divide-gray-200 bg-white text-sm">
						<div className=" divide-gray-200">
							<div className="flex items-center justify-end gap-2">
								<p>Status</p>
								<span>
									<FaCircle
										className={statusColors[orderStatus]}
									/>
								</span>
							</div>
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
		</div>
	);
};

export default OrderModal;
