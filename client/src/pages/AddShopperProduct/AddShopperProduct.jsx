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

	const selectedProduct = (e) => {
		console.log(e.target.value);
		var product = e.target.value.split("__");
		form.setValue("product_id", product[0]);
		form.setValue("name", product[1]);
	};

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
			.post(`/news/addnews`, {
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
				if (
					response.data.message ===
					shopperProduct_ID + " added successfully"
				) {
					// navigate to homepage
					navigate("/home");
				}
			});
	};

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120 mt-3">
			<div className="auth-page-header space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">Welcome</h3>
							<p className="auth-page-header__text">
								Add Your Product
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="auth-form">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="product_id">
											Product Name
										</label>
										<br />
										<select
											name="product_id"
											id="product_id"
											onChange={selectedProduct}
											defaultValue={0}
										>
											<option value="0">
												Select Category
											</option>
											{productNames &&
												productNames.map((product) => (
													<option
														key={product.id}
														value={
															product.id +
															"__" +
															product.name
														}
													>
														{product.name}
													</option>
												))}
										</select>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="price">Price</label>
										<input
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
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="discount">
											Discount
										</label>
										<input
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
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="product_count">
											Product Count
										</label>
										<input
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
										className="auth-form__button"
									>
										Add Shopper Product
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopperProduct;
