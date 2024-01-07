import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components";
import Modal from "../../../components/Modal/Modal";
import OrderProducTable from "../../../components/Product/OrderProductTable/OrderProducTable";
import { api } from "../../../lib/api";

const OrderModal = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	const [price, setPrice] = useState(null);
	useEffect(() => {
		if (id) {
			// let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data);
					setPrice(response.data[0].totalPrice); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle={`Order Number: #${id}`} prevUrl="/order" />
			<div>
				<div className="overflow-x-auto">
					<div className="min-w-full  divide-gray-200 bg-white text-sm">
						<div className=" divide-gray-200">
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
