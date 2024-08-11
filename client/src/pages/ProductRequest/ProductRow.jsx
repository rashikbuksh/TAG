import { MdDeleteForever } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const ProductRow = ({ product, handleDelete, groupedByShopperProduct }) => {


	// console.log("🚀 ~ ProductRow ~ product:", product)
	const navigate = useNavigate();
	const stockProduct = (product) => {
		navigate(`/updateProductQuantity/${product.shopper_product_id}`, {
			state: { product },
		});
	};

	return (
		<>
			<div className="flex justify-between gap-2 rounded bg-slate-50 p-2">
				<div className=" relative w-9/12 gap-2">
					<div className="flex gap-2 py-2 font-bold">
						<img
							src={`${
								import.meta.env.VITE_APP_IMG_URL
							}/products/${product.image}`}
							alt="Product Image"
							className="h-14 w-14 rounded"
						/>
						<div>
							<p>Product :{product.name}</p>
						</div>
					</div>
					<p className="absolute right-2 top-12 w-4 text-right">
						{product?.items?.length}x
					</p>
					<progress
						className="progress progress-success my-1 "
						value={product?.items?.length * 20}
						max="100"
					></progress>
				</div>
				<div className="w-3/12  ">
					<span className="flex justify-between ">
						<span></span>
						<MdDeleteForever
							color="red "
							size={22}
							className="cursor-pointer"
							onClick={() =>
								handleDelete(
									product.id,
									groupedByShopperProduct
								)
							}
						/>
					</span>
					<div className="flex items-center justify-center gap-1 ">
						<TbCurrencyTaka />
						<span className="font-bold">{product.price}</span>
					</div>
					<div className="mt-3 flex justify-center">
						{/* <Link to={"/addshopperproduct"}> */}
							<button
								onClick={()=>stockProduct(product)}
								className="rounded bg-green-500 px-3 py-1  text-sm font-bold text-white"
								type="button"
							>
								Stock
							</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductRow;
