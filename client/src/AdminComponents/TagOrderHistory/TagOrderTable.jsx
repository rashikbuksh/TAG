import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import TagOrderDetailsModal from "./TagOrderDetailsModal";
import { getDiscountPrice } from "../../helpers/product";

const TagOrderTable = ({ order }) => {
	const [isOpen, setIsOpen] = useState(false);
    const [orderDetails , setOrderDetails]=useState([])

	const handelOpenOrderHistoryModal = (id) => {
        // console.log(id);
		setIsOpen(!isOpen);

		if (id) {
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
                    // console.log(response.data);
					setOrderDetails(response.data); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
    console.log(orderDetails,"tagordertable");
    const cancel_report=orderDetails.map(d=>d.cancel_report)

	return (
		<>
			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							{/* <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={`${import.meta.env.VITE_APP_IMG_URL}/${tagShopkeeper.image?tagShopkeeper.image:""}`}
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div> */}
						</div>
					</div>
				</td>
				<td>{order.id}</td>
				<td>
					{order.product_id}
					<br />
					<span className="badge badge-ghost badge-sm">
						{order.quantity}
					</span>
				</td>
				<td>{order.weight}</td>
				<td>{order.price}</td>
				<td>{order.order_status}</td>
                
				{/* <td>
                {product.short_description}
            </td> */}
				{/* <td className="whitespace-nowrap px-4 py-2">
          
                
            </td> */}

				<td>
					<button onClick={()=>handelOpenOrderHistoryModal(order.id)} className="btn btn-accent btn-sm ml-3">
						Order Details
					</button>
				</td>
			</tr>
            <TagOrderDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} orderDetails={orderDetails}></TagOrderDetailsModal>
		</>
	);
};

export default TagOrderTable;
