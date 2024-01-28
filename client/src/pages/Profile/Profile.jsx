import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import { ErrorMessage, Preloader } from "../../components";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";

const Profile = () => {
	// const { data, isLoading, errorMessage } = useFetch("profile.json");
	const [totalOrder, setTotalOrder] = useState(0);
	const id = localStorage.getItem("user-id");
	const [userdata, setUserdata] = useState({});
	const [image, setImage] = useState(null);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const allowedTypes = ["image/png", "image/jpeg"]; // Allowed file types
			if (!allowedTypes.includes(file.type)) {
				toast.warning("Please select a PNG or JPG file.");
				return;
			}
			setImage(file);
		}
	};
	const handleProfileImageUpload = async () => {
		if (!image) {
			toast.warning("Please select an image.");
			return;
		}

		const formData = new FormData();
		formData.append("uploadFiles", image);

		try {
			const response = await Axios.post(
				`${
					import.meta.env.VITE_APP_API_URL
				}/imageUpload/uploadprofileimage`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: Cookies?.get("auth"),
					},
				}
			);

			if (response.data.msg == "File Uploaded") {
				const imageFileName = response.data.profileImage;

				api.post(`/profile/update_profile_image/${id}`, {
					profile_picture: imageFileName,
				}).then((response) => {
					if (response.data.message == `${id} updated successfully`) {
						setImage(null);
						toast.success("Profile image updated successfully");
					}
				});
			} else {
				toast("Failed to upload image.");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("An error occurred while uploading the image.");
		}
	};

	useEffect(() => {
		api.get(`/profile/get_profile/${id}`).then((response) => {
			setUserdata(response.data[0]);
		});

		api.get(`/order/get-total-order/${id}`)
			.then((response) => {
				setTotalOrder(response.data[0].total_order);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, [userdata, id]);

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			{/* Profile header */}
			<div className="profile-header-area space-pt--30 space-mb--40">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="relative">
								<div className="mx-auto mb-3 w-fit">
									{image ? (
										<>
											<img
												src={URL.createObjectURL(image)}
												className="img-fluid h-[85px] w-[85px] rounded-full"
												alt="Profile"
											/>
											{image && (
												<button
													onClick={
														handleProfileImageUpload
													}
													className="btn btn-accent btn-xs mx-2 my-3"
												>
													Upload
												</button>
											)}
										</>
									) : userdata.profile_picture ? (
										<>
											<img
												src={`${
													import.meta.env
														.VITE_APP_IMG_URL
												}/usersProfilePic/${
													userdata.profile_picture
												}`}
												className="h-[85px] w-[85px] rounded-full"
												alt="Profile"
											/>
											<form className="absolute right-36 top-16">
												<div className=" w-full  ">
													<label
														htmlFor="dropzone-file"
														className="dark:hover-bg-bray-800 hover-bg-gray-100 dark-border-gray-600 dark-bg-gray-700 dark:hover-border-gray-500 dark-hover-bg-gray-600 h- flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 "
													>
														<div className="flex flex-col items-center justify-center ">
															<svg
																className="h-4 w-4 text-gray-500 dark:text-gray-400"
																aria-hidden="true"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 20 16"
															>
																<path
																	stroke="currentColor"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
																/>
															</svg>
														</div>
													</label>
													<input
														onChange={
															handleImageUpload ||
															(() => {})
														}
														id="dropzone-file"
														type="file"
														className="hidden"
													/>
												</div>
											</form>
										</>
									) : (
										<form>
											<div className="my-2 w-full">
												<label
													htmlFor="dropzone-file"
													className="dark:hover-bg-bray-800 hover-bg-gray-100 dark-border-gray-600 dark-bg-gray-700 dark:hover-border-gray-500 dark-hover-bg-gray-600 flex h-[100px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
												>
													<div className="flex flex-col items-center justify-center pb-6 pt-5">
														<svg
															className="h-8 w-8 text-gray-500 dark:text-gray-400"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 20 16"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
															/>
														</svg>
														<p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
															<span className="font-semibold">
																Click to upload
															</span>{" "}
															or drag and drop
														</p>
													</div>
												</label>
												<input
													onChange={handleImageUpload}
													id="dropzone-file"
													type="file"
													className="hidden"
												/>
											</div>
										</form>
									)}
								</div>

								<div className="profile-header__content space-mt--10">
									<h3 className="name space-mb--15 text-center ">
										{userdata.name}
									</h3>
								</div>
								<div className="profile-info-block__value text-center">
									{userdata.phone}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* profile body */}
			<div className="profile-body-area">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="profile-body">
								<div className="profile-info-table space-mb--40">
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Full Name
										</div>
										<div className="profile-info-block__value">
											{userdata.name}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											User Id
										</div>
										<div className="profile-info-block__value">
											{userdata.id}
										</div>
									</div>
									{/* <div className="profile-info-block">
										<div className="profile-info-block__title">
											Phone
										</div>
										<div className="profile-info-block__value">
											{userdata.phone}
										</div>
									</div> */}
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											E-mail Address
										</div>
										<div className="profile-info-block__value">
											{userdata.email}
										</div>
									</div>
									
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Address
										</div>
										<div className="profile-info-block__value">
											{userdata.address?userdata.address:"N/A"}
										</div>
									</div>
									{userdata.access == "shopper" ? (
										""
									) : (
										<div className="profile-info-block">
											<div className="profile-info-block__title">
												Total Order
											</div>
											<div className="profile-info-block__value">
												{totalOrder}
											</div>
										</div>
									)}

									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Edit Profile
										</div>
										<div className="profile-info-block__value">
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/edit-profile"
												}
											>
												<ReactSVG
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/edit.svg"
													}
												/>
											</Link>
										</div>
									</div>
								</div>

								{/* ... (other profile info) ... */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
