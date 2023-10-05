import AdminHeader from "../../AdminComponents/AdminHeader/AdminHeader";
import AdminStats from "../../AdminComponents/AdminStats/AdminStats";
import ProductChart from "../../AdminComponents/ProductChart/ProductChart";
import Sidebar from "../../AdminComponents/Sidebar/Sidebar";

const Admin = () => {
	return (
		<div className=" bg-blue-100 ">
			<AdminHeader></AdminHeader>
			<div className="flex">
				<Sidebar></Sidebar>
				<div>
					<div className=" mx-10">

					<AdminStats></AdminStats>
					</div>
					<div>
						<ProductChart></ProductChart>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Admin;
