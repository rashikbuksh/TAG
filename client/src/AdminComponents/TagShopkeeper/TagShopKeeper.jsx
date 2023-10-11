import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import UserTable from '../../components/TagUser/UserTable';
import ShopkeeperTable from './ShopkeeperTable';


const TagShopKeeper = () => {
    const [tagShopkeepers,settagShopkeepers]=useState([])
    useEffect(()=>{
        api.get(`/auth/getShopperInfo`)
			.then((response) => {
				settagShopkeepers(response.data);
			})
			.catch((error) => {
				alert(error);
			});
    },[])
    console.log(tagShopkeepers);
    return (
        <>
        <p className="text-3xl font-bold px-10 py-3">All Shopkeeper</p>
        <div className="mx-auto  w-1/2 p-6">
            <label className="sr-only">Search</label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-200 px-2 py-2.5 pe-10 shadow-sm sm:text-sm "
                // onChange={(e) => handleSearchChange(e.target.value)}
            />
        </div>
        <div className="  mx-12 h-[70vh] overflow-x-auto rounded-md ">
            <div className="z-0 overflow-x-auto">
                <table className=" table-responsive table rounded-md">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Name</th>
                            {/* <th>Short Decription</th> */}
                            {/* <th>Full Description</th> */}
                            <th>Phone</th>
                            <th>Email</th>
                            <td>User Type</td>
                            <td>Review</td>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {tagShopkeepers &&
                            tagShopkeepers.map((tagShopkeeper) => (
                                
                                <ShopkeeperTable
                                    key={tagShopkeeper.id}
                                    tagShopkeeper={tagShopkeeper}
                                ></ShopkeeperTable>
                            ))}
                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </div>
    </>
    );
};

export default TagShopKeeper;