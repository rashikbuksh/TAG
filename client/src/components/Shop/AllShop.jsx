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
		<div className="mx-auto mt-2 rounded  max-w-7xl border  ">
			<div className="my-4"></div>
			{
				<h2 className="section-title  mb-2 border-b-2">
					<span className="text-xl font-bold pl-2">Our Best Shopper </span>

					<Link
						className="primary-text pr-2"
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

			<div className="border ">
				<ShopSlider shops={shops}></ShopSlider>
			</div>
		</div>
	);
};

export default AllShop;
