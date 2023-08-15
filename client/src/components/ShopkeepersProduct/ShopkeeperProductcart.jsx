/* eslint-disable react/prop-types */
import Axios from "axios";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

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
		Axios.post(
			`${import.meta.env.VITE_APP_API_URL}/product/updateProductCount`,
			{
				id: id,
				product_count: quantity,
			}
		).then((res) => {
			console.log("res", res);
			if (res.data.status === 200) {
				alert("Product Count Updated Successfully");
			}
		});
	};

	return (
		<div className="">
			<div className="h-[450px] lg:w-[600px] border border-black p-4 mx-4 lg:mx-0">
				<div className="flex items-center justify-between">
					<input
						type="checkbox"
						className="checkbox checkbox-success"
					/>
					<h1 className="text-xl font-bold">{name || ""}</h1>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn m-1">
							<FaBars />
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
				<div className="flex items-center justify-center flex-col gap-3">
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
								className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
							>
								<FaMinus />
							</button>

							<input
								type="number"
								id="Quantity"
								value={quantity}
								className="h-10 w-16 rounded border border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
							/>

							<button
								type="button"
								onClick={increaseQuantity}
								className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
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
					<p className="font-bold text-xl text-center">
						Price {price} Taka
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShopkeeperProductcart;
