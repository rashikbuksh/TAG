import { validateFieldsNatively } from "@hookform/resolvers";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../lib/api";

const ShopperProduct = () => {
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
		console.log("FormData", data);
		let shopperProduct_ID = null;

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
			shopperProduct_ID = response.data[0].id;
			console.log("shopperProduct_ID", shopperProduct_ID);
		});

		let today = new Date();
		today = today.toISOString();

		await api
			.post(`/news/addproductnews`, {
				shopper_product_id: Number(shopperProduct_ID),
				shop_id: user_id,
				date: today,
				discount: data.discount,
				duration: "",
				location: "",
				category: "regular",
				post_content: "",
				post_img: "",
			})
			.then((response) => {
				console.log(response.data.message);
				if (response.data.message === user_id + " added successfully") {
					// navigate to homepage
					navigate("/home");
				}
			});
	};
	const [productImage, setProductImage] = useState();

	const setproductvalue = (e) => {
		var product = e.target.value.split("||--");
		form.setValue("product_id", product[0]);
		form.setValue("name", product[1]);
		setProductImage(product[2]);
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
												product.image
											}
										>
											{product.name}
										</option>
									))}
							</select>
						</div>
						{productImage && (
							<img
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/${productImage}`}
								alt="Selected Product"
							/>
						)}
						<div className="flex items-center gap-2">
							<div className="  my-2 px-1 py-1">
								<label htmlFor="price">Price</label>
								<input
									className="input w-full"
									{...register("price")}
									type="number"
									name="price"
									id="price"
									placeholder="Enter Price"
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
							<label htmlFor="product_count">Product Count</label>
							<input
								className="input w-full"
								{...register("product_count")}
								type="number"
								name="product_count"
								id="product_count"
								placeholder="Enter Product Count"
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
