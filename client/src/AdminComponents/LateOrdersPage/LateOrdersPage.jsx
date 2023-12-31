import React, { useEffect, useState } from 'react';

import LateOrderTable from './LateOrderTable';
import { api } from '../../lib/api';

const LateOrdersPage = () => {
    const [taglateOrder, setTagLateOrder] = useState([]);
    console.log("🚀 ~ file: LateOrdersPage.jsx:6 ~ LateOrdersPage ~ taglateOrder:", taglateOrder)
	const [filteredtagUsers, setFilteredtagUsers] = useState([]);
	useEffect(() => {
		api.get(`/order/gettimeoutorder`)
			.then((response) => {
				setTagLateOrder(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);
 
    return (
        <div>
            <h1 className="text-xl text-center my-6">Late Orders (More than 45 Minutes)</h1>

            <div className="z-0 overflow-x-auto w-[90%] mx-auto">
					<table className=" table-responsive table rounded-md">
						{/* head */}
						<thead>
							<tr>
								<th>
									<label>
										<input
											type="checkbox"
											className="checkbox"
										/>
									</label>
								</th>
								<th>Order Id</th>
								<th>product_id , quantity</th>
								{/* <th>Short Decription</th> */}
								{/* <th>Full Description</th> */}
                                <th>Customer Id</th>
                                <th>Shopper Id</th>
								<th>price</th>
								<th>Order Status</th>
								<th>Order time</th>
								<th>Accept time</th>
								<th>Delivery time</th>
								<th>Total Time</th>
                                <th>Any Report</th>
								<th className='text-center'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{taglateOrder &&
								taglateOrder.map((order) => (
									<LateOrderTable
										key={order.id}
										order={order}
									></LateOrderTable>
								))}
							{/* <AdminProductCart></AdminProductCart> */}
						</tbody>
						{/* foot */}
					</table>
				</div>
        </div>
    );
};

export default LateOrdersPage;