import Modal from "@components/Modal/Modal";
import { useAuth } from "@context/auth";
import GetDateTime from "@helpers/GetDateTime";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

const CommentModal = ({
	isOpen,
	setIsOpen,
	title,
	id,
	setcommentId,
	shop_id,
}) => {
	const FixedComments = [
		"Excellent",
		"Interested",
		"Nice",
		"cool",
		"Not Interested",
		"Bad",
	];

	const { user } = useAuth();

	const userID = localStorage.getItem("user-id");

	const [selectedComment, setSelectedComment] = useState(""); // State to store the selected comment

	// Function to handle when a fixed comment is clicked
	const handleCommentClick = (comment) => {
		setSelectedComment(comment);
	};

	// Function to handle submitting a new comment
	const handleSubmitComment = (event) => {
		event.preventDefault();
		// Here, you can use the selectedComment state to submit the comment
		// For example, you can send it to a server or update the UI as needed
		const date = new Date().toLocaleString();
		api.post(`/newscomment/addcomment`, {
			comment: selectedComment,
			news_id: id,
			commented_by: user.id,
			news_time: date,
		}).then((res) => {
			if (res.status == 201) {
				// add comment in the notification table
				if (shop_id == user.id) {
					return;
				} else {
					api.post(`/notification/addnotification`, {
						notification_content:
							"You have a new comment in your post. commented by " +
							user.name,
						notification_time: GetDateTime(),
						not_from: shop_id,
						not_to: user.id,
						status: 1,
					});
				}
			}
		});
		api.post(`/news/increaseCommentCount/${id}`).then((res) => {});
		setSelectedComment(""); // Reset the selected comment state
	};

	const [newsComment, setNewsComment] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [commentUser, setCommentUser] = useState([]); // State to store the selected comment

	useEffect(() => {
		api.get(`/newscomment/getnewscomment`).then((res) => {
			setNewsComment(res.data);
		});
		api.get(`/auth/getALLUserInfo`).then((res) => {
			setUserInfo(res.data);
		});
	}, [newsComment]);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			setcommentId={setcommentId}
			title={title}
		>
			<div className="my-2">
				{/* reuseble components  */}
				<div className="h-52  overflow-y-auto">
					<div className="my-1 flex w-full  flex-col justify-center rounded-xl  ">
						{newsComment.map((comment) => {
							return comment.news_id === id && userInfo ? (
								<div
									key={comment.id}
									className="my-1 rounded bg-[#f3f3f3b7]"
								>
									{userInfo.map((user) => {
										return user.id ==
											comment.commented_by ? (
											<div
												key={user.id}
												className="ml-2 mt-2  flex items-center justify-between gap-3 "
											>
												<div className="flex items-center gap-3">
													<img
														src={`${
															import.meta.env
																.VITE_APP_IMG_URL
														}/usersProfilePic/${
															user.profile_picture
														}`}
														className="h-8 w-8 rounded-full"
														alt=""
													/>
													<div>
														<p className="text-base font-bold">
															{user.name}
														</p>

														<p className="text-xs font-bold">
															{comment.news_time}
														</p>
													</div>
												</div>

												{comment.commented_by ==
													userID && (
													<div className="mr-5 flex justify-end">
														<button
															onClick={() => {
																api.delete(
																	`/newscomment/deletecomment/${comment.id}`
																);
																api.post(
																	`/news/decreaseCommentCount/${id}`
																);
															}}
														>
															<FaTrash />
														</button>
													</div>
												)}
											</div>
										) : null;
									})}
									<div>
										<p className=" px-14 py-2 text-xl">
											{comment.comment}
										</p>
									</div>
								</div>
							) : null;
						})}
					</div>
				</div>

				<div className="mt-3 flex flex-wrap gap-1">
					{FixedComments.map((fixcom, index) => (
						<div
							key={index}
							className="w-fit rounded bg-gray-200 p-2"
							onClick={() => handleCommentClick(fixcom)} // Handle comment click
						>
							<p className="text-base font-bold">{fixcom}</p>
						</div>
					))}
				</div>
				<div className="">
					<form onSubmit={handleSubmitComment} className="w-full p-2">
						<div className="mb-2">
							<input
								className="h-10 w-full rounded border p-2 text-xl font-bold text-blue-600  focus:outline-none focus:ring-1 focus:ring-gray-300"
								name="comment"
								placeholder="Add a comment"
								disabled
								value={selectedComment} // Display the selected comment in the input field
								onChange={(e) =>
									setSelectedComment(e.target.value)
								} // Update the selected comment state
							></input>
						</div>
						<button
							type="submit"
							className="rounded bg-blue-600 px-3 py-2 text-sm text-blue-100"
						>
							Comment
						</button>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default CommentModal;
