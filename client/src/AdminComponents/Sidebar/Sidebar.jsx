import { useAuth } from "@context/auth";
import Cookies from "js-cookie";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
	const { user } = useAuth();
	const logout = () => {
		localStorage.removeItem("user-id");
		Cookies.remove("user");
		Cookies.remove("auth");
		window.location.href = "/home";
	};
	return (
		<aside className="relative mt-24  h-[89vh] w-full overflow-auto overflow-y-auto bg-gray-900 p-6 text-gray-100 sm:w-60">
			<nav className="space-y-8 text-sm">
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Hi, {user.name}
					</h2>
					<Link to="/home">Home</Link>
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Pages
					</h2>
					<div className="flex flex-col space-y-4">
						<Link to="/admin/stat">Stat</Link>

						<Link to="/allAdminProduct">All Products</Link>
						<Link to="/tagShopkeeper">Tag Shopkeepers</Link>
						<Link to="/tagUser">Tag Users</Link>
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Operations
					</h2>
					<div className="flex flex-col space-y-4">
						<Link to="/newShopRequest">New Shop Request</Link>
						<Link to="/tagStore">Tag Store</Link>
						<Link to="/addcategory">Add Category</Link>
						<Link to="/addproduct">Add Product</Link>
						<Link to="/addheroslider">Add SliderImage</Link>
						<Link to="/bestsellProduct">Add Best Sell Product</Link>
						<Link to="/allnews">All News </Link>
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Report
					</h2>
					<div className="flex flex-col space-y-4">
						<Link to="/lateorderSubmition">
							Late Order Submission
						</Link>
						<Link to="/stockProduct">Product Request</Link>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex flex-col space-y-1">
						<Link to="/manageAdmin">Manage Admin</Link>
						<Link to="/manageModarator">Manage Modarator</Link>
						<Link to="/message">Message </Link>
						<Link to="/settings">Settings</Link>
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="tracki text-sm font-semibold uppercase text-gray-400">
						Misc
					</h2>
					<div className="flex flex-col space-y-1">
						<Link to="/tutorials">Tutorials</Link>
						<Link to="/changelog">Changelog</Link>
					</div>
				</div>
				<div className="mt-4">
					<button
						className="btn flex items-center justify-center gap-2 hover:text-black"
						onClick={logout}
					>
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

export default Sidebar;
