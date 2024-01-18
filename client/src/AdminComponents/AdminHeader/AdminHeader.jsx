import React, { useState } from "react";
import NewsFeedInput from "../../components/News/NewsFeedInput/NewsFeedInput";
import { useAuth } from "../../context/auth";

const AdminHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handelNewsInput = () => {
		setIsOpen(!isOpen);
	};
	const { user } = useAuth();
	return (
		<div className="fixed z-50 h-24 w-full bg-gray-900">
			<div className="mx-10 ">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="text-center sm:text-left">
						<h1 className="text-2xl font-bold text-white sm:text-3xl">
							Welcome {user.name}
						</h1>

						<p className="mt-1.5 text-sm text-white">
							Control As Your Wishes 🎉
						</p>
					</div>
					{user && user.access === "admin" ? (
						<div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
							<button
								onClick={handelNewsInput}
								className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
								type="button"
							>
								Create Post
							</button>
							<NewsFeedInput
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							></NewsFeedInput>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminHeader;
