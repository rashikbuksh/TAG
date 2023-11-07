import React from "react";
import { Breadcrumb } from "../../components";

const Chat = () => {
	const shownMessage = [1, 2, 3, 4, 5, 6, 7];
	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Chat" prevUrl="/home" />
			<div className="chat-area py-2">
				{shownMessage.map((msg, index) => (
					<div
						key={index}
						className="mt-2 flex h-[100px] w-full items-center gap-3 bg-gray-100 p-2 text-black"
					>
						<div className="avatar">
							<div className="h-10 w-10 rounded-full">
								<img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1699375431~exp=1699376031~hmac=31d3ae63ebed86b90bf2a8c3b208d48fe35a8a18eafb4247650cf8254ace0cb1" />
							</div>
						</div>
						<div>
							<p className="text-base font-bold">Max Store</p>
							<p className="text-sm">2/9/2023</p>
							<p className="my-1">hii..</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Chat;
