/* eslint-disable react/prop-types */
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { api } from "../../lib/api";
import { useAuth } from "../../context/auth";

const ShopkeeperProductcart = ({ product, onProductSelection, isSelected }) => {
	const {
		id,
		name,
		price,
		discount,
		product_count,
		product_id,
		image,
		isVerified,
	} = product;
	const browserUrl = window.location.pathname;
	// State for quantity
	const [quantity, setQuantity] = useState(0);
	const [newPrice, setNewPrice] = useState();
	const [newDisCount, setnewDisCount] = useState(0);
	// Function to increase quantity
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	// Function to decrease quantity
	const decreaseQuantity = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	const updateProductCount = () => {
		api.post(`/product/updateProductCount`, {
			id: id,
			product_count: quantity,
		}).then((res) => {
			// console.log("res", res);
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
		// console.log(e.target.value);
		setNewPrice(e.target.value);
	};
	const handleDiscountChange = (e) => {
		console.log(e.target.value);
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
			// console.log("res", res);
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
		api.delete(`/news/deletenews/${id}`);
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (isConfirmed) {
			api.delete(`/shopperproduct/deleteshopperproduct/${id}`)
				.then((res) => {
					// console.log("res", res);
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
	const handleNotAvailable = () => {
		setQuantity(0);
		updateProductCount();
	};
	const { user } = useAuth();
	const handleCheckboxChange = (e) => {
		// Check if newPrice is not empty
		if (newPrice && quantity) {
			const selectedProductInfo = {
				name: name,
				price: newPrice,
				discount: newDisCount,
				product_count: quantity,
				product_id: id,
				shopper_id: user.id,
				image: image,
			};
			onProductSelection(selectedProductInfo, e.target.checked);
		} else {
			// Prevent selection if newPrice is empty
			alert("Please enter a price, Discount,Quantity before selecting.");
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
					{/* {browserUrl === "/shopkeeperProduct" ? (
						<div className="dropdown dropdown-top">
							<label tabIndex={0} className="m-1">
								<FaBars />
							</label>
							<ul
								tabIndex={0}
								className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
							>
								<li>
									<button onClick={handleEditClick}>
										Edit
									</button>
								</li>
								<li>
									<button onClick={handleDeleteClick}>
										Delete
									</button>
								</li>
								<li>
									<a>Share</a>
								</li>
								<li>
									<button onClick={handleNotAvailable}>
										Not Available
									</button>
								</li>
							</ul>
						</div>
					) : (
						""
					)} */}
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
											onClick={decreaseQuantity}
										>
											<FaMinus />
										</button>
										<input
											className="w-full bg-[#F2F8FD] text-center"
											type="text"
											value={quantity}
											readOnly
										/>
										<button
											className="flex h-[30px]   w-[60px] items-center justify-center bg-[#60abe9] text-base   text-white "
											onClick={increaseQuantity}
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
										max={isVerified ? price : ""}
										value={newPrice} // Set input value to newPrice
										onChange={handlePriceChange}
										id=""
									/>
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
