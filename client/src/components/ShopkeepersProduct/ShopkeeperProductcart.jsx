/* eslint-disable react/prop-types */
import Axios from "axios";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { api } from "../../lib/api";

const ShopkeeperProductcart = ({ product }) => {
	const { id, name, price, discount, product_count, product_id, image } =
		product;

	// State for quantity
	const [quantity, setQuantity] = useState(product_count);

	// Function to increase quantity
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	// Function to decrease quantity
	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const updateProductCount = () => {
		api.post(`/product/updateProductCount`, {
			id: id,
			product_count: quantity,
		}).then((res) => {
			console.log("res", res);
			if (res.data.status === 200) {
				alert("Product Count Updated Successfully");
			}
		});
	};

	const [isEditingPrice, setIsEditingPrice] = useState(false);
	const [newPrice, setNewPrice] = useState(price);

	const handleEditClick = () => {
		setIsEditingPrice(true);
	};

	const handlePriceChange = (e) => {
		setNewPrice(e.target.value);
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
			console.log("res", res);
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
					console.log("res", res);
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
	const handleNotAvailable=()=>{
		setQuantity(0)
		updateProductCount()
	}

	return (
		<div className="">
			<div className="mx-4 h-[450px] border border-black p-4 lg:mx-0 lg:w-[600px]">
				<div className="flex items-center justify-between">
					<input
						type="checkbox"
						className="checkbox-success checkbox"
					/>
					<h1 className="text-xl font-bold">{name || ""}</h1>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn m-1">
							<FaBars />
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
						>
							<li>
								<button onClick={handleEditClick}>Edit</button>
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
								<button onClick={handleNotAvailable}>Not Available</button>
							</li>
						</ul>
					</div>
				</div>
				<div className="divider"></div>
				<div className="flex flex-col items-center justify-center gap-3">
					<img
						className="h-[200px] w-[200px]"
						src={`${import.meta.env.VITE_APP_IMG_URL}/${image}`}
						alt="No Image"
					/>
					<div>
						<label className="sr-only">Quantity</label>
						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={decreaseQuantity}
								className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
							>
								<FaMinus />
							</button>

							<input
								type="number"
								id="Quantity"
								value={quantity}
								className="h-10 w-16 rounded border border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
							/>

							<button
								type="button"
								onClick={increaseQuantity}
								className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
							>
								<FaPlus />
							</button>
							<button
								type="button"
								onClick={updateProductCount}
								className="bg-blue-200 px-2 py-1 text-black rounded-md"
							>
								Confirm
							</button>
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
									className="bg-blue-200 px-2  text-black rounded-md"
								>
									Update
								</button>
								<button
									type="button"
									onClick={handleCancelPriceUpdate}
									className="bg-blue-200 px-2  text-black rounded-md"
								>
									Cancel
								</button>
							</div>
						) : (
							<p className="text-center text-xl font-bold">
								Price {newPrice} Taka{" "}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopkeeperProductcart;
