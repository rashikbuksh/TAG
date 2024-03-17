import AdminHeader from "@AdminComponents/AdminHeader/AdminHeader";
import ModeratorPageSideBar from "@AdminComponents/Sidebar/ModeratorPageSideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const ModeratorPage = () => {
	return (
		<div className=" bg-blue-100 ">
			<AdminHeader></AdminHeader>
			<div className="it flex">
				<ModeratorPageSideBar></ModeratorPageSideBar>
				<div className=" mx-auto h-[100vh] w-full overflow-x-auto overflow-y-auto py-24">
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default ModeratorPage;
