import EditLocation from "@components/Modal/EditLocationModal/EditLocation";
import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";

const ShopkeeperTable = ({ tagShopkeeper }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							{/* <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={`${import.meta.env.VITE_APP_IMG_URL}/${tagShopkeeper.image?tagShopkeeper.image:""}`}
                                alt="Avatar Tailwind CSS Component"
                            />
                        </div> */}
						</div>
					</div>
				</td>
				<td>{tagShopkeeper.id}</td>
				<td>
					{tagShopkeeper.name}
					<br />
					<span className="badge badge-ghost badge-sm">
						{tagShopkeeper.user_name}
					</span>
				</td>
				{/* <td>
                {product.short_description}
            </td> */}
				{/* <td className="whitespace-nowrap px-4 py-2">
          
                
            </td> */}
				<td>{tagShopkeeper.phone ? tagShopkeeper.phone : "N/A"}</td>
				<td>{tagShopkeeper.email ? tagShopkeeper.email : "N/A"}</td>
				<td>{tagShopkeeper.access ? tagShopkeeper.access : "N/A"}</td>
				<td>
					{tagShopkeeper.review_count
						? tagShopkeeper.review_count
						: "N/A"}
				</td>
				<td>
					<Link to={`/shopkeeperProduct/${tagShopkeeper.id}`}>
						<button className="btn btn-accent btn-sm">
							See Product
						</button>
					</Link>
					<Link to={`/tagorderhistory/${tagShopkeeper.id}`}>
						<button className="btn btn-accent btn-sm ml-3">
							Order History
						</button>
					</Link>{" "}
					<button
						className="btn btn-accent btn-sm"
						onClick={() => setIsOpen(true)}
					>
						Edit Location
					</button>
					{isOpen && (
						<EditLocation
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							shipping_address={tagShopkeeper.shipping_address}
							id={tagShopkeeper.id}
							name={tagShopkeeper.name}
						/>
					)}
				</td>
			</tr>
		</>
	);
};

export default ShopkeeperTable;
