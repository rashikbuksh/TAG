import Modal from "@components/Modal/Modal";
import { api } from "@lib/api";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductDetailsModal = ({ isOpen, setIsOpen, product }) => {
	const [isEditActive, setIsEditActive] = useState(false);
	const [productName, setProductName] = useState(product.name);
	const [title, setTitle] = useState(product.title);

	const [productShortDescription, setProductShortDescription] = useState(
		product.short_description
	);
	const [productFullDescription, setProductFullDescription] = useState(
		product.full_description
	);

	useEffect(() => {
		// Reset the input fields when the product prop changes
		setProductName(product.name);
		setTitle(product.title);
		setProductShortDescription(product.short_description);
		setProductFullDescription(product.full_description);
	}, [product]);

	const id = product.id;

	const handleEdit = () => {
		setIsEditActive(!isEditActive); // Toggle the isEditActive state
	};

	const handleUpdate = () => {
		api.post(`/product/update_product/${id}`, {
			name: productName,
			short_description: productShortDescription,
			full_description: productFullDescription,
			title: title,
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
				toast.success("Image uploaded successfully");
				if (imageSlot === "image") {
					api.post(`/product/updateProductImage/${product.id}`, {
						image: response.data.productImage,
					});
				}
				if (imageSlot === "optionalImage1") {
					api.post(`/product/updateOptionalImage1/${product.id}`, {
						image: response.data.productImage,
					});
				}
				if (imageSlot === "image") {
					api.post(`/product/updateOptionalImage2/${product.id}`, {
						optionalImage2: response.data.productImage,
					});
				}
			} else {
				toast.error("Failed to upload image");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image");
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} fullWidth={true}>
			<div className="flex flex-col items-center p-4">
				<div className="mb-4">
					{product.image ? (
						<img
							className="h-48 w-auto rounded object-contain"
							src={`${
								import.meta.env.VITE_APP_IMG_URL
							}/products/${product.image}`}
							alt=""
						/>
					) : (
						<img
							className="h-48 w-auto rounded object-contain"
							src="/placeholder-image.jpg" // Provide your placeholder image URL here
							alt="Placeholder"
						/>
					)}
				</div>
				<div className="mb-4">
					{product.image ? (
						<img
							className="h-48 w-auto rounded object-contain"
							src={`${
								import.meta.env.VITE_APP_IMG_URL
							}/products/${product.image}`}
							alt=""
						/>
					) : (
						<div className="flex h-48 w-auto items-center justify-center rounded border-dashed border-gray-400">
							<label htmlFor="uploadImage">
								<span className="cursor-pointer text-gray-500">
									Upload Image
								</span>
								<input
									id="uploadImage"
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
							className="h-48 w-auto rounded object-contain"
							src={`${
								import.meta.env.VITE_APP_IMG_URL
							}/products/${product.optionalImage1}`}
							alt=""
						/>
					) : (
						<div className="flex h-48 w-auto items-center justify-center rounded border-dashed border-gray-400">
							<label htmlFor="uploadOptionalImage1">
								<span className="cursor-pointer text-gray-500">
									Upload Optional Image 1
								</span>
								<input
									id="uploadOptionalImage1"
									type="file"
									className="hidden"
									onChange={(e) =>
										handleImageUpload(e, "optionalImage1")
									}
								/>
							</label>
						</div>
					)}
				</div>
				<div className="mb-4">
					{product.optionalImage2 ? (
						<img
							className="h-48 w-auto rounded object-contain"
							src={`${
								import.meta.env.VITE_APP_IMG_URL
							}/products/${product.optionalImage2}`}
							alt=""
						/>
					) : (
						<div className="flex h-48 w-auto items-center justify-center rounded border-dashed border-gray-400">
							<label htmlFor="uploadOptionalImage2">
								<span className="cursor-pointer text-gray-500">
									Upload Optional Image 2
								</span>
								<input
									id="uploadOptionalImage2"
									type="file"
									className="hidden"
									onChange={(e) =>
										handleImageUpload(e, "optionalImage2")
									}
								/>
							</label>
						</div>
					)}
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
						<textarea
							id="fullDescription"
							readOnly={!isEditActive}
							className="textarea textarea-bordered textarea-md px-3 py-2"
							value={productFullDescription}
							onChange={(e) =>
								setProductFullDescription(e.target.value)
							}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProductDetailsModal;
