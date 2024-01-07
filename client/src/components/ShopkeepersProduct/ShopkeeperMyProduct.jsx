/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaBars, FaCheckCircle, FaEye, FaMinus, FaPlus } from "react-icons/fa";
import { Takaicon } from "../../SvgHub/SocialIcon";
import { api } from "../../lib/api";

const ShopkeeperMyProduct = ({ product, index }) => {
	const { id, name, price, product_count, image, isVerified,discount,view } = product;

	const [quantity, setQuantity] = useState(product_count);
	const [newPrice, setNewPrice] = useState(price);
	const [newDisCount, setNewDisCount] = useState(discount);
	const [isEditingPrice, setIsEditingPrice] = useState(false);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	const handleEditClick = () => {
		setIsEditingPrice(true);
	};

	const handleCancelPriceUpdate = () => {
		setIsEditingPrice(false);
		setNewPrice(price); // Reset newPrice to the original price
	};

	const handlePriceChange = (e) => {
		if (isVerified === "verified") {
			alert("Cannot edit price for verified products");
			return;
		}

		const enteredPrice = parseFloat(e.target.value);

		setNewPrice(enteredPrice);
	};

	const handleDiscountChange = (e) => {
		setNewDisCount(e.target.value);
	};
	const handleProductUpdate = () => {
		if (isVerified === "verified") {
			alert("Cannot edit price for verified products");
			return;
		}

		api.post("/shopperproduct/updateProductDetails", {
			id: id,
			price: newPrice,
			discount: newDisCount,
			quantity: quantity,
		})
			.then((res) => {
				if (res.data.status === 200) {
					alert("Product Price Updated Successfully");
				}
			})
			.catch((error) => {
				console.error("Error updating product price:", error);
				alert("Failed to update product price. Please try again.");
			});

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
	const handleNotAvailable = () => {
		setQuantity(0);
		handleProductUpdate();
	};
	return (
		<div className="mx-auto px-0.5 md:w-[190px]">
			<div className="lg:mx-0">
				<div className="mb-1 flex h-[50px] items-center justify-between gap-3 border px-2 py-1">
					<h1 className="text-xs">{name}</h1>
					<div>
						{isVerified === "verified" ? (
							<FaCheckCircle className="primary-text" />
						) : (
							""
						)}
					</div>
					<div className="flex h-screen items-center justify-center">
						<div className="dropdown relative">
							<div
								className={`dropdown dropdown-${
									index % 2 === 0 ? "right" : "left"
								}`}
							>
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
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-1 border p-1">
					<img
						className="h-[100px] w-[200px] md:h-[100px] md:w-[100px]"
						src={`${
							import.meta.env.VITE_APP_IMG_URL
						}/products/${image}`}
						alt="No Image"
					/>
					<div>
						<p className="flex justify-end items-center gap-2"><FaEye/>{view}</p>
					
						<div className="my-2 flex flex-col items-center">
							<div>
								<label>QTY:</label>
								<div className="flex w-full items-center justify-between gap-2 rounded-lg bg-[#F2F8FD] sm:text-sm">
									<button
										className="flex h-[30px] w-[60px] items-center justify-center bg-[#60abe9] text-base text-white"
										disabled={!isEditingPrice}
										onClick={decreaseQuantity}
									>
										<FaMinus />
									</button>
									<input
										className="w-full bg-[#F2F8FD] text-center"
										type="text"
										value={quantity}
										disabled={!isEditingPrice}
										readOnly
									/>
									<button
										className="flex h-[30px] w-[60px] items-center justify-center bg-[#60abe9] text-base text-white"
										disabled={!isEditingPrice}
										onClick={increaseQuantity}
									>
										<FaPlus />
									</button>
								</div>
							</div>
							<div className="mt-0.5 flex flex-col gap-0.5">
								<label>Price:</label>
								<input
									type="number"
									className="w-full rounded-lg bg-[#F2F8FD] px-2 py-1 pe-10 sm:text-sm"
									value={
										isVerified === "verified"
											? price
											: newPrice
									}
									disabled={
										isVerified === "verified" ||
										!isEditingPrice
									}
									onChange={handlePriceChange}
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
							<div className="relative mt-0.5 flex flex-col gap-0.5">
								<label>Discount:</label>
								<input
									type="text"
									className="w-full rounded-lg bg-[#F2F8FD] px-2 py-1 pe-10 sm:text-sm"
									value={newDisCount}
									disabled={!isEditingPrice}
									onChange={handleDiscountChange}
								/>
								<p className="absolute right-1 top-7">%</p>
							</div>
							{isEditingPrice ? (
								<div className="flex items-center justify-center gap-3">
									<button
										type="button"
										onClick={handleProductUpdate}
										className="rounded-md bg-blue-200 px-2 text-black"
									>
										Update
									</button>
									<button
										type="button"
										onClick={handleCancelPriceUpdate}
										className="rounded-md bg-blue-200 px-2 text-black"
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
		</div>
	);
};

export default ShopkeeperMyProduct;
