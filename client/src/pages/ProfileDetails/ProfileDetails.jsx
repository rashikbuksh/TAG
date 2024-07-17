import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";

const ProfileDetails = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="mx-4 mt-14">
			<div className="mb-2 flex items-center justify-between border-b p-4">
				<button className="text-gray-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<h2 className="text-lg font-semibold">My Profile</h2>
				<div></div>
			</div>

			<div>
				<div className="flex items-center justify-between">
					<p className="font-bold">Profile Photo</p>
					<div className="relative flex items-center">
						<img
							src="https://picsum.photos/200/300"
							alt="Profile photo"
							className="h-14 w-14 cursor-pointer rounded-full object-cover"
							onClick={toggleModal}
						/>
						{showModal && (
							<div className="absolute right-16 top-10 z-10  w-48 rounded bg-white p-4 text-center shadow-md">
								<button
									className="block w-full "
									onClick={() => alert("View Image")}
								>
									View Image
								</button>
								<button
									className="block w-full "
									onClick={() => alert("Change Image")}
								>
									Change Image
								</button>
								<button
									className="block w-full "
									onClick={() => alert("Remove Image")}
								>
									Remove Image
								</button>
								<button
									className="mt-2 block w-full "
									onClick={toggleModal}
								>
									Close
								</button>
							</div>
						)}
						<MdKeyboardArrowRight size={30} />
					</div>
				</div>
				<div className="flex flex-col ">
					<div className="mt-4 flex justify-between">
						<p className="font-bold">Name</p>
						<div className="flex items-center gap-1">
							<p>Jubayer</p>
							<MdKeyboardArrowRight size={30} />
						</div>
					</div>
					<div className="flex justify-between">
						<p className="font-bold">Tag Id</p>
						<div className="flex items-center gap-1">
							<p>jksbhow</p>
							<MdKeyboardArrowRight size={30} />
						</div>
					</div>
					<div className="flex justify-between mt-4">
						<p className="font-bold">My QR Code</p>
						<div className="flex items-center gap-1">
							<BsQrCodeScan />
							<MdKeyboardArrowRight size={30} />
						</div>
					</div>
					<div className="flex justify-between mt-4">
						<p className="font-bold">Phone Number</p>
						<div className="flex items-center gap-1">
							<p>+88015889468</p>
						</div>
					</div>
					<div className="flex justify-between mt-4">
						<p className="font-bold">Balance</p>
						<div className="flex items-center gap-1">
							<p>60 Tk</p>
						</div>
					</div>
					<div className="flex justify-between mt-4">
						<p className="font-bold">All friends</p>
						<div className="flex items-center gap-1">
							<p>36 friends</p>
							<MdKeyboardArrowRight size={30} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
