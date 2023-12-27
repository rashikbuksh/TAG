import { validateFieldsNatively } from "@hookform/resolvers";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getDiscountPrice } from "../../helpers/product";
import { api } from "../../lib/api";
import { Breadcrumb } from "../../components";
import SearchFunction from "../../AdminComponents/SearchFunction/Index";
import ShopkeeperProductcart from "../../components/ShopkeepersProduct/ShopkeeperProductcart";
import { TikIcon } from "../../SvgHub/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { FaX } from "react-icons/fa6";
const ShopperProduct = () => {
	// const [productImage, setProductsImage] = useState();
	// const [productPrice, setProductsPrice] = useState(null);
	// const [productquantity, setProductsquantity] = useState();
	const [category, setCategory] = useState([]);
	// const ShopperProductSchema = yup.object({
	// 	name: yup.string().required("Name is required"),
	// 	price: yup.number().required("Price is required"),
	// 	discount: yup.number().required("Discount is required"),
	// 	product_count: yup.number().required("Product count is required"),
	// 	product_id: yup.string().required("Product ID is required"),
	// });

	const user_id = localStorage.getItem("user-id");

	// const form = useForm({
	// 	defaultValues: {
	// 		name: "",
	// 		price: "",
	// 		discount: "",
	// 		product_count: "",
	// 		product_id: "",
	// 	},
	// 	resolver: yupResolver(ShopperProductSchema),
	// });

	// const { register, handleSubmit, formState } = form;
	// const { errors } = formState;

	// const [productNames, setProductsNames] = useState([]);

	// useEffect(() => {
	// 	api.get(`/product/getproduct`).then((response) => {
	// 		// console.log(response, "40");
	// 		setProductsNames(response.data);
	// 	});
	// }, []);

	// const navigate = useNavigate();

	// const selectedProduct = (e) => {
	// 	var product = e.target.value.split("__");
	// 	form.setValue("product_id", product[0]);
	// 	form.setValue("name", product[1]);

	// 	// Extract the product ID from the selected value
	// 	const productId = product[0];

	// 	// Call handelGetImage with the product ID
	// 	handelGetImage(productId);
	// };

	// const onSubmit = async (data) => {
	// 	// console.log("FormData", data);
	// 	let shopperProduct_ID = null;
	// 	let shopper_product_name = null;
	// 	let shopper_product_price = null;
	// 	let shopper_product_discount = null;
	// 	// let shopper_Product_Image = null;

	// 	await api
	// 		.post(`/shopperproduct/addshopperproduct`, {
	// 			name: data.name,
	// 			price: data.price,
	// 			discount: data.discount,
	// 			product_count: data.product_count,
	// 			product_id: Number(data.product_id),
	// 			shopper_id: Number(user_id),
	// 		})
	// 		.then((response) => {
	// 			if (
	// 				response.data.message ===
	// 				data.name + " added successfully"
	// 			) {
	// 				alert("Product Added Successful");
	// 			}
	// 		});

	// 	await api.get(`/shopperproduct/getLastProduct`).then((response) => {
	// 		// console.log(response);
	// 		shopperProduct_ID = response.data[0].id;
	// 		shopper_product_name = response.data[0].name;
	// 		shopper_product_price = response.data[0].price;
	// 		shopper_product_discount = response.data[0].discount;
	// 	});

	// 	let today = new Date();
	// 	today = today.toISOString();
	// 	// console.log(productImage);
	// 	await api
	// 		.post(`/news/addproductnews`, {
	// 			shopper_product_id: Number(shopperProduct_ID),
	// 			shop_id: user_id,
	// 			date: today,
	// 			discount: data.discount,
	// 			duration: "",
	// 			location: "",
	// 			category: "regular",
	// 			post_content:
	// 				shopper_product_name +
	// 				" " +
	// 				"TK." +
	// 				getDiscountPrice(
	// 					shopper_product_price,
	// 					shopper_product_discount
	// 				),
	// 			post_img: productImage,
	// 		})
	// 		.then((response) => {
	// 			// console.log(response.data.message);
	// 			if (response.data.message === user_id + " added successfully") {
	// 				// navigate to homepage
	// 				form.reset();
	// 				window.location.reload();
	// 			}
	// 		});
	// };

	// const findProductPrice=(id)=>{

	// 	const price=productNames.find(product.id===id)
	// }
	// console.log(productPrice, productquantity);

	// const setProductsvalue = (e) => {
	// 	// console.log(e);
	// 	var product = e.target.value.split("||--");
	// 	// console.log(product, "prod frm");
	// 	form.setValue("product_id", product[0]);
	// 	form.setValue("name", product[1]);
	// 	setProductsImage(product[2]);
	// 	setProductsPrice(product[3]);
	// 	setProductsquantity(product[4]);
	// };
	const [products, setProducts] = useState([]);

	const [filteredProductArr, setFilteredProductArr] = useState(products);
	useEffect(() => {
		api.get(`/product/getproduct`).then((response) => {
			setProducts(response.data);
		});
		api.get(`/category/get/category`).then((response) => {
			// console.log(response.data);
			setCategory(response.data);
		});
	}, []);

	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value, 10); // Convert the value to an integer

		if (selectedCategoryId === 0) {
			// If "Category" is selected, show all products
			setFilteredProductArr(products);
		} else {
			// Filter products based on the selected category
			const filteredProducts = products.filter((product) => {
				return product.category_id === selectedCategoryId;
			});
			setFilteredProductArr(filteredProducts);
		}
	};
	const [selectedProducts, setSelectedProducts] = useState([]);
	console.log(
		"🚀 ~ file: AddShopperProduct.jsx:179 ~ ShopperProduct ~ selectedProducts:",
		selectedProducts
	);
	// console.log(
	// 	"🚀 ~ file: AddShopperProduct.jsx:177 ~ ShopperProduct ~ selectedProducts:",
	// 	selectedProducts
	// );

	const handleProductSelection = (productInfo, isSelected) => {
		if (isSelected) {
			setSelectedProducts((prevSelected) => [
				...prevSelected,
				productInfo,
			]);
		} else {
			const updatedSelectedProducts = selectedProducts.filter(
				(product) => product.product_id !== productInfo.product_id
			);
			setSelectedProducts(updatedSelectedProducts);
		}
	};
	const handelAddShoperProduct = () => {
		// console.log(selectedProducts.length);
		if (selectedProducts.length === 0) {
			// console.log("addProduct");
		} else {
			selectedProducts.forEach((product) => {
				api.post(`/shopperproduct/addshopperproduct`, {
					name: product.name,
					price: product.price,
					discount: product.discount,
					product_count: product.product_count,
					product_id: product.product_id,
					shopper_id: Number(user_id),
				}).then((response) => {
					// console.log(
					// 	"🚀 ~ file: AddShopperProduct.jsx:209 ~ selectedProducts.forEach ~ response:",
					// 	response
					// );
					if (response.data.status === 201) {
						alert("Product Added Successfully");
						window.location.reload();
					}
				});
			});
		}
	};
	const removeProduct = (productId) => {
		// console.log("🚀 ~ file: AddShopperProduct.jsx:223 ~ removeProduct ~ productId:", productId)

		const updatedProducts = selectedProducts.filter(
			(product) => product.product_id !== productId
		);
		setSelectedProducts(updatedProducts);
	};
	return (
		<div className="body-wrapper  space-pt--70 space-pb--120 relative ">
			<Breadcrumb pageTitle="Add Product" prevUrl="/shopkeeperProduct" />
			<div role="alert" className="alert alert-info my-3 flex text-left">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="h-6 w-6 shrink-0 stroke-current"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<span>Verified product prices remain unchanged.</span>
			</div>
			{/* image Slider Section  */}
			<div className="mySwiper">
				<Swiper
					slidesPerView={5}
					spaceBetween={15}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
					breakpoints={{
						768: {
							slidesPerView: 6,
						},
					}}
				>
					{selectedProducts &&
						selectedProducts.map((product) => (
							<SwiperSlide key={product.product_id}>
								<div className="relative">
									<img
										className="  h-[70px] w-[70px] object-contain"
										src={`${
											import.meta.env.VITE_APP_IMG_URL
										}/products/${product.image}`}
										alt=""
									/>
									<button
										className="absolute right-0 top-0 rounded bg-red-600 p-1 text-white"
										onClick={() =>
											removeProduct(product.product_id)
										}
									>
										<FaX className="text-red"></FaX>
									</button>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			{/* category and searchSection */}
			<div>
				<div className="  flex items-center justify-start gap-3  border-gray-300 px-4 ">
					<select
						defaultValue={"0"}
						className=" w-1/3 rounded border border-gray-300 px-3  py-2 text-gray-700 sm:text-sm"
						onChange={selectedCategory}
					>
						<option value="0">Category</option>
						{category.map((option, index) => (
							<option key={index} value={option.category_id}>
								{option.category_name}
							</option>
						))}
					</select>

					<div className="">
						<div className="">
							<SearchFunction
								arr={products}
								setFilteredArr={setFilteredProductArr}
								width={true}
							></SearchFunction>
						</div>
					</div>
				</div>
			</div>

			{/* Weight section  */}
			<div></div>
			{/* product  */}
			<div className="grid grid-cols-2 gap-2 rounded">
				{filteredProductArr.map((product) => (
					<ShopkeeperProductcart
						key={product.id}
						product={product}
						onProductSelection={handleProductSelection}
						isSelected={selectedProducts.some(
							(p) => p.product_id === product.id
						)}
					/>
				))}
			</div>
			<button
				onClick={handelAddShoperProduct}
				className="fixed bottom-24 right-5 z-20 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white  p-2 shadow-lg"
			>
				<TikIcon></TikIcon>
			</button>
		</div>
	);
};

export default ShopperProduct;

// privious code
// <div className="body-wrapper  space-pt--70 space-pb--120 mt-3">
// 	<h1 className="text-center text-xl font-bold">Add Product</h1>
// 	<div className="m-1 rounded border bg-gray-100 p-3">
// 		<div className="">
// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				<div className="   px-1 py-1">
// 					<label htmlFor="product_id">Product Name</label>
// 					<br />
// 					<select
// 						className="select w-full"
// 						name="product_id"
// 						id="product_id"
// 						onChange={setProductsvalue}
// 						defaultValue={0}
// 					>
// 						<option value="0">Select Product</option>
// 						{productNames &&
// 							productNames.map((product) => (
// 								<option
// 									key={product.id}
// 									value={
// 										product.id +
// 										"||--" +
// 										product.name +
// 										"||--" +
// 										product.image +
// 										"||--" +
// 										product.price +
// 										"||--" +
// 										product.quantity
// 									}
// 								>
// 									{product.name}
// 								</option>
// 							))}
// 					</select>
// 				</div>
// 				<div className="my-2 flex items-center justify-center ">
// 					{productImage && (
// 						<img
// 							className="w-56  border-2 border-black"
// 							src={`${
// 								import.meta.env.VITE_APP_IMG_URL
// 							}/products/${productImage}`}
// 							alt="Selected Product"
// 						/>
// 					)}
// 				</div>
// 				<div className="flex items-center gap-2">
// 					<div className="my-2 px-1 py-1">
// 						<label htmlFor="price">Price</label>
// 						<input
// 							className="input w-full"
// 							{...register("price")}
// 							type="number"
// 							name="price"
// 							id="price"
// 							max={
// 								productPrice &&
// 								parseFloat(productPrice) > 0
// 									? parseFloat(productPrice)
// 									: null
// 							}
// 							placeholder={
// 								productPrice !== "null" &&
// 								productPrice !== "0" &&
// 								productPrice !== null
// 									? productPrice
// 									: "Enter Price"
// 							}
// 						/>
// 						<p className="text-danger">
// 							{errors.price?.message}
// 						</p>
// 					</div>
// 					<div className="  my-2 px-1 py-1">
// 						<label htmlFor="discount">Discount</label>
// 						<input
// 							className="input w-full"
// 							{...register("discount")}
// 							type="number"
// 							name="discount"
// 							id="discount"
// 							placeholder="Enter Discount"
// 						/>
// 						<p className="text-danger">
// 							{errors.discount?.message}
// 						</p>
// 					</div>
// 				</div>
// 				<div className="  my-2 px-1 py-1">
// 					<label htmlFor="product_count">
// 						Product Quantity
// 					</label>
// 					<input
// 						className="input w-full"
// 						{...register("product_count")}
// 						type="number"
// 						name="product_count"
// 						id="product_count"
// 						placeholder="Enter Product Quantity"
// 					/>
// 					<p className="text-danger">
// 						{errors.product_count?.message}
// 					</p>
// 				</div>
// 				<button
// 					type="submit"
// 					className="btn btn-accent btn-block "
// 				>
// 					Add Shopper Product
// 				</button>
// 			</form>
// 		</div>
// 	</div>
// </div>
