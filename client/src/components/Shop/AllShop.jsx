import { api } from "@lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import ShopSlider from "./ShopSlider/ShopSlider";

const AllShop = () => {
	const [shops, setShops] = useState([]);
	useEffect(() => {
		api.get(`/shop/getAllShop`).then((response) => {
			setShops(response.data);
		});
	}, []);

	return (
		<div className="mx-auto  max-w-7xl">
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

			<ShopSlider shops={shops}></ShopSlider>
		</div>
	);
};

export default AllShop;
