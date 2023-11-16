import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { api } from "../../../lib/api";
import OrderProducTable from "../../../components/OrderProductTable/OrderProducTable";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components";

const OrderModal = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	// console.log(id);
	const [price, setPrice] = useState(null);
	useEffect(() => {
		if (id) {
			// let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data);
					setPrice(response.data[0].price); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);
	// console.log(products);
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb
				pageTitle={`Order Number: #${id}`}
				prevUrl="/order"
			/>
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
