import { useState } from "react";
import Modal from "@components/Modal/Modal";
import logo from "../../../assets/img/Tag-logo-blue-get_100_100.png";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const ShopCart = ({ shop }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div className="flex h-[230px] w-[160px] flex-col items-center rounded-lg border ">
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
					onClick={toggleModal}
				/>
				<div className="flex h-10 items-center justify-center">
					<Link
						to={
							import.meta.env.VITE_API_PUBLIC_URL +
							`/shopkeeperProfileCV/${shop.id}`
						}
					>
						<h1 className="font black text-xs">{shop.name}</h1>
					</Link>
				</div>
				<Rating
					style={{ maxWidth: 100 }}
					readOnly
					orientation="horizontal"
					value={shop.review_count}
				/>
			</div>
			{showModal && (
				<Modal isOpen={showModal} setIsOpen={setShowModal} color={"black"} >
					<div className="flex items-center justify-center bg-black h-[60vh]">
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
