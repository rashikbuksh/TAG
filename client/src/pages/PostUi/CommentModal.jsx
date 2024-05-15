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
		"Cool",
		"Not Interested",
		"Bad",
	];

	const { user } = useAuth();
	const userID = localStorage.getItem("user-id");

	const [selectedComment, setSelectedComment] = useState("");
	const [newsComment, setNewsComment] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const fetchComment = () => {
		if (isOpen && id) {
			api.get(`/news-comment/get-news-comment/${id}`).then((res) => {
				// const filteredComments = res.data.filter(comment => comment.news_id === id);
				setNewsComment(res.data);
			});
		}
	};
	useEffect(() => {
		if (isOpen && id) {
			api.get(`/news-comment/get-news-comment/${id}`).then((res) => {
				// const filteredComments = res.data.filter(comment => comment.news_id === id);
				setNewsComment(res.data);
			});
		}
	}, [isOpen, id]);

	const handleCommentClick = (comment) => {
		setSelectedComment(comment);
	};

	const handleSubmitComment = (event) => {
		event.preventDefault();
		const date = GetDateTime(); // Use GetDateTime function directly
		api.post(`/news-comment/add-comment`, {
			comment: selectedComment,
			news_id: id,
			commented_by: user.id,
			news_time: date,
		}).then((res) => {
			if (res.status === 201) {
				fetchComment();
				if (shop_id !== user.id) {
					api.post(`/notification/add-notification`, {
						notification_content: `You have a new comment in your post. Commented by ${user.name}`,
						notification_time: date,
						not_from: shop_id,
						not_to: user.id,
						status: 1,
					});
				}
				api.post(`/news/increaseCommentCount/${id}`);
				setSelectedComment("");
				setNewsComment((prevComments) => [...prevComments, res.data]);
			}
		});
	};

	const handleDeleteComment = (commentId) => {
		api.delete(`/news-comment/delete-comment/${commentId}`).then(() => {
			setNewsComment(
				newsComment.filter((comment) => comment.id !== commentId)
			);
			api.post(`/news/decreaseCommentCount/${id}`);
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			setcommentId={setcommentId}
			title={title}
		>
			<div className="my-2">
				<div className="h-52 overflow-y-auto">
					{newsComment.map((comment) => (
						<div
							key={comment.id}
							className="my-1 rounded bg-[#f3f3f3b7]"
						>
							<div className="ml-2 mt-2 flex items-center justify-between gap-3">
								<div className="flex items-center gap-3">
									<img
										src={`${
											import.meta.env.VITE_APP_IMG_URL
										}/usersProfilePic/${
											comment.profile_picture
										}`}
										className="h-8 w-8 rounded-full"
										alt=""
									/>
									<div>
										<p className="text-base font-bold">
											{comment.name}
										</p>
										<p className="text-xs font-bold">
											{comment.news_time}
										</p>
									</div>
								</div>
								{comment.commented_by === userID && (
									<div className="mr-5 flex justify-end">
										<button
											onClick={() =>
												handleDeleteComment(comment.id)
											}
										>
											<FaTrash />
										</button>
									</div>
								)}
							</div>
							<div>
								<p className="px-14 py-2 text-xl">
									{comment.comment}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-3 flex flex-wrap gap-1">
					{FixedComments.map((fixcom, index) => (
						<div
							key={index}
							className="w-fit rounded bg-gray-200 p-2"
							onClick={() => handleCommentClick(fixcom)}
						>
							<p className="text-base font-bold">{fixcom}</p>
						</div>
					))}
				</div>
				<div className="">
					<form onSubmit={handleSubmitComment} className="w-full p-2">
						<div className="mb-2">
							<input
								className="h-10 w-full rounded border p-2 text-xl font-bold text-blue-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
								name="comment"
								disabled
								placeholder="Pick your comment"
								value={selectedComment}
								onChange={(e) =>
									setSelectedComment(e.target.value)
								}
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
