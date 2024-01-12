import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";


const ProductDetailsModal = ({ isOpen, setIsOpen, product }) => {
	const [isEditActive, setIsEditActive] = useState(true);
	const [productName, setProductName] = useState(product.name);
	const [productShortDescription, setProductShortDescription] = useState(
		product.short_description
	);
	const [productFullDescription, setProductFullDescription] = useState(
		product.full_description
	);

	const handleEdit = () => {
		setIsEditActive(!isEditActive);
	};

	useEffect(() => {
		// Reset the input fields when the product prop changes
		setProductName(product.name);
		setProductShortDescription(product.short_description);
		setProductFullDescription(product.full_description);
	}, [product]);
	const id = product.id;
	const handleUpdate = () => {
		api.post(`/product/update_product/${id}`, {
			name: productName,
			short_description: productShortDescription,
			full_description: productFullDescription,
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

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div>
				<div className="flex items-center justify-between">
					<img
						className="h-[200px] w-full rounded object-contain"
						src={`${import.meta.env.VITE_APP_IMG_URL}/products/${
							product.image
						}`}
						alt=""
					/>
				</div>
				<div className="my-2 p-3">
					<div className="flex-flex-grow-1 flex gap-2">
						<button
							onClick={handleEdit}
							className="btn btn-success btn-sm"
						>
							{isEditActive ? "Edit" : "Cancel"}
						</button>
						{product.isVerified === "verified" ? null : (
							<button
								className="btn btn-info btn-sm"
								onClick={handelVarified}
							>
								Verify
							</button>
						)}
						<button className="btn btn-error btn-sm">Delete</button>
					</div>
				</div>
				<div className="p-3">
					<p className="my-2 flex items-center gap-2">
						<span className="w-1/2 font-bold">Name:</span>{" "}
						<input
							disabled={isEditActive}
							className="input input-bordered input-md w-full max-w-xs flex-grow px-3 py-2"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</p>
					<p className="my-2 flex items-center gap-2 ">
						<span className="w-1/2 font-bold">
							Short Description:
						</span>{" "}
						<input
							disabled={isEditActive}
							className="input input-bordered input-md w-full max-w-xs flex-grow px-3 py-2"
							value={productShortDescription}
							onChange={(e) =>
								setProductShortDescription(e.target.value)
							}
						/>
					</p>
					<p className="my-2 flex items-center">
						<span className="w-1/2 font-bold">
							Full Description:
						</span>{" "}
						<textarea
							disabled={isEditActive}
							className="textarea textarea-bordered textarea-md w-full max-w-xs flex-grow"
							value={productFullDescription}
							onChange={(e) =>
								setProductFullDescription(e.target.value)
							}
						/>
					</p>
					{!isEditActive && (
						<button
							onClick={handleUpdate}
							className="btn btn-success btn-sm"
						>
							Submit
						</button>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ProductDetailsModal;
