/* eslint-disable no-mixed-spaces-and-tabs */
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
const OrderSingle = () => {
	const navigate = useNavigate();

	const id = useParams().id;
	const [data, setData] = useState([]);
	const [productIds, setProductIds] = useState([]);
	const [productQuantity, setProductQuantity] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [matchProducts, setMatchProducts] = useState([]);

	const products = [
		{
			name: "Widget A",
			weight: "500g",
			quantity: 10,
			price: 19.99,
		},
	];
	const goBack = () => {
		navigate(-1); // Navigate back by -1 step
	};

	useEffect(() => {
		Axios.get(
			`${import.meta.env.VITE_APP_API_URL}/order/getorder_by_id/${id}`
		).then((res) => {
			setData(res.data);
			setProductIds(res.data[0]?.product_id.split(","));
			setProductQuantity(res.data[0]?.quantity.split(","));
			console.log(res.data);
		});
		Axios.get(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/getshopperproduct`
		).then((res) => {
			setAllProducts(res.data);
			console.log(res.data);
		});
	}, [id]);

	useEffect(() => {
		matchedProducts();
	}, [allProducts]);

	const matchedProducts = () => {
		var prods = allProducts.filter((product) =>
			productIds.includes(product.id.toString())
		);
		console.log(prods);
		setMatchProducts(prods);
		return prods;
	};

	return (
		<div className=" md:w-[50%] mx-auto my-32 px-2">
			<div className="flex items-center ">
				<FaArrowLeft onClick={goBack} style={{ cursor: "pointer" }} />
				<h2 className="text-2xl text-center flex-grow">
					Order Details
				</h2>
			</div>
			<div className="divider">#{data[0]?.id}</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
					<tbody className="divide-y divide-gray-200">
						{matchProducts &&
							matchProducts.map((product) => (
								<tr key={product.id} className="odd:bg-gray-50">
									<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
										<Link
											to={
												import.meta.env
													.VITE_API_PUBLIC_URL +
												"/product/" +
												product.id
											}
										>
											{product.name}
										</Link>
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700">
										{product.weight}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700">
										<span className="flex items-center gap-3">
											{" "}
											<FaTimes></FaTimes>{" "}
											{
												productQuantity[
													productIds.indexOf(
														product.id.toString()
													)
												]
											}
										</span>
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700">
										{Math.floor(
											productQuantity[
												productIds.indexOf(
													product.id.toString()
												)
											] *
												getDiscountPrice(
													product.price,
													product.discount
												)
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<div className="my-12 text-right">
					<p className="text-xl font-bold ">
						Total Price: {data[0]?.price}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderSingle;
