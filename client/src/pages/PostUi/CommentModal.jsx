import React from "react";
import Modal from "../../components/Modal/Modal";

const CommentModal = ({ isOpen, setIsOpen, title, id, setcommentId }) => {
	// console.log(id);
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			setcommentId={setcommentId}
			title={title}
		>
			<div className="my-2 ">
				{/* reuseble components  */}
				<div className="my-1 flex w-full  flex-col justify-center rounded-xl bg-gray-200 ">
					<div className="ml-2 mt-2  flex items-center gap-3">
						<img
							src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1957&q=80"
							className="h-8 w-8 rounded-full"
							alt=""
						/>
						<div>
							<p className="text-base font-bold">User Name</p>
							<p className="text-xs font-bold">15 hrs ago</p>
						</div>
					</div>
					<div>
						<p className="mb-3 ml-3 mt-2">
							This is excelent product
						</p>
					</div>
				</div>
				<div className="my-1 flex w-full  flex-col justify-center rounded-xl bg-gray-200 ">
					<div className="ml-2 mt-2  flex items-center gap-3 ">
						<img
							src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1957&q=80"
							className="h-8 w-8 rounded-full"
							alt=""
						/>
						<div>
							<p className="text-base font-bold">User Name</p>
							<p className="text-xs font-bold">15 hrs ago</p>
						</div>
					</div>
					<div>
						<p className="mb-3 ml-3 mt-2">
							This is excelent product
						</p>
					</div>
				</div>
				<div className="my-1 flex w-full  flex-col justify-center rounded-xl bg-gray-200 ">
					<div className="ml-2 mt-2  flex items-center gap-3">
						<img
							src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1957&q=80"
							className="h-8 w-8 rounded-full"
							alt=""
						/>
						<div>
							<p className="text-base font-bold">User Name</p>
							<p className="text-xs font-bold">15 hrs ago</p>
						</div>
					</div>
					<div>
						<p className="mb-3 ml-3 mt-2">
							This is excelent product
						</p>
					</div>
				</div>
				<div></div>
				<div className="">
					<form action="" className="w-full p-2">
						<div className="mb-2">
							<label
								htmlFor="comment"
								className="text-lg text-gray-600"
							>
								Add a comment
							</label>
							<textarea
								className="h-10 w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
								name="comment"
								placeholder=""
							></textarea>
						</div>
						<button className="rounded bg-blue-600 px-3 py-2 text-sm text-blue-100">
							Comment
						</button>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default CommentModal;
