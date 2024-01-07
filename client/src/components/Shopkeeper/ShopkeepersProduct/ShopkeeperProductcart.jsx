/* eslint-disable react/prop-types */
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { useAuth } from "../../../context/auth";
import { api } from "../../../lib/api";

const ShopkeeperProductcart = ({ product, onProductSelection, isSelected }) => {
	const {
		id,
		name,
		price,
		discount,
		quantity,
		product_id,
		image,
		isVerified,
	} = product;
	const browserUrl = window.location.pathname;
	// State for newQuantity
	const [newQuantity, setnewQuantity] = useState(
		parseInt(!quantity ? 0 : quantity)
	);
	const [newPrice, setNewPrice] = useState(price);
	const [newDisCount, setnewDisCount] = useState(0);
	// Function to increase newQuantity
	const increasenewQuantity = () => {
		setnewQuantity(newQuantity + 1);
	};

	// Function to decrease newQuantity
	const decreasenewQuantity = () => {
		if (newQuantity > 0) {
			setnewQuantity(newQuantity - 1);
		}
	};

	const updateProductCount = () => {
		api.post(`/product/updateProductCount`, {
			id: id,
			product_count: newQuantity,
		}).then((res) => {
			if (res.data.status === 200) {
				alert("Product Count Updated Successfully");
			}
		});
	};

	const [isEditingPrice, setIsEditingPrice] = useState(false);

	const handleEditClick = () => {
		setIsEditingPrice(true);
	};

	const handlePriceChange = (e) => {
		if (isVerified === "verified") {
			// If the product is verified, show a warning message
			alert("Cannot edit price for verified products");
			return;
		}

		const enteredPrice = parseFloat(e.target.value);
		setNewPrice(enteredPrice);
	};
	const handleDiscountChange = (e) => {
		setnewDisCount(e.target.value);
	};

	const handlePriceUpdate = () => {
		// Send a request to update the price in your API
		// You can use `newPrice` for the updated price value
		// After the price is updated, you can set isEditingPrice to false
		// and update the product's price in your component state

		api.post("/shopperproduct/updateProductPrice", {
			id: id,
			price: newPrice,
		}).then((res) => {
			if (res.data.status === 200) {
				alert("Product Price Updated Successfully");
			}
		});

		setIsEditingPrice(false);
	};

	const handleCancelPriceUpdate = () => {
		setIsEditingPrice(false);
	};

	const handleDeleteClick = () => {
		api.delete(`/news/deletenews/${id}/by/shopperproduct`);
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (isConfirmed) {
			api.delete(`/shopperproduct/deleteshopperproduct/${id}`)
				.then((res) => {
					if (res.data.status === 200) {
						alert("Product Deleted Successfully");
						window.location.reload();
						// You may also want to update your UI to remove the deleted product from the list
						// Assuming you have a function to remove the product from the list, you can call it here.
					} else {
						alert(
							"Failed to delete the product. Please try again."
						);
					}
				})
				.catch((error) => {
					console.error("Error deleting product:", error);
					alert(
						"An error occurred while deleting the product. Please try again."
					);
				});
		}
	};

	const { user } = useAuth();
	const handleCheckboxChange = (e) => {
		// Check if newPrice is not empty
		if (newPrice) {
			const selectedProductInfo = {
				name: name,
				price: newPrice,
				discount: newDisCount,
				product_count: newQuantity,
				product_id: id,
				shopper_id: user.id,
				image: image,
			};
			onProductSelection(selectedProductInfo, e.target.checked);
		} else {
			// Prevent selection if newPrice is empty
			alert(
				"Please enter a price, Discount,newQuantity before selecting."
			);
			// You might want to handle this scenario by showing an error message or taking appropriate action
		}
	};
	return (
		<div className="w-[190px] px-0.5">
			<div className="lg:mx-0 ">
				<div className="mb-1 flex h-[50px]  items-center gap-3 border px-2 py-1">
					<input
						type="checkbox"
						className="checkbox-success checkbox checkbox-xs"
						onChange={handleCheckboxChange}
						checked={isSelected}
					/>
					<h1 className="text-xs">{name}</h1>
					<div>
						{isVerified === "verified" ? (
							<FaCheckCircle className=" primary-text"></FaCheckCircle>
						) : (
							""
						)}
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-1 border p-1">
					<img
						className="h-[100px] w-[100px]"
						src={`${
							import.meta.env.VITE_APP_IMG_URL
						}/products/${image}`}
						alt="No Image"
					/>
					<div>
						<div className="my-2 flex flex-col items-center ">
							<div>
								<div className="">
									<label className="">QTY:</label>
									<div className="flex w-full items-center justify-between gap-2 rounded-lg bg-[#F2F8FD]   sm:text-sm">
										<button
											className="flex h-[30px]   w-[60px] items-center justify-center bg-[#60abe9] text-base   text-white"
											onClick={decreasenewQuantity}
										>
											<FaMinus />
										</button>
										<input
											className="w-full bg-[#F2F8FD] text-center"
											type="number"
											value={newQuantity}
											onChange={(e) =>
												setnewQuantity(
													parseInt(e.target.value)
												)
											}
										/>
										<button
											className="flex h-[30px]   w-[60px] items-center justify-center bg-[#60abe9] text-base   text-white "
											onClick={increasenewQuantity}
										>
											<FaPlus />
										</button>
									</div>
								</div>

								<div className="mt-0.5  flex flex-col gap-0.5">
									<label className="">Price:</label>
									<input
										type="number"
										className="w-full rounded-lg bg-[#F2F8FD] px-2 py-1 pe-10  sm:text-sm"
										placeholder={`Enter Price`}
										name=""
										value={
											isVerified === "verified"
												? price
												: newPrice
										} // Set input value to newPrice
										disabled={isVerified === "verified"}
										onChange={handlePriceChange}
										id=""
									/>
									{isVerified === "verified" ? (
										<p className="flex items-center gap-1 text-xs text-red-400">
											Price must be <Takaicon /> {price}{" "}
										</p>
									) : (
										<p className="flex items-center gap-3 text-xs text-red-400">
											Suggested Price- <Takaicon />
											{price ? price : "N/A"}
										</p>
									)}
								</div>
								<div className="relative  mt-0.5 flex flex-col gap-0.5">
									<label className="">Discount:</label>
									<input
										type="text"
										className="w-full rounded-lg bg-[#F2F8FD] px-2 py-1 pe-10  sm:text-sm"
										placeholder="Enter Discount"
										name=""
										// Update newPrice state when input changes
										id=""
										value={newDisCount} // Set input value to newPrice
										onChange={handleDiscountChange}
									/>
									<p className="absolute right-1 top-7">%</p>
								</div>
							</div>

							{browserUrl === "/shopkeeperProduct" ? (
								<button
									type="button"
									onClick={updateProductCount}
									className="rounded-md bg-blue-200 px-2 py-1 text-black"
								>
									Confirm
								</button>
							) : (
								""
							)}
						</div>
					</div>
					<div>
						{isEditingPrice ? (
							<div className="flex items-center justify-center gap-3">
								<label className="text-xs">Change Price</label>
								<input
									className="text-center text-xl font-bold"
									style={{
										width: "90px",
										borderRadius: "5px",
										border: "1px solid #ccc",
										marginBottom: "10px",
									}}
									type="number"
									value={newPrice}
									onChange={handlePriceChange}
								/>
								<button
									type="button"
									onClick={handlePriceUpdate}
									className="rounded-md bg-blue-200  px-2 text-black"
								>
									Update
								</button>
								<button
									type="button"
									onClick={handleCancelPriceUpdate}
									className="rounded-md bg-blue-200  px-2 text-black"
								>
									Cancel
								</button>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopkeeperProductcart;
