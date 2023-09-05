/* eslint-disable react/prop-types */
import Axios from "axios";
import { useState } from "react";
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
								<a>Edit</a>
							</li>
							<li>
								<a>Delete</a>
							</li>
							<li>
								<a>Share</a>
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
								className="btn btn-primary"
							>
								Confirm
							</button>
						</div>
					</div>
					<p className="text-center text-xl font-bold">
						Price {price} Taka
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShopkeeperProductcart;
