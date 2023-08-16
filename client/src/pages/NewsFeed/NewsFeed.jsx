import Axios from "axios";
import React, { useEffect, useState } from "react";
import NewsFeedInput from "../../components/NewsFeedInput/NewsFeedInput";
import PostUi from "../PostUi/PostUi";
import TagNewsUi from "../PostUi/TagNewsUi";

const NewsFeed = () => {
	const postsData = [
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Store A",
			storeUsername: "@storeA",
			discountText: "Special Deal: 15% off on selected items",
			durationText: "Valid from [start date] to [end date]",
			locationText: "Available at all Store A branches",
			likeCount: 120,
			commentCount: 8,
			shareCount: 5,
			rating: 4.5,
			productImage:
				"https://img.freepik.com/free-vector/realistic-chips-package_1284-34786.jpg?w=826&t=st=1691298851~exp=1691299451~hmac=f0f2f77684302248188778a32b0a8acd676af9a5e21ad7be5c15d05cbf5639c8",
			productTitle: "Chips at 30% discount",
		},
		{
			category: "tagnews",
			profileImageUrl: "https://example.com/profile-3.jpg",
			storeName: "Electronics Emporium",
			storeUsername: "@electronicsEmporium",
			productName: "Smartphone",
			productImage: "https://example.com/product-phone.jpg",
			productPrice: "$699.99",
			likeCount: 250,
			commentCount: 20,
			shareCount: 15,
			rating: 4.9,
			PostContent:
				"However, they say that “All that glitters is not gold”. Not all suggestions are right in the nick of time. Occasionally, advice given with good intention can inadvertently discomfort people. Inappropriate expression can be a reason. As a result, this article will help you out by demonstrating 5 common ways to give advice in English.",
			postimg:
				"https://blog.ejoy-english.com/wp-content/uploads/2019/03/photo-1551803021-b00a39752dfe.jpeg",
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Store B",
			storeUsername: "@storeB",
			discountText: "Limited Time Offer: Buy 1 Get 1 Free",
			durationText: "Offer ends on [end date]",
			locationText: "Visit Store B for this amazing deal",
			likeCount: 85,
			commentCount: 12,
			shareCount: 4,
			rating: 3.8,
			productImage:
				"https://img.freepik.com/free-vector/chips-color-pack-cheese-salmon-tastes-realistic_1284-7393.jpg?w=826&t=st=1691300602~exp=1691301202~hmac=7dde67557b384a40696f51e37475eca21054c10c68071105e8761fddb72f8ac4",
			productTitle: "30% discount",
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Fashion Outlet",
			storeUsername: "@fashionOutlet",
			discountText: "Fashion Sale: Up to 50% off on clothing",
			durationText: "Sale ends soon, don't miss out!",
			locationText: "Available online and at select outlets",
			likeCount: 250,
			commentCount: 20,
			shareCount: 15,
			rating: 4.9,
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Electronics Emporium",
			storeUsername: "@electronicsEmporium",
			discountText: "Gadget Extravaganza: Big discounts on electronics",
			durationText: "Limited time offer, shop now!",
			locationText: "Find us at Electronics Emporium locations",
			likeCount: 180,
			commentCount: 6,
			shareCount: 2,
			rating: 4.2,
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Health & Wellness",
			storeUsername: "@healthWellness",
			discountText: "Wellness Sale: 20% off on fitness equipment",
			durationText: "Promotion valid while supplies last",
			locationText: "Available at Health & Wellness outlets",
			likeCount: 150,
			commentCount: 10,
			shareCount: 8,
			rating: 4.7,
		},
		{
			category: "tagnews",
			profileImageUrl: "https://example.com/profile-1.jpg",
			storeName: "Store A",
			storeUsername: "@storeA",
			productName: "Fashionable Dress",
			productImage: "https://example.com/product-dress.jpg",
			productPrice: "$49.99",
			likeCount: 120,
			commentCount: 8,
			shareCount: 5,
			rating: 4.5,
			PostContent:
				"বাবার চেয়ে দায়িত্বশীল কোনো পুরুষ হয় না, আর মায়ের চেয়ে বেশি যত্নবান কোনো নারী হয় না।",
			postimg: "",
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Tech Haven",
			storeUsername: "@techHaven",
			discountText: "Tech Sale: Save big on gadgets and accessories",
			durationText: "Limited stock available",
			locationText: "Visit Tech Haven for great deals",
			likeCount: 95,
			commentCount: 5,
			shareCount: 3,
			rating: 4.0,
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Cosmetic Paradise",
			storeUsername: "@cosmeticParadise",
			discountText: "Beauty Sale: 25% off on skincare products",
			durationText: "Promotion lasts for a limited time",
			locationText: "Available at Cosmetic Paradise stores",
			likeCount: 135,
			commentCount: 15,
			shareCount: 6,
			rating: 4.3,
			productImage:
				"https://img.freepik.com/free-vector/realistic-soda-with-ice-advertisement_52683-8078.jpg?w=826&t=st=1691300696~exp=1691301296~hmac=1e88243826a65eb4c821c84bc83da8138e98decc93bfad1678c2b8497804c30b",
			productTitle: " sprite 30% discount",
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Fitness Hub",
			storeUsername: "@fitnessHub",
			discountText: "Fitness Sale: Get in shape with great discounts",
			durationText: "Limited time offer, start your journey now",
			locationText: "Find us at Fitness Hub locations",
			likeCount: 200,
			commentCount: 18,
			shareCount: 9,
			rating: 4.8,
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Books Galore",
			storeUsername: "@booksGalore",
			discountText: "Book Sale: Enjoy reading with discounted books",
			durationText: "Promotion valid for a limited time",
			locationText: "Visit Books Galore for a wide selection",
			likeCount: 110,
			commentCount: 9,
			shareCount: 7,
			rating: 4.6,
		},
		{
			category: "post",
			profileImageUrl:
				"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde",
			storeName: "Cafe Bliss",
			storeUsername: "@cafeBliss",
			discountText: "Coffee Delights: Enjoy your favorite brew",
			durationText: "Offer available at Cafe Bliss locations",
			locationText: "Sip your coffee at Cafe Bliss",
			likeCount: 70,
			commentCount: 4,
			shareCount: 3,
			rating: 3.9,
		},
		//new category

		{
			category: "tagnews",
			profileImageUrl: "https://example.com/profile-2.jpg",
			storeName: "Store B",
			storeUsername: "@storeB",
			productName: "Wireless Headphones",
			productImage: "https://example.com/product-headphones.jpg",
			productPrice: "$79.99",
			likeCount: 85,
			commentCount: 12,
			shareCount: 4,
			rating: 3.8,
			PostContent: "",
			postimg:
				"https://images.unsplash.com/photo-1592997571659-0b21ff64313b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		},
	];

	const [posts, setPosts] = useState([]);
	const [shopper_product_id, setShopper_product_id] = useState("");
	const [shop_id, setShop_id] = useState("");
	useEffect(() => {
		Axios.get(import.meta.env.VITE_APP_API_URL + "/news/getnews")
			.then((res) => {
				// console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="mt-32">
			<div className="w-[90%] mx-auto">
				<h1 className="text-2xl font-bold text-center">News</h1>
				<div className="divider"></div>
				<div className="lg:grid lg:grid-cols-12 ">
					<div className="lg:col-span-3"></div>
					<div className="lg:col-span-6">
						<NewsFeedInput></NewsFeedInput>
						<div>
							{posts.map((postData, index) =>
								postData.category === "regular" ? (
									<PostUi key={index} postData={postData} />
								) : (
									<TagNewsUi
										key={index}
										postData={postData}
									/>
								)
							)}
						</div>
					</div>
					<div className="lg:col-span-3"></div>
				</div>
			</div>
			<div className="h-32"></div>
		</div>
	);
};

export default NewsFeed;
