import { getDiscountPrice } from "../../helpers/product";

const OrderProducTable = ({ Orderdproduct }) => {
	console.log(Orderdproduct, "sadas");
	return (
		<tr>
			<td className="whitespace-nowrap px-4 py-2 text-gray-700">
				{Orderdproduct.name}
			</td>
			<td className="whitespace-nowrap px-4 py-2 text-gray-700">
				{Orderdproduct.product_quantity}
			</td>
			<td className="whitespace-nowrap px-4 py-2 text-gray-700">
				{getDiscountPrice(
					Orderdproduct.product_Price,
					Orderdproduct.product_discounted_price
				)}
			</td>
			<td className="whitespace-nowrap px-4 py-2 text-gray-700">
				{getDiscountPrice(
					Orderdproduct.product_Price,
					Orderdproduct.product_discounted_price
				) * Orderdproduct.product_quantity}
			</td>
		</tr>
	);
};

export default OrderProducTable;
