import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Cookies from "js-cookie";
import { FaSignOutAlt } from "react-icons/fa";

const ModeratorPageSideBar = () => {
	const { user } = useAuth();

	const logout = () => {
		localStorage.removeItem("user-id");
		Cookies.remove("user");
		Cookies.remove("auth");
		window.location.href = "/home";
	};
	return (
		<aside className="relative  mt-24 h-[89vh] w-full overflow-auto bg-gray-900 p-6 text-gray-100 sm:w-60">
			<nav className="space-y-8 text-sm ">
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Hi, {user.name}
					</h2>
					<div className="divider divide-red-800"></div>
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Pages
					</h2>
					<div className="flex flex-col space-y-4">
						<Link to="/moderator/stat">Stat</Link>

						<Link to="/moderator/allAdminProduct">
							All Products
						</Link>
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Operations
					</h2>
					<div className="flex flex-col space-y-4">
						<Link to="/moderator/addcategory">Add Category</Link>
						<Link to="/moderator/addproduct">Add Product</Link>
					</div>
				</div>
				<div className=" absolute bottom-10  ">
					<button className="btn flex items-center justify-center gap-2 hover:text-black" onClick={logout}>
						<span className="icon">
							<FaSignOutAlt />
						</span>
						Logout
					</button>
				</div>
			</nav>
		</aside>
	);
};

export default ModeratorPageSideBar;
