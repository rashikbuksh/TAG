import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";

const AddProductForm = () => {
	const [categoryNames, setCategoryNames] = useState([]);
	const [Image, setImage] = useState(null);

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
		}
	};

	useEffect(() => {
		api.get(`/category/getcategory`).then((response) => {
			setCategoryNames(response.data);
		});
	}, []);

	const addProductSchema = yup.object({
		name: yup.string().required("Name required"),
		short_description: yup.string().required("Short description required"),
		full_description: yup.string().required("Full description required"),
		image: yup
			.mixed()
			.required("Category Picture is required")
			.test("fileFormat", "Invalid file format", (value) => {
				if (value && value.length) {
					const file = value[0];
					return file && file.type.includes("image");
				}
				return false;
			}),
		product_varification: yup
			.string()
			.required("Product Verification required"),
		price: yup
			.string() // Ensure that the input is a string
			.when(["product_varification"], (product_varification, schema) => {
				return product_varification == "verified"
					? schema
							.required("Price is required")
							.test(
								"is-number",
								"Price must be a number",
								(value) => {
									if (!value) return false; // Check if the value is empty
									return !isNaN(Number(value)); // Check if the value can be converted to a number
								}
							)
					: schema;
			}),
		quantity: yup
			.string() // Ensure that the input is a string
			.when(["product_varification"], (product_varification, schema) => {
				return product_varification == "verified"
					? schema
							.required("Quantity is required")
							.test(
								"is-number",
								"Quantity must be a number",
								(value) => {
									if (!value) return false; // Check if the value is empty
									return !isNaN(Number(value)); // Check if the value can be converted to a number
								}
							)
					: schema;
			}),
	});

	const form = useForm({
		defaultValues: {
			name: "",
			image: "",
			short_description: "",
			full_description: "",
			category_id: "",
			product_varification: "",
			price: "",
			quantity: "",
		},
		resolver: yupResolver(addProductSchema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const changedCategory = (e) => {
		form.setValue("category_id", e.target.value);
	};

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("uploadFiles", Image);

		var ImageName = null;

		await Axios.post(
			`${
				import.meta.env.VITE_APP_API_URL
			}/imageUpload/uploadproductimage`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data;",
					Authorization: Cookies?.get("auth"),
				},
			}
		).then((response) => {
			if (response.data.msg === "File Uploaded") {
				ImageName = response.data.productImage;
			}
		});

		api.post(`/product/addproduct`, {
			name: data.name,
			image: ImageName,
			short_description: data.short_description,
			full_description: data.full_description,
			category_id: Number(data.category_id),
			isVerified: data.product_varification,
			price: data.price,
			quantity: data.quantity,
		}).then((response) => {
			if (response.data.message === data.name + " added successfully") {
				form.reset();
				toast.success("Product Added Successfully");
			}
		});
	};

	return (
		<div className=" auth-page-header my-24 mt-3 rounded-md">
			<div className="auth-page-header space-mb--50 w-full">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">
								Add Product
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div className="auth-page-body rounded-md">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="auth-form rounded-md">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="name">Name</label>
										<input
											{...register("name")}
											type="text"
											name="name"
											id="name"
											placeholder="Enter Name"
										/>
										<p className="text-danger">
											{errors.name?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="category">
											Category
										</label>
										<br />
										<select
											name="category"
											id="category"
											defaultValue={"0"}
											onChange={changedCategory}
											className="select select-bordered w-full max-w-xs"
										>
											<option value="0">
												Select Category
											</option>
											{categoryNames &&
												categoryNames.map(
													(categories) => (
														<option
															key={categories.id}
															value={
																categories.id
															}
														>
															{categories.name}
														</option>
													)
												)}
										</select>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="image">Image</label>
										<input
											{...register("image")}
											type="file"
											name="image"
											id="image"
											accept="image/*"
											className="file-input file-input-bordered file-input-success w-full "
											onChange={handleImage}
										/>
										<p className="text-danger">
											{errors.image?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="short_description">
											Short Description
										</label>
										<input
											{...register("short_description")}
											type="text"
											name="short_description"
											id="short_description"
											placeholder="Enter Short Description"
										/>
										<p className="text-danger">
											{errors.short_description?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="full_description">
											Full Description
										</label>
										<input
											{...register("full_description")}
											type="text"
											name="full_description"
											id="full_description"
											placeholder="Enter Full Description"
										/>
										<p className="text-danger">
											{errors.full_description?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30 my-4">
										<label htmlFor="product_varification">
											Product Verification
										</label>

										<br />
										<select
											{...register(
												"product_varification"
											)}
											defaultValue={"notVerified"}
											className="select select-bordered w-full "
											placeholder="Enter Full Varification"
										>
											<option disabled>Select One</option>
											<option value="verified">
												Verified
											</option>
											<option value="notVerified">
												Not Verified
											</option>
										</select>
										<p className="text-danger">
											{
												errors.product_varification
													?.message
											}
										</p>
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
										<label htmlFor="quantity">
											Quantity
										</label>
										<input
											{...register("quantity")}
											type="number"
											name="quantity"
											id="quantity"
											placeholder="Enter Quantity"
										/>
										<p className="text-danger">
											{errors.quantity?.message}
										</p>
									</div>

									<button className="auth-form__button">
										Add Product
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

export default AddProductForm;
