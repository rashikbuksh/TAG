import { Outlet } from "react-router-dom";
import AdminHeader from "../../AdminComponents/AdminHeader/AdminHeader";
import AdminStats from "../../AdminComponents/AdminStats/AdminStats";
import ProductChart from "../../AdminComponents/Product/ProductChart/ProductChart";
import Sidebar from "../../AdminComponents/Sidebar/Sidebar";

const Admin = () => {
	
	return (
		<div className=" bg-blue-100 ">
			<AdminHeader></AdminHeader>
			<div className="flex it">
				<Sidebar></Sidebar>
				<div className=" h-[100vh] overflow-x-auto overflow-y-auto w-full py-24 mx-auto">
					<Outlet></Outlet>

				</div>
			</div>
		</div>
	);
};

export default Admin;
