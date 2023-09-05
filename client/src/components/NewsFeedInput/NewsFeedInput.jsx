/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { api } from "../../lib/api";

const NewsFeedInput = () => {
	const [cameraError, setCameraError] = useState(null);
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);

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
		const formData = new FormData();
		formData.append("uploadFiles", file);

		var ImageName = null;
		console.log(new Date());
		if (file === null) {
			ImageName = null;
		} else {
			await Axios.post(
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
			).then((response) => {
				console.log(response.data);
				if (response.data.msg === "File Uploaded") {
					ImageName = response.data.productImage;
				}
			});
		}
		api.post(`/news/addnews`, {
			shop_id: userID,
			date: new Date(),
			post_content: content,
			post_img: ImageName,
			category: "regular",
		}).then((response) => {
			if (response.data.message == userID + " Added Successful") {
				setContent("");
				alert("News Feed Added Successful");
			}
		});
	};
	return (
		<div>
			<div className="flex items-center rounded-lg border border-gray-200 p-4">
				<div
					onClick={() => window.openNewsInput.showModal()}
					className="flex-grow"
				>
					<div className="w-full border-none bg-transparent placeholder-gray-500 focus:outline-none" />
					{content || "write Post"}
				</div>
			</div>
			<div className="flex justify-end">
				<button
					className="my-2 inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
					onClick={handlePostClick} // Call the function when the button is clicked
				>
					Post
				</button>
			</div>
			{cameraError && <p className="mt-2 text-red-500">{cameraError}</p>}
			<div className="divider"></div>

			<dialog id="openNewsInput" className="modal">
				<form method="dialog" className="modal-box">
					<button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
						✕
					</button>
					<h1 className="text-xl">Write Your Post</h1>
					<div className="my-3 flex justify-between">
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
					<div className=" rounded-md border-2 border-gray-200">
						<label className="sr-only">Message</label>

						<textarea
							className="w-full rounded-lg border-gray-200 p-3 text-sm"
							placeholder="Message"
							rows="8"
							id="message"
							value={content} // Set the textarea value from the state
							onChange={(e) => setContent(e.target.value)} // Update the state when the textarea changes
						></textarea>
					</div>
					<button
						className="btn btn-block my-2 bg-blue-500 hover:bg-blue-400"
						onClick={handlePostClick} // Call the function when the button is clicked
					>
						Post
					</button>
				</form>
			</dialog>
		</div>
	);
};

export default NewsFeedInput;
