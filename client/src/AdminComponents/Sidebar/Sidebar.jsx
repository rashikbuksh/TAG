import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const {user}=useAuth()
    console.log(user);
	return (
		<aside className="w-full p-6 bg-gray-900 text-gray-100 sm:w-60 h-[88vh] overflow-auto">
			<nav className="space-y-8 text-sm">
  <div className="space-y-2">
    <h2 className="tracki text-sm font-semibold uppercase text-gray-400">
      Hi, {user.name}
    </h2>
    <h2 className="tracki text-sm font-semibold uppercase text-gray-400">
      Pages
    </h2>
    <div className="flex flex-col space-y-4">
      <Link to="/home">Home</Link>
      <Link to="/newsfeed">News</Link>
      <Link to="/showProduct">All Products</Link>
      <Link to="/showShopkeeper">Tag Shopkeepers</Link>
      <Link to="/Show Users">Tag Users</Link>
    </div>
  </div>
  <div className="space-y-2">
    <h2 className="tracki text-sm font-semibold uppercase text-gray-400">
      Operations
    </h2>
    <div className="flex flex-col space-y-4">
      <Link to="/drawer">Add Product</Link>
      <Link to="/header">Delete Product</Link>
      <Link to="/page-title">Verified Product</Link>
      <Link to="/menus">Add Best Sell Product</Link>
      <Link to="/sidebar">Active and Deactive Product</Link>
      <Link to="/footer">Delete Shopper Post</Link>
      <Link to="/footer">Add Shopper Product</Link>
      <Link to="/footer">Delete Shopper Product </Link>
      <Link to="/footer">Contorl Shopper Activitiy </Link>
      <Link to="/footer">Order History</Link>
      <Link to="/footer">Sent Message Shopper</Link>
    </div>
  </div>
  <div className="space-y-2">
   
    <div className="flex flex-col space-y-1">
      <Link to="/homepage">Manage Admin</Link>
      <Link to="/users">MAnage Modarator</Link>
      <Link to="/tools">Message </Link>
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
</nav>
		</aside>
	);
};

export default Sidebar;
