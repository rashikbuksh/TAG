import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SearchFunction from "../../../AdminComponents/SearchFunction/Index";
import { TikIcon } from "../../../SvgHub/Icons";
import { Breadcrumb } from "../../../components";
import ShopkeeperProductcart from "../../../components/Shopkeeper/ShopkeepersProduct/ShopkeeperProductcart";
import { useAuth } from "../../../context/auth";
import GetDateTime from "../../../helpers/GetDateTime";
import { getDiscountPrice } from "../../../helpers/product";
import { api } from "../../../lib/api";

const ShopperProduct = () => {
	const [category, setCategory] = useState([]);
	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const [util, setUtil] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);

	const [filteredProductArr, setFilteredProductArr] = useState(products);
	useEffect(() => {
		api.get(`/product/getproduct`).then((response) => {
			setProducts(response.data);
		});
		api.get(`/category/get/category`).then((response) => {
			setCategory(response.data);
		});
		api.get(`/util/getUtil/product_discount`).then((response) => {
			setUtil(response.data[0]);
		});
	}, []);

	const selectedCategory = (e) => {
		const selectedCategoryId = parseInt(e.target.value); // Convert the value to an integer

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
	const handelAddShoperProduct = async () => {
		if (selectedProducts.length === 0) {
			alert("Add Product");
		} else {
			for (const product of selectedProducts) {
				const response = await api.post(
					`/shopperproduct/addshopperproduct`,
					{
						name: product.name,
						price: product.price,
						discount: product.discount,
						product_count: product.product_count || "A",
						product_id: product.product_id,
						shopper_id: Number(user.id),
					}
				);
				if (response.data.status === 201) {
					if (product.discount >= parseInt(util.value)) {
						const response1 = await api.get(
							`/shopperproduct/getLastProduct/${product.shopper_id}`
						);
						if (response1.status === 200) {
							const productData = response1.data[0];

							const response12 = await api.post(
								`/news/addproductnews`,
								{
									shopper_product_id: productData.id,
									shop_id: productData.shopper_id,
									date: GetDateTime(),
									discount: productData.discount,
									duration: "",
									location: "",
									category: "regular",
									post_content: `${
										product.name
									} TK ${getDiscountPrice(
										product.price,
										product.discount
									)}`,
									post_img: productData.product_image,
								}
							);
							if (response12.status === 201) {
								alert("Product Added Successfully");
							}
						}
					}
				}
			}
		}
	};
	const removeProduct = (productId) => {
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
