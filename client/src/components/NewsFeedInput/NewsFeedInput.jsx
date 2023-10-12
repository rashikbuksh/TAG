import React, { useState } from "react";
import { FaFileImage, FaCamera } from "react-icons/fa";
import Modal from "../Modal/Modal";
import Axios from "axios";
import Cookies from "js-cookie";
import { api } from "../../lib/api";

const NewsFeedInput = ({ isOpen, setIsOpen }) => {
	const [cameraError, setCameraError] = useState(null);
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);
	const [isPosting, setIsPosting] = useState(false);
	const [postError, setPostError] = useState(null);

	const userID = localStorage.getItem("user-id");

	const handleCameraClick = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});

			// Use the stream to display the camera feed or take further actions
			// For example, you could create a video element and set its srcObject to the stream.

			setCameraError(null); // Clear any previous errors
		} catch (error) {
			console.error("Error accessing camera:", error);
			setCameraError(
				"Camera access denied. Please grant camera permission."
			);
		}
	};

	const handlePostClick = async () => {
		if (isPosting) {
			return; // Prevent multiple clicks while posting
		}

		setPostError(null);
		setIsPosting(true);

		let ImageName = "";

		if (file) {
			const formData = new FormData();
			formData.append("uploadFiles", file);

			try {
				const response = await Axios.post(
					`${
						import.meta.env.VITE_APP_API_URL
					}/imageUpload/newsImageUpload`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data;",
							Authorization: Cookies?.get("auth"),
						},
					}
				);

				if (response.data.msg === "File Uploaded") {
					ImageName = response.data.productImage;
				}
			} catch (error) {
				console.error("Error uploading image:", error);
				setPostError("Error uploading image. Please try again.");
				setIsPosting(false);
				return;
			}
		}

		try {
			const response = await api.post(`/news/addnews`, {
				shop_id: userID,
				date: new Date(),
				post_content: content,
				post_img: ImageName,
				category: "regular",
			});
			console.log(response.data.message,userID + " added successfully");

			if (response.data.message == `${userID} added successfully`) {
				setContent("");
				setFile(null); // Reset the selected image
				setIsPosting(false);
				alert("News Feed Added Successfully");
				setIsOpen(!isOpen);
			}
		} catch (error) {
			console.error("Error posting news:", error);
			setPostError("Error posting news. Please try again.");
			setIsPosting(false);
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div>
				<form className="px-2 py-3">
					<h1 className="text-xl">Write Your Post</h1>
					<div className="justify between my-3 flex">
						<div className="mr-4">
							<FaCamera
								className="cursor-pointer text-2xl text-blue-400"
								onClick={handleCameraClick}
							/>
						</div>
						<div className="ml-4 flex items-center">
							<label
								className="cursor-pointer"
								htmlFor="fileInput"
							>
								<FaFileImage className="text-2xl text-blue-400" />
							</label>
							<input
								type="file"
								id="fileInput"
								className="hidden"
								onChange={(e) => {
									setFile(e.target.files[0]);
								}}
							/>
						</div>
					</div>
					<div className="rounded-md border-2 border-gray-200">
						<label className="sr-only">Message</label>
						<textarea
							className="w-full rounded-lg border-gray-200 p-3 text-sm"
							placeholder="Message"
							rows="8"
							id="message"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></textarea>
					</div>
					{/* Show the selected image as a preview */}
					{file && (
						<div className="my-3">
							<img
							className="w-1/2 mx-auto"
								src={URL.createObjectURL(file)}
								alt="Selected Image"
								style={{ maxWidth: "100%" }}
							/>
						</div>
					)}
					{postError && (
						<div className="my-3 text-red-500">{postError}</div>
					)}
					<button
						className={`btn btn-block my-2 ${
							isPosting
								? "cursor-not-allowed bg-gray-400"
								: "hover-bg-blue-400 bg-blue-500"
						}`}
						onClick={handlePostClick}
						disabled={isPosting}
					>
						{isPosting ? "Posting..." : "Post"}
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default NewsFeedInput;
