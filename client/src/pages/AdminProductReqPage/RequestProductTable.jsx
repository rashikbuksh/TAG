import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@lib/api";
const RequestProductTable = () => {
	const [requestProduct, setRequestProduct] = useState([]);
	useEffect(() => {
		api.get(`/request-product-for-stock/Get-product/For-admin`)
			.then((response) => {
				setRequestProduct(response.data);
			})
			.catch((error) => {
				toast(error);
			});
	}, []);

	const groupedByShopperProduct = requestProduct.reduce((acc, item) => {
		let group = acc.find((g) => g.name == item.name);
		if (!group) {
			group = {
				name: item.name,
				items: [],
				randomId: crypto.randomUUID(),
				id: item.id,
				price: item.price,
				shopper_product_id: item.shopper_product_id,
				image: item.image,
			};
			acc.push(group);
		}
		group.items.push(item);
		return acc;
	}, []);
	// Group request product item....
	//TODO:This group have to populate in this table
	console.log(groupedByShopperProduct);
	return (
		<>
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<td>
							<div className="flex items-center gap-3">
								<div className="avatar">
									<div className="mask mask-squircle h-12 w-12">
										<img
											src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div className="font-bold">
										Hart Hagerty
									</div>
									<div className="text-sm opacity-50">
										United States
									</div>
								</div>
							</div>
						</td>
						<td>
							Zemlak, Daniel and Leannon
							<br />
							<span className="badge badge-ghost badge-sm">
								Desktop Support Technician
							</span>
						</td>
						<td>Purple</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default RequestProductTable;
