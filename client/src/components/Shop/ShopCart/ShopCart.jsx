import { useEffect, useState } from "react";
import Modal from "@components/Modal/Modal";
import logo from "../../../assets/img/Tag-logo-blue-get_100_100.png";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

import { useAuth } from "@context/auth";
import useFollow from "@hooks/useFollow";

const ShopCart = ({ shop }) => {
	const { user } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const { isFollow, followShopper } = useFollow(shop.id, user?.id);

	return (
		<>
			<div className="flex h-full  flex-col items-center rounded-lg border   ">
				<img
					className="h-[160px] w-[160px] cursor-pointer rounded-md object-cover p-1"
					src={
						shop.profile_picture
							? `${
									import.meta.env.VITE_APP_IMG_URL
							  }/usersProfilePic/${shop.profile_picture}`
							: logo
					}
					alt=""
					onClick={() => setShowModal(!showModal)}
				/>
				<div className="flex h-10 items-center justify-center">
					<Link
						to={
							import.meta.env.VITE_API_PUBLIC_URL +
							`/shopper/${shop.id}/${shop.name.replace(
								/\s+/g,
								"_"
							)}`
						}
					>
						<h1 className="font black text-xs">{shop.name}</h1>
					</Link>
				</div>
				<Rating
					style={{ maxWidth: 100 }}
					readOnly
					className="mb-2"
					orientation="horizontal"
					value={shop.review_count}
				/>
				{!isFollow ? (
					<button
						onClick={followShopper}
						className=" font-xl h-1/6 w-full rounded bg-[#FF4C5E] py-1 font-bold  text-white active:bg-[#a23c46]"
					>
						Follow
					</button>
				) : (
					<button className=" font-xl disabled h-1/6 w-full rounded bg-[#bc3845] py-1  font-bold text-white opacity-80 ">
						Following
					</button>
				)}
			</div>
			{showModal && (
				<Modal
					isOpen={showModal}
					setIsOpen={setShowModal}
					color={"black"}
				>
					<div className="flex h-[60vh] items-center justify-center bg-black">
						<img
							src={
								shop.profile_picture
									? `${
											import.meta.env.VITE_APP_IMG_URL
									  }/usersProfilePic/${shop.profile_picture}`
									: logo
							}
							alt=""
							className="max-h-full max-w-full"
						/>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ShopCart;
