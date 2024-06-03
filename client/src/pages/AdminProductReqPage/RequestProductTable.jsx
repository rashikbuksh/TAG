import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@lib/api";
import ProductRowTable from "../ProductRequest/ProductRowTable";
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
	const handleDelete = async (id, items) => {
		let deletionPromises = [];
		console.log(id);
		console.log(items);

		items.forEach(async (item) => {
			try {
				let deleteResponse = await api.delete(
					`/request-product-for-stock/delete/${item.id}`
				);
				console.log(`Item with ID ${item.id} deleted successfully.`);
				console.log(deleteResponse);

				deletionPromises.push(deleteResponse);
				if (deleteResponse.status == 200) {
					window.location.reload();
				}
			} catch (error) {
				console.error(`Error deleting item with ID ${item.id}:`, error);
			}
		});
		await Promise.all(deletionPromises);
		console.log("All deletions completed.");
	};

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
						<th>Image</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className="text-xl mx-auto">
					{/* row 1 */}
					{groupedByShopperProduct.length > 0 &&
				groupedByShopperProduct.map((product) => (
					<ProductRowTable
						key={product.randomId}
						product={product}
						handleDelete={handleDelete}
						groupedByShopperProduct={product.items}
					></ProductRowTable>
				))}
				
				</tbody>
			</table>
		</>
	);
};

export default RequestProductTable;
