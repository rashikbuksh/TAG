import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { api } from "../../lib/api";
import ShopSlider from "./ShopSlider/ShopSlider";

const AllShop = () => {
	const [shops, setShops] = useState([]);
	console.log("🚀 ~ AllShop ~ shops:", shops);
	useEffect(() => {
		api.get(`/shop/getAllShop`).then((response) => {
			setShops(response.data);
		});
	}, []);

	return (
		<div className="mx-auto  my-4 max-w-7xl border p-2 ">
			<div className="my-4"></div>
			{
				<h2 className="section-title  mb-2">
					<span className="text-xl font-bold">Our Best Shopper </span>

					<Link
						className="primary-text"
						to={import.meta.env.VITE_API_PUBLIC_URL + "/shop"}
					>
						VIEW ALL{" "}
						<span>
							<ReactSVG
								src={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/assets/img/icons/arrow-right.svg"
								}
							/>
						</span>
					</Link>
				</h2>
			}

			<div className="border border-red-500 p-2">
				<ShopSlider shops={shops}></ShopSlider>
			</div>
		</div>
	);
};

export default AllShop;
