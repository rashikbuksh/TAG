import { Link } from "react-router-dom";
import { Takaicon } from "../../../SvgHub/SocialIcon";
import { getDiscountPrice } from "../../../helpers/product";

const OrderProducTable = ({ product }) => {
	const Orderdproduct = product;

	return (
		<div>
			<div className="relative my-2 h-[80px] bg-gray-100 p-2">
				<img
					className="absolute top-2 h-[60px] w-[60px]"
					src={`${import.meta.env.VITE_APP_IMG_URL}/products/${
						Orderdproduct.product_image
					}`}
					alt="Selected Product"
				/>
				<div className="ms-auto h-fit w-[75%]">
					<Link
						to={`${import.meta.env.VITE_API_PUBLIC_URL}/product/${
							Orderdproduct.pid
						}/${Orderdproduct.title}`}
					>
						<h1 className="text-sm">{Orderdproduct.name}</h1>
					</Link>
				</div>

				<div className="ms-auto mt-3 flex w-[90%] justify-end gap-5">
					<div>
						<h2 className="text-xs">
							{getDiscountPrice(
								Orderdproduct.price,
								Orderdproduct.discount
							)}{" "}
							X {Orderdproduct.quantity}
						</h2>
					</div>
					<div>
						<h2 className="flex items-center gap-1 text-xs">
							<Takaicon></Takaicon>{" "}
							{parseFloat(
								getDiscountPrice(
									Orderdproduct.price,
									Orderdproduct.discount
								) * Orderdproduct.quantity
							).toFixed(2)}
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderProducTable;
