import React from 'react';
import AdminHeader from '../../AdminComponents/AdminHeader/AdminHeader';
import Sidebar from '../../AdminComponents/Sidebar/Sidebar';
import ModeratorPageSideBar from '../../AdminComponents/Sidebar/ModeratorPageSideBar';
import { Outlet } from 'react-router-dom';

const ModeratorPage = () => {
    return (
        <div className=" bg-blue-100 ">
        <AdminHeader></AdminHeader>
        <div className="flex it">
            <ModeratorPageSideBar></ModeratorPageSideBar>
            <div className=" h-[100vh] overflow-x-auto overflow-y-auto w-full py-24 mx-auto">
                <Outlet></Outlet>

            </div>
        </div>
    </div>
    );
};

export default ModeratorPage;