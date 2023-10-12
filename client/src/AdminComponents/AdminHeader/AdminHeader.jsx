import React from 'react';
import { useAuth } from '../../context/auth';

const AdminHeader = () => {
    const {user}=useAuth()
    return (
        <div className="bg-gray-900 w-full h-24 fixed z-50">
      <div className="mx-auto max-w-screen-xl ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome {user.name}
            </h1>

            <p className="mt-1.5 text-sm text-white">
              Let's write a new blog post! 🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            

            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AdminHeader;