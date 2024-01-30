/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
	FaBars,
	FaCheckCircle,
	FaCopy,
	FaEye,
	FaFacebook,
	FaMinus,
	FaPlus,
} from "react-icons/fa";
import {
	FacebookIcon,
	InstagramIcon,
	Linkedin,
	Takaicon,
	TwitterIcon,
	WhatsappIcon,
} from "../../../SvgHub/SocialIcon";
import { api } from "../../../lib/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Drawer from "react-modern-drawer";
import { FaX } from "react-icons/fa6";
import GetDateTime from "../../../helpers/GetDateTime";
import { getDiscountPrice } from "../../../helpers/product";
const ShopkeeperMyProduct = ({ product, index }) => {
	const {
		id,
		name,
		price,
		product_count,
		image,
		isVerified,
		discount,
		view,
		shopper_id,
	} = product;
	console.log(product, "Product");
	const [category, setCategory] = useState([]);
	const [quantity, setQuantity] = useState(product_count);
	const [newPrice, setNewPrice] = useState(price);
	const [newDisCount, setNewDisCount] = useState(discount);
	const [isEditingPrice, setIsEditingPrice] = useState(false);
	const [copySuccess, setCopySuccess] = useState(null);
	const [util, setUtil] = useState([]);
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};
	useEffect(() => {
		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
		api.get(`/util/getUtil/product_discount`).then((response) => {
			setUtil(response.data[0]);
		});
	}, []);

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
			toast.warning("Cannot edit price for verified products");
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
			if (price !== newPrice) {
				toast.warning("Cannot edit price for verified products");
				return;
			}
		}

		api.post("/shopperproduct/updateProductDetails", {
			id: id,
			price: newPrice,
			discount: newDisCount,
			quantity: quantity,
		})
			.then((res) => {
				if (res.data.status === 200) {
					if (newDisCount >= parseInt(util.value)) {
						api.post(`/news/addproductnews`, {
							shopper_product_id: id,
							shop_id: shopper_id,
							date: GetDateTime(),
							discount: newDisCount,
							duration: "",
							location: "",
							category: "regular",
							post_content: `${
								product.name
							} TK ${getDiscountPrice(
								newPrice,
								newDisCount
							)}`,
							post_img: image,
						})
							.then((response) => {
								console.log(response.status);
							})
							.catch((error) => {
								console.log(error);
							});
					}
					toast("Product Price Updated Successfully");
				}
			})
			.catch((error) => {
				console.error("Error updating product price:", error);
				toast.error(
					"Failed to update product price. Please try again."
				);
			});

		setIsEditingPrice(false);
	};
	const handleDeleteClick = () => {
		api.delete(`/news/deletenews/${id}/by/shopperproduct`);
		Swal.fire({
			title: "Are you sure you want to delete this product?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				api.delete(`/shopperproduct/deleteshopperproduct/${id}`)
					.then((res) => {
						if (res.data.status === 200) {
							toast("Product Deleted Successfully");
							Swal.fire({
								title: "Deleted!",
								text: "Your file has been deleted.",
								icon: "success",
							});
							window.location.reload();
							// You may also want to update your UI to remove the deleted product from the list
							// Assuming you have a function to remove the product from the list, you can call it here.
						} else {
							toast(
								"Failed to delete the product. Please try again."
							);
						}
					})
					.catch((error) => {
						console.error("Error deleting product:", error);
						toast(
							"An error occurred while deleting the product. Please try again."
						);
					});
			}
		});
	};
	const handleNotAvailable = () => {
		setQuantity(0);
		handleProductUpdate();
	};
	const [isShareOpen, setIsShareOpen] = useState(false);
	const toggleDrawer = () => {
		setIsShareOpen((prevState) => !prevState);
	};
	const copyToClipboard = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				setCopySuccess("Copied to clipboard!");
			})
			.catch((err) => {
				setCopySuccess("Copy failed: " + err);
			});
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
					<Drawer
						open={isShareOpen}
						onClose={toggleDrawer}
						direction="bottom"
					>
						<div className="p-2">
							<div className="mx-2 flex items-center justify-between ">
								<p className="text-lg font-bold">Share</p>
								<FaX
									className="text-xl"
									onClick={toggleDrawer}
								></FaX>
							</div>
							<div className="mx-auto mt-5 flex w-[80%] justify-between">
								<FaFacebook className="primary-text text-2xl" />
								<Linkedin />
								<WhatsappIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
							<div className="divider"></div>
							<p>Copy Link </p>
							<p
								onClick={() =>
									copyToClipboard(
										`${
											import.meta.env.VITE_API_PUBLIC_URL
										}/product/${id}`
									)
								}
								className="text-md link-info link flex items-center justify-between rounded bg-gray-200 p-2"
							>
								{`${
									import.meta.env.VITE_API_PUBLIC_URL
								}/product/${id}`}{" "}
								<FaCopy size={30} />
							</p>
						</div>
					</Drawer>
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
										<button
											onClick={() =>
												setIsShareOpen(!isShareOpen)
											}
										>
											Share
										</button>
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
						<p className="flex items-center justify-end gap-2">
							<FaEye />
							{view}
						</p>

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
								<p className="absolute right-1 top-7">৳</p>
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
