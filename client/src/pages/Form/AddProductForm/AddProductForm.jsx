import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextEditor from "@components/TextEditor/TextEditor";
import * as yup from "yup";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const AddProductForm = () => {
	const [categoryNames, setCategoryNames] = useState([]);
	const [FullDescriptionValue, setFullDescriptionValue] = useState("");
	const [imagesWithIndex, setImagesWithIndex] = useState([]);

	const handleImage = (e) => {
		const files = e.target.files;
		console.log("🚀 ~ handleImage ~ files:", files);
		if (files.length > 3 || files.length < 3) {
			// Show error message
			toast.error("Please select exactly 3 images.");
			return;
		}

		// Store the files along with their indices
		const indexedFiles = Array.from(files).map((file, index) => ({
			file,
			index,
		}));
		setImagesWithIndex(indexedFiles);
	};

	useEffect(() => {
		api.get(`/category/getcategory`).then((response) => {
			setCategoryNames(response.data);
		});
	}, []);

	const addProductSchema = yup.object({
		name: yup.string().required("Name required"),
		short_description: yup.string(),
		title: yup.string().required("Title required"),
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
			.string()
			.when(["product_varification"], (product_varification, schema) => {
				return product_varification === "verified"
					? schema
							.required("Price is required")
							.test(
								"is-number",
								"Price must be a number",
								(value) => {
									if (!value) return false;
									return !isNaN(Number(value));
								}
							)
					: schema;
			}),
		quantity: yup
			.string()
			.when(["product_varification"], (product_varification, schema) => {
				return product_varification === "verified"
					? schema
							.required("Quantity is required")
							.test(
								"is-number",
								"Quantity must be a number",
								(value) => {
									if (!value) return false;
									return !isNaN(Number(value));
								}
							)
					: schema;
			}),
		keywords: yup.string().required("Keywords required"),
	});

	const form = useForm({
		defaultValues: {
			name: "",
			image: "",
			short_description: "",
			title: "",
			category_id: "",
			product_varification: "",
			price: "",
			quantity: "",
			keywords: "",
		},
		resolver: yupResolver(addProductSchema),
	});

	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const changedCategory = (e) => {
		form.setValue("category_id", e.target.value);
	};

	const onNameChange = (e) => {
		const value = e.target.value;
		setValue("title", value.replace(/\s/g, "_"));
	};

	const handleTitleChange = (e) => {
		const value = e.target.value;
		const updatedValue = value.replace(/\s/g, "_");
		setValue("title", updatedValue);
	};

	const onSubmit = async (data) => {
		console.log(data);
		const formData = new FormData();

		// Append each image to the FormData object in the correct order
		imagesWithIndex.forEach(({ file, index }) => {
			formData.append(`uploadFiles[${index}]`, file);
		});

		const imageNames = await Promise.all(
			imagesWithIndex.map(async ({ file }) => {
				const formData = new FormData();
				formData.append("uploadFiles", file);

				const response = await Axios.post(
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
				);

				if (response.data.msg === "Files Uploaded") {
					return response.data.imageNames;
				}
			})
		);

		data.image = imageNames[0] || "";
		data.image1 = imageNames[1] || "";
		data.image2 = imageNames[2] || "";

		api.post(`/product/addproduct`, {
			name: data.name,
			image: data.image,
			optionalImage1: data.image1,
			optionalImage2: data.image2,
			short_description: data.short_description,
			title: data.title,
			full_description: FullDescriptionValue,
			category_id: Number(data.category_id),
			isVerified: data.product_varification,
			price: data.price,
			quantity: data.quantity,
			keywords: data.keywords,
		}).then((response) => {
			if (response.data.message === data.name + " added successfully") {
				form.reset();
				toast.success("Product Added Successfully");
			}
		});
	};
	const moveImage = (currentIndex, targetIndex) => {
		const updatedImages = [...imagesWithIndex];
		const movedImage = updatedImages.splice(currentIndex, 1)[0];
		updatedImages.splice(targetIndex, 0, movedImage);
		setImagesWithIndex(updatedImages);
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
											onChange={onNameChange}
										/>
										<p className="text-danger">
											{errors.name?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="name">Title</label>
										<input
											{...register("title")}
											type="text"
											name="title"
											id="title"
											placeholder="Enter title"
											onChange={handleTitleChange}
											value={formState?.values?.title}
										/>
										<p className="text-danger">
											{errors.title?.message}
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
											className="select select-bordered w-full "
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
											multiple
											onChange={handleImage}
										/>
										{imagesWithIndex.map(
											({ file, index }) => (
												<div
													key={index}
													className="flex items-center justify-between border-b border-gray-200 py-2"
												>
													<div className="flex items-center justify-between space-x-4">
														<div className="flex items-center space-x-2">
															<img
																src={URL.createObjectURL(
																	file
																)}
																alt={`Image ${index}`}
																className="h-10 w-10 rounded-full"
															/>
															<p className="text-lg text-gray-800">
																{index === 0
																	? "Image"
																	: `Optional Image ${index}`}
															</p>
														</div>
														<div className="flex-grow">
															<p className="truncate text-sm text-gray-500">
																{file.name}
															</p>
														</div>
													</div>
													<div className="flex items-center space-x-2">
														{/* Button to move image up */}
														{index > 0 && (
															<span
																onClick={() =>
																	moveImage(
																		index,
																		index -
																			1
																	)
																}
																className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
															>
																<FaArrowUp className="h-5 w-5" />
															</span>
														)}
														{/* Button to move image down */}
														{index <
															imagesWithIndex.length -
																1 && (
															<span
																onClick={() =>
																	moveImage(
																		index,
																		index +
																			1
																	)
																}
																className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
															>
																<FaArrowDown className="h-5 w-5" />
															</span>
														)}
													</div>
												</div>
											)
										)}
										<p className="text-danger">
											{errors.image?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="short_description">
											Short Description (For seo) optional
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
										<TextEditor
											value={FullDescriptionValue}
											setValue={setFullDescriptionValue}
											placeholder={
												"Write full description value"
											}
											style={{
												height: "30vh",
												display: "flex",
												flexDirection: "column",
											}}
										/>
										<p className="text-danger">
											{errors.full_description?.message}
										</p>
									</div>

									<div className="auth-form__single-field space-mb--30 mb-4 mt-16">
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

									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="keywords">
											Keyword
										</label>
										<input
											{...register("keywords")}
											type="text"
											name="keywords"
											id="keywords"
											placeholder="Enter keywords"
										/>
										<p className="text-danger">
											{errors.keywords?.message}
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
