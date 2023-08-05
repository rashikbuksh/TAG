import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ShopperProduct = () => {
	const ShopperProductSchema = yup.object({
		name: yup.string().required("Name is required"),
		price: yup.number().required("Price is required"),
		discount: yup.number().required("Discount is required"),
		product_count: yup.number().required("Product count is required"),
		product_id: yup.string().required("Product ID is required"),
	});

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
		Axios.get(
			`${import.meta.env.VITE_APP_API_URL}/product/getproduct`
		).then((response) => {
			setProductNames(response.data);
		});
	}, []);

	const selectedProduct = (e) => {
		console.log(e.target.value);
		var product = e.target.value.split("__");
		form.setValue("product_id", product[0]);
		form.setValue("name", product[1]);
	};

	const onSubmit = async (data) => {
		console.log("FormData", data);
		console.log(errors);

		await Axios.post(
			`${
				import.meta.env.VITE_APP_API_URL
			}/shopperproduct/addshopperproduct`,
			{
				name: data.name,
				price: data.price,
				discount: data.discount,
				product_count: data.product_count,
				product_id: data.product_id,
			}
		).then((response) => {
			if (response.data.message === data.name + " added successfully") {
				alert("Product Added Successful");
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
