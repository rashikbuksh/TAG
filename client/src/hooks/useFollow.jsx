import { useEffect, useState } from "react";
import { api } from "@lib/api";
import GetDateTime from "@helpers/GetDateTime";
import { useNavigate } from "react-router-dom";

const useFollow = (shopId, userId) => {
	const [isFollow, setIsFollow] = useState(false);
	const [followers, setFollowers] = useState(0);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`/follow/getFollow/${userId}`);
				const isFollowShop = response.data?.filter(
					(info) => info.shopper_id == shopId
				);
				isFollowShop.find((info) => info.shopper_id == shopId) &&
					setIsFollow(true);
			} catch (error) {
				console.log(error);
			}
		};
		if (userId) {
			fetchData();
		}
	}, [shopId, userId]);

	const followShopper = async () => {
		if (userId) {
			try {
				const response = await api.post("/follow/addFollow", {
					follower_id: userId,
					shopper_id: shopId,
					follow_date: GetDateTime(),
				});
				if (response.status === 201) {
					setIsFollow(true);
				}
			} catch (error) {
				console.log(error);
			}
		} else navigate("/login");
	};
	const getFollower = async () => {
		try {
			const response = await api.get(
				`/follow/getShopperFollow/${shopId}`
			);
			if (response.data) {
				setFollowers(response.data.length);
			}
		} catch (error) {
			console.log(error);
		}
	};
	getFollower();
	return { isFollow, followShopper, followers, getFollower };
};

export default useFollow;
