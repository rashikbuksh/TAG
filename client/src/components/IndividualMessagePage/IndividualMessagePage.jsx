import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const IndividualMessagePage = () => {
	const [selectedMessage, setselectedMessage] = useState("");

	const handleSubmitMessage = (event) => {
		event.preventDefault();
		// console.log("Submitted Comment:", selectedMessage);
	};
	return (
		<div className="">
			<div className="mx-4  rounded-md border px-3">
				<div className="my-1">
					<div className="flex items-center justify-between">
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
							alt=""
						/>
						<h1 className=" text-xl">Rafi Srote</h1>
						<div>
							<FaX></FaX>
						</div>
					</div>
					<div className="divider my-0"></div>
				</div>
				<div className="  h-44 overflow-scroll">
					<div className="my-5 flex items-center justify-end gap-1">
						<div className="message">
							<p className="chat-bubble text-sm">
								Hi, I am interested to by this product
							</p>
						</div>
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
							alt=""
						/>
					</div>
					<div className="my-5 flex  items-center gap-1">
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
							alt=""
						/>
						<div className="message">
							<p className="chat-bubble text-sm">
								Ok , apni order confirm kore dukane asen ami
								kajta kore diboo
							</p>
						</div>
					</div>
					<div className="my-5 flex items-center justify-end gap-1">
						<div className="message">
							<p className="chat-bubble text-sm">
								Hi, I am interested to by this product
							</p>
						</div>
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
							alt=""
						/>
					</div>
					<div className="my-5 flex  items-center gap-1">
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
							alt=""
						/>
						<div className="message">
							<p className="chat-bubble text-sm">
								Ok , apni order confirm kore dukane asen ami
								kajta kore diboo
							</p>
						</div>
					</div>
					<div className="my-5 flex items-center justify-end gap-1">
						<div className="message">
							<p className="chat-bubble text-sm">
								Hi, I am interested to by this product
							</p>
						</div>
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
							alt=""
						/>
					</div>
					<div className="my-5 flex  items-center gap-1">
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
							alt=""
						/>
						<div className="message">
							<p className="chat-bubble text-sm">
								Ok , apni order confirm kore dukane asen ami
								kajta kore diboo
							</p>
						</div>
					</div>
					<div className="my-5 flex items-center justify-end gap-1">
						<div className="message">
							<p className="chat-bubble text-sm">
								Hi, I am interested to by this product
							</p>
						</div>
						<img
							className="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
							alt=""
						/>
					</div>
					<div className="my-5 flex  items-center gap-1">
						<img
							className="h-8 w-8 rounded-full "
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
							alt=""
						/>
						<div className="message">
							<p className="chat-bubble text-sm">
								Ok , apni order confirm kore dukane asen ami
								kajta kore diboo
							</p>
						</div>
					</div>
				</div>
				<div className="">
					<div className="divider my-1"></div>
					<div className="flex flex-wrap justify-start gap-2">
						<div className="flex w-fit gap-3 rounded-md border border-black px-2 py-1">
							{/* Product Image */}
							<img
								className="h-12 w-12 rounded"
								src="https://img.freepik.com/free-vector/realistic-chips-package_1284-34786.jpg?w=826&t=st=1695648958~exp=1695649558~hmac=ccf3293e0bad81692cd763063ccc637e10f89c385a1e9d07c0c43ba8410ab4f6"
								alt=""
							/>
							<div>
								<p className="text-sm">
									Realistic chips package
								</p>
								<p className="text-xs font-bold">
									only 10 taka
								</p>
							</div>
						</div>
						<div className="h-fit w-fit rounded-md  border border-black px-1 py-1">
							<p className="text-xs font-bold">only 10 taka</p>
						</div>
						<div className="h-fit w-fit rounded-md  border border-black px-1 py-1">
							<p className="text-xs font-bold">Any Offer</p>
						</div>
						<div className="h-fit w-fit rounded-md  border border-black px-1 py-1">
							<p className="text-xs font-bold">Any Discount</p>
						</div>
					</div>
				</div>
				<form
					onSubmit={handleSubmitMessage}
					className="mt-2 flex w-full items-center justify-between gap-1 py-2"
				>
					<div className="mb-2 flex-grow">
						<input
							className="h-10  w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
							name="message"
							placeholder="Write Message"
							value={selectedMessage} // Display the selected comment in the input field
							onChange={(e) => setselectedMessage(e.target.value)} // Update the selected comment state
						></input>
					</div>
					<div>
						<button
							type="submit"
							className="ms-auto block rounded bg-blue-100 px-3 py-2 text-sm"
						>
							<FaArrowRight></FaArrowRight>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default IndividualMessagePage;
