import Modal from "@components/Modal/Modal";
import { api } from "@lib/api";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextEditor from "@components/TextEditor/TextEditor";

const ProductDetailsModal = ({ isOpen, setIsOpen, product }) => {
	console.log("🚀 ~ ProductDetailsModal ~ product:", product);
	const [isEditActive, setIsEditActive] = useState(false);
	const [productName, setProductName] = useState(product.name);
	const [title, setTitle] = useState(product.title);
	const [keywords, setkeywords] = useState(product.keywords);
	const [FullDescriptionValue, setFullDescriptionValue] = useState("");
	console.log("🚀 ~ ProductDetailsModal ~ FullDescriptionValue:", FullDescriptionValue)
	const [productShortDescription, setProductShortDescription] = useState(
		product.short_description
	);
	// const [productFullDescription, setProductFullDescription] = useState(
	// 	product.full_description
	// );

	useEffect(() => {
		// Reset the input fields when the product prop changes
		setProductName(product.name);
		setTitle(product.title);
		setProductShortDescription(product.short_description);
		setFullDescriptionValue(product.full_description);
	}, [product]);

	const id = product.id;

	const handleEdit = () => {
		setIsEditActive(!isEditActive); // Toggle the isEditActive state
	};

	const handleUpdate = () => {
		api.post(`/product/update_product/${id}`, {
			name: productName,
			short_description: productShortDescription,
			full_description: FullDescriptionValue,
			title: title,
			keywords: keywords,
		})
			.then((response) => {
				toast(response.data.message);
				if (response.status === 200) {
					toast("Change seccess");
					setIsEditActive(false); // Disable editing after successful update
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handelVarified = () => {
		api.post(`/product/update_varification/${id}`, {
			isVerified: "verified",
		})
			.then((response) => {
				toast(response.data.message);
				if (response.status === 200) {
					toast("Change seccess");
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};
	const handleImageUpload = async (e, imageSlot) => {
		const file = e.target.files[0];

		if (!file) {
			return; // No file selected
		}

		// Add your logic to handle image upload here
		const formData = new FormData();
		formData.append("uploadFiles", file);
		let imageName;
		try {
			const response = await Axios.post(
				`${
					import.meta.env.VITE_APP_API_URL
				}/imageUpload/uploadProductImage/update`, // Replace with your upload endpoint
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: Cookies?.get("auth"),
					},
				}
			);

			if (response.data.msg === "File Uploaded") {
				console.log(imageSlot);
				imageName = response.data.productImage;
			} else {
				toast.error("Failed to upload image");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image");
		}

		if (imageSlot === "image" && imageName) {
			api.post(`/product/updateProductImage/${product.id}`, {
				image: imageName,
			})
				.then((response) => {
					if (response.data.status == 200) {
						toast.success("Image uploaded successfully");
					}
				})
				.catch((error) => {
					toast.error("Failed to upload image");
				});
		}
		if (imageSlot === "optionalImage1" && imageName) {
			api.post(`/product/updateOptionalImage1/${product.id}`, {
				optionalImage1: imageName,
			})
				.then((response) => {
					if (response.data.status == 200) {
						toast.success("Image uploaded successfully");
					}
				})
				.catch((error) => {
					toast.error("Failed to upload image");
				});
		}
		if (imageSlot === "optionalImage2" && imageName) {
			api.post(`/product/updateOptionalImage2/${product.id}`, {
				optionalImage2: imageName,
			})
				.then((response) => {
					if (response.data.status == 200) {
						toast.success("Image uploaded successfully");
					}
				})
				.catch((error) => {
					toast.error("Failed to upload image");
				});
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} fullWidth={true}>
			<div className="flex flex-col  items-center p-4">
				<div className="flex gap-3">
					<div className="mb-4">
						{product.image ? (
							<img
								className="h-64 w-auto rounded object-contain"
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/products/${product.image}`}
								alt=""
							/>
						) : (
							<div className="flex w-full items-center justify-center">
								<label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
									<div className="flex flex-col items-center justify-center pb-6 pt-5">
										<svg
											className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="font-semibold">
												Click to upload
											</span>{" "}
											or drag and drop
										</p>
									</div>
									<input
										id="dropzone-file"
										type="file"
										className="hidden"
										onChange={(e) =>
											handleImageUpload(e, "image")
										}
									/>
								</label>
							</div>
						)}
					</div>
					<div className="mb-4">
						{product.optionalImage1 ? (
							<img
								className="h-64 w-auto rounded object-contain"
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/products/${product.optionalImage1}`}
								alt=""
							/>
						) : (
							<div className="flex w-full items-center justify-center">
								<label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
									<div className="flex flex-col items-center justify-center pb-6 pt-5">
										<svg
											className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="font-semibold">
												Click to upload
											</span>{" "}
											or drag and drop
										</p>
									</div>
									<input
										id="dropzone-file"
										type="file"
										className="hidden"
										onChange={(e) =>
											handleImageUpload(
												e,
												"optionalImage1"
											)
										}
									/>
								</label>
							</div>
						)}
					</div>
					<div className="mb-4">
						{product.optionalImage2 ? (
							<img
								className="h-64 w-auto rounded object-contain"
								src={`${
									import.meta.env.VITE_APP_IMG_URL
								}/products/${product.optionalImage2}`}
								alt=""
							/>
						) : (
							<div className="flex w-full items-center justify-center">
								<label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
									<div className="flex flex-col items-center justify-center pb-6 pt-5">
										<svg
											className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span className="font-semibold">
												Click to upload
											</span>{" "}
											or drag and drop
										</p>
									</div>
									<input
										id="dropzone-file"
										type="file"
										className="hidden"
										onChange={(e) =>
											handleImageUpload(
												e,
												"optionalImage2"
											)
										}
									/>
								</label>
							</div>
						)}
					</div>
				</div>

				<div className="mb-4 flex items-center justify-center">
					<div>
						<button
							onClick={handleEdit}
							className="btn btn-success btn-sm mr-2"
						>
							{isEditActive ? "Cancel" : "Edit"}
						</button>
						{product.isVerified !== "verified" && (
							<button
								onClick={handelVarified}
								className="btn btn-info btn-sm mr-2"
							>
								Verify
							</button>
						)}
						<button className="btn btn-error btn-sm">Delete</button>
					</div>
					{isEditActive && (
						<button
							onClick={handleUpdate}
							className="btn btn-success btn-sm"
						>
							Submit
						</button>
					)}
				</div>
				<div className="w-full">
					<div className="mb-4 flex flex-col">
						<label htmlFor="productName" className="mb-2 font-bold">
							Name:
						</label>
						<input
							id="productName"
							readOnly={!isEditActive}
							className="input input-bordered input-md px-3 py-2"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</div>
					<div className="mb-4 flex flex-col">
						<label htmlFor="title" className="mb-2 font-bold">
							Title:
						</label>
						<input
							id="title"
							readOnly={!isEditActive}
							className="input input-bordered input-md px-3 py-2"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="mb-4 flex flex-col">
						<label
							htmlFor="shortDescription"
							className="mb-2 font-bold"
						>
							Short Description:
						</label>
						<input
							id="shortDescription"
							readOnly={!isEditActive}
							className="input input-bordered input-md px-3 py-2"
							value={productShortDescription}
							onChange={(e) =>
								setProductShortDescription(e.target.value)
							}
						/>
					</div>
					<div className="mb-4 flex flex-col">
						<label
							htmlFor="fullDescription"
							className="mb-2 font-bold"
						>
							Full Description:
						</label>
						{/* <textarea
							id="fullDescription"
							readOnly={!isEditActive}
							className="textarea textarea-bordered textarea-md px-3 py-2"
							value={productFullDescription}
							onChange={(e) =>
								setProductFullDescription(e.target.value)
							}
						/> */}
						<TextEditor
							value={FullDescriptionValue}
							setValue={setFullDescriptionValue}
							placeholder={"Write full description value"}
							style={{
								height: "30vh",
								display: "flex",
								flexDirection: "column",
							}}
							readOnly={!isEditActive}
						/>
					</div>
					<div className="mb-4 mt-5 flex flex-col">
						<label htmlFor="title" className="mb-2 font-bold">
							keywords:
						</label>
						<input
							id="title"
							readOnly={!isEditActive}
							className="input input-bordered input-md px-3 py-2"
							value={keywords}
							onChange={(e) => setkeywords(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProductDetailsModal;
