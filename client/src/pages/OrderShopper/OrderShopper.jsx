/* eslint-disable no-mixed-spaces-and-tabs */
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
const OrderShopper = () => {
	const navigate = useNavigate();
	const userID = localStorage.getItem("user-id");
	const [data, setData] = useState([]);
	const [productIds, setProductIds] = useState([]);
	const [productQuantity, setProductQuantity] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [matchProducts, setMatchProducts] = useState([]);

	const goBack = () => {
		navigate(-1); // Navigate back by -1 step
	};

	useEffect(() => {
		api.get(`/order/getallorder`).then((res) => {
			setData(res.data);
			console.log("data ", res.data);
		});
		api.get(`/shopperproduct/getshopperproductOfShopkeeper/${userID}`).then(
			(res) => {
				setAllProducts(res.data);
				console.log(res.data);
			}
		);
	}, []);

	useEffect(() => {
		matchedProducts();
	}, [allProducts]);

	const matchedProducts = () => {
		const ALLProductIds = data.map((order) => order.product_id);
		const matchedProds = ALLProductIds.map((order) => {
			const matchedProduct = allProducts.find((product) =>
				order.includes(product.id)
			);

			return matchedProduct;
		});

		console.log("matchedProds", matchedProds);
		setMatchProducts(
			matchedProds.filter((product) => product !== undefined)
		);
	};

	return (
		<div className=" mx-auto my-32 px-2 md:w-[50%]">
			<div className="flex items-center ">
				<FaArrowLeft onClick={goBack} style={{ cursor: "pointer" }} />
				<h2 className="flex-grow text-center text-2xl">
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
			</div>
		</div>
	);
};

export default OrderShopper;
