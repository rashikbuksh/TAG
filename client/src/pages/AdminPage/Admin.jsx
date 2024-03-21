import AdminHeader from "@AdminComponents/AdminHeader/AdminHeader";
import Sidebar from "@AdminComponents/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
	return (
		<div className=" bg-blue-100 ">
			<AdminHeader></AdminHeader>
			<div className="it flex">
				<Sidebar></Sidebar>
				<div className=" mx-auto h-[100vh] w-full overflow-x-auto overflow-y-auto py-24">
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default Admin;
