import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const {user}=useAuth()
    console.log(user);
	return (
		<aside className="w-full  mt-24 p-6 bg-gray-900 text-gray-100 sm:w-60 h-[89vh] overflow-auto">
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
      <Link to="/allAdminProduct">All Products</Link>
      <Link to="/showShopkeeper">Tag Shopkeepers</Link>
      <Link to="/tagUser">Tag Users</Link>
    </div>
  </div>
  <div className="space-y-2">
    <h2 className="tracki text-sm font-semibold uppercase text-gray-400">
      Operations
    </h2>
    <div className="flex flex-col space-y-4">
      <Link to="/addcategory">Add Category</Link>
      <Link to="/addproduct">Add Product</Link>
      <Link to="/addheroslider">Add SliderImage</Link>
      {/* <Link to="/header">Delete Product</Link> this done in all product */}
      {/* <Link to="/page-title">Verified Product</Link> this done in all product*/}
      <Link to="/bestSellProduct">Add Best Sell Product</Link>
      <Link to="/statusUpdate">Active and Deactive Product</Link>
      <Link to="/allNewsFeedpost">All News </Link>
      <Link to="/ShoperProduct">Add Shopper Product</Link>
      {/* <Link to="/footer">Delete Shopper Product </Link> this done in shoper product  */}
      <Link to="/seeShoperActivitiy">Contorl Shopper Activitiy </Link>
      <Link to="/allOrderHistory">Order History</Link>
      <Link to="/messageShoper">Sent Message Shopper</Link>
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
</nav>
		</aside>
	);
};

export default Sidebar;
