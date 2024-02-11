import { Rating } from "@smastrom/react-rating";
import logo from "../../../../src/assets/img/Tag-logo-blue-get_100_100.png";
import { Link } from "react-router-dom";

const ShopCart = ({ shop }) => {
	return (
		<Link
			to={
				import.meta.env.VITE_API_PUBLIC_URL +
				`/shopkeeperProfileCV/${shop.id}`
			}
		>
			<div className="flex h-[230px] w-[160px] flex-col items-center rounded-lg border ">
				<img
					className="h-[160px] w-[160px] rounded-md object-cover p-1"
					src={
						shop.profile_picture
							? `${
									import.meta.env.VITE_APP_IMG_URL
							  }/usersProfilePic/${shop.profile_picture}`
							: logo
					}
					alt=""
				/>
				<div className=" flex h-10 items-center justify-center">
					<h1 className="font black text-xs">{shop.name}</h1>
				</div>
				<Rating
					style={{ maxWidth: 100 }}
					readOnly
					orientation="horizontal"
					value={shop.review_count}
				/>
			</div>
		</Link>
	);
};

export default ShopCart;
