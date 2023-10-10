import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../lib/api";

const AddProductForm = () => {
	const [categoryNames, setCategoryNames] = useState([]);

	// file upload
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

	const addProductScema = yup.object({
		name: yup.string().required("Name required"),
		short_description: yup.string().required("short_description required"),
		full_description: yup.string().required("full_description required"),
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
	});
	const form = useForm({
		defaultValues: {
			name: "",
			image: "",
			short_description: "",
			full_description: "",
			category_id: "",
		},
		resolver: yupResolver(addProductScema),
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const changedCategory = (e) => {
		console.log(e.target.value);
		form.setValue("category_id", e.target.value);
	};

	const onSubmit = async (data) => {
		// console.log(data.product_varification);
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
			console.log(response.data);
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
		}).then((response) => {
			if (response.data.message === data.name + " added successfully") {
				alert("Product Added Successful");
			}
		});
	};
	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120 mt-3">
			{/* auth page header */}
			<div className="auth-page-header space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">Welcome</h3>
							<p className="auth-page-header__text">
								Add Product
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* auth page body */}
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form">
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
											onChange={changedCategory}
											defaultValue={0}
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
											onChange={handleImage}
										/>
										<p className="text-danger">
											{errors.image?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30 ">
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
										<label htmlFor="Product_verification">
											Product Verification
										</label>
										<select
											{...register(
												"product_varification"
											)}
											className="select select-bordered w-full max-w-xs"
										>
											<option disabled selected>
												Select One
											</option>
											<option value={"verified"}>
												Verified
											</option>
											<option value={"notVerified"}>
												Not Verified
											</option>
										</select>
										<p className="text-danger">
											{errors.full_description?.message}
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
			{/* auth page footer */}
		</div>
	);
};
export default AddProductForm;
