import React, { useEffect, useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import { api } from '../../../lib/api';
import OrderProducTable from '../../../components/OrderProductTable/OrderProducTable';

const OrderModal = ({isOpen,setIsOpen,order_Id,totalPrice}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
		if (order_Id) {
			let id = order_Id;
			api.get(`/order/getProductbyid/${id}`) // Fix the backtick here
				.then((response) => {
					setProducts(response.data); // Use console.log instead of log
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [order_Id]);
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
            <h1 className="text-xl"> Your Order ID  {order_Id}</h1>
            <div className="divider my-0"></div>
            <p className='text-center'>Your Ordered Product</p>
            <div className="divider my-0"></div>
            <div>
				<div className="overflow-x-auto">
					<table className="min-w-full  divide-gray-200 bg-white text-sm">
						<tbody className=" divide-gray-200">
							{products.map((Orderdproduct) => (
								<>
									<OrderProducTable
										key={Orderdproduct.id}
										Orderdproduct={Orderdproduct}
									></OrderProducTable>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="divider my-0"></div>
			<div className=" flex justify-around items-center">
				<p>Total</p>
				<p>{totalPrice}</p>
			</div>
        </Modal>
    );
};

export default OrderModal;