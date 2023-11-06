import { validateFieldsNatively } from "@hookform/resolvers";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";

const ShopperProduct = () => {
	const [productImage, setProductImage] = useState();
	const [productPrice, setProductPrice] = useState(null);
	const [productquantity, setProductquantity] = useState();
	const ShopperProductSchema = yup.object({
		name: yup.string().required("Name is required"),
		price: yup.number().required("Price is required"),
		discount: yup.number().required("Discount is required"),
		product_count: yup.number().required("Product count is required"),
		product_id: yup.string().required("Product ID is required"),
	});

	const user_id = localStorage.getItem("user-id");

	const form = useForm({
		defaultValues: {
			name: "",
			price: "",
			discount: "",
			product_count: "",
			product_id: "",
		},
		resolver: yupResolver(ShopperProductSchema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [productNames, setProductNames] = useState([]);

	useEffect(() => {
		api.get(`/product/getproduct`).then((response) => {
			// console.log(response, "40");
			setProductNames(response.data);
		});
	}, []);

	const navigate = useNavigate();

	// const selectedProduct = (e) => {
	// 	var product = e.target.value.split("__");
	// 	form.setValue("product_id", product[0]);
	// 	form.setValue("name", product[1]);

	// 	// Extract the product ID from the selected value
	// 	const productId = product[0];

	// 	// Call handelGetImage with the product ID
	// 	handelGetImage(productId);
	// };

	const onSubmit = async (data) => {
		// console.log("FormData", data);
		let shopperProduct_ID = null;
		let shopper_product_name = null;
		let shopper_product_price = null;
		let shopper_product_discount = null;
		// let shopper_Product_Image = null;

		await api
			.post(`/shopperproduct/addshopperproduct`, {
				name: data.name,
				price: data.price,
				discount: data.discount,
				product_count: data.product_count,
				product_id: Number(data.product_id),
				shopper_id: Number(user_id),
			})
			.then((response) => {
				if (
					response.data.message ===
					data.name + " added successfully"
				) {
					alert("Product Added Successful");
				}
			});

		await api.get(`/shopperproduct/getLastProduct`).then((response) => {
			// console.log(response);
			shopperProduct_ID = response.data[0].id;
			shopper_product_name = response.data[0].name;
			shopper_product_price = response.data[0].price;
			shopper_product_discount = response.data[0].discount;
		});

		let today = new Date();
		today = today.toISOString();
		// console.log(productImage);
		await api
			.post(`/news/addproductnews`, {
				shopper_product_id: Number(shopperProduct_ID),
				shop_id: user_id,
				date: today,
				discount: data.discount,
				duration: "",
				location: "",
				category: "regular",
				post_content:
					shopper_product_name + " "+
					"TK." +
					getDiscountPrice(
						shopper_product_price,
						shopper_product_discount
					),
				post_img: productImage,
			})
			.then((response) => {
				// console.log(response.data.message);
				if (response.data.message === user_id + " added successfully") {
					// navigate to homepage
					form.reset();
					window.location.reload();
				}
			});
	};

	// const findProductPrice=(id)=>{

	// 	const price=productNames.find(product.id===id)
	// }
	// console.log(productPrice, productquantity);

	const setproductvalue = (e) => {
		// console.log(e);
		var product = e.target.value.split("||--");
		// console.log(product, "prod frm");
		form.setValue("product_id", product[0]);
		form.setValue("name", product[1]);
		setProductImage(product[2]);
		setProductPrice(product[3]);
		setProductquantity(product[4]);
	};

	return (
		<div className="body-wrapper  space-pt--70 space-pb--120 mt-3">
			<h1 className="text-center text-xl font-bold">Add Product</h1>
			<div className="m-1 rounded border bg-gray-100 p-3">
				<div className="">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="   px-1 py-1">
							<label htmlFor="product_id">Product Name</label>
							<br />
							<select
								className="select w-full"
								name="product_id"
								id="product_id"
								onChange={setproductvalue}
								defaultValue={0}
							>
								<option value="0">Select Product</option>
								{productNames &&
									productNames.map((product) => (
										<option
											key={product.id}
											value={
												product.id +
												"||--" +
												product.name +
												"||--" +
												product.image +
												"||--" +
												product.price +
												"||--" +
												product.quantity
											}
										>
											{product.name}
										</option>
									))}
							</select>
						</div>
						<div className="my-2 flex items-center justify-center ">
							{productImage && (
								<img
									className="w-56  border-2 border-black"
									src={`${
										import.meta.env.VITE_APP_IMG_URL
									}/products/${productImage}`}
									alt="Selected Product"
								/>
							)}
						</div>
						<div className="flex items-center gap-2">
							<div className="my-2 px-1 py-1">
								<label htmlFor="price">Price</label>
								<input
									className="input w-full"
									{...register("price")}
									type="number"
									name="price"
									id="price"
									max={
										productPrice &&
										parseFloat(productPrice) > 0
											? parseFloat(productPrice)
											: null
									}
									placeholder={
										productPrice !== "null" &&
										productPrice !== "0" &&
										productPrice !== null
											? productPrice
											: "Enter Price"
									}
								/>
								<p className="text-danger">
									{errors.price?.message}
								</p>
							</div>
							<div className="  my-2 px-1 py-1">
								<label htmlFor="discount">Discount</label>
								<input
									className="input w-full"
									{...register("discount")}
									type="number"
									name="discount"
									id="discount"
									placeholder="Enter Discount"
								/>
								<p className="text-danger">
									{errors.discount?.message}
								</p>
							</div>
						</div>
						<div className="  my-2 px-1 py-1">
							<label htmlFor="product_count">
								Product Quantity
							</label>
							<input
								className="input w-full"
								{...register("product_count")}
								type="number"
								name="product_count"
								id="product_count"
								placeholder="Enter Product Quantity"
							/>
							<p className="text-danger">
								{errors.product_count?.message}
							</p>
						</div>
						<button
							type="submit"
							className="btn btn-accent btn-block "
						>
							Add Shopper Product
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ShopperProduct;
