import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Modal from "@components/Modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@context/auth";
import { Link } from "react-router-dom";
const Password = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useAuth();
	console.log(user, "user");
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	const forgetSchema = yup.object().shape({
		oldPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		newPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(forgetSchema),
	});

	const { errors } = formState;
	const [userData, setUserData] = useState({});
	useEffect(() => {
		api.get(`/profile/get_profile/${user?.id}`).then((response) => {
			setUserData(response.data[0]);
		});
	}, []);
	const onSubmit = async (data) => {
		const { oldPassword, newPassword, confirmPassword } = data;
		if (confirmPassword === newPassword) {
			try {
				const response = await api.post("/auth/changePassword", {
					emailOrPhone: userData.phone,
					oldPassword,
					newPassword,
				});

				toast(response.data.message);

				if (response.status === 200) {
					toast.success("Password updated successfully");
					setIsOpen(false); // Close the modal if open
				}
			} catch (error) {
				toast.error(
					error.response?.data?.message || "Failed to update password"
				);
			}
		}
	};
	return (
		<div className="mt-12">
			<div className="mx-auto w-full max-w-md rounded-lg bg-white ">
				<div className="flex items-center justify-between border-b p-4">
					<Link to={"/edit-profile"}>
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
					</Link>
					<h2 className="text-lg font-semibold">Change Password</h2>
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
								d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.905 18 13V6a6 6 0 10-12 0v7c0 .905-.21 1.79-.595 2.595L4 17h5m6 0v2a3 3 0 11-6 0v-2m6 0H9"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 ">
				<h2 className="mb-4 text-lg font-semibold">
					Create a new password for this account. This will replace
					your current password.
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor="oldPassword"
						>
							Old Password
						</label>
						<input
							type="password"
							id="oldPassword"
							placeholder="Old Password"
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700  focus:outline-none"
							{...register("oldPassword")}
						/>
						<p className="text-danger px-4">
							{errors.oldPassword?.message}
						</p>
					</div>
					<div className="mb-4">
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor="newPassword"
						>
							New Password
						</label>
						<input
							type="password"
							id="newPassword"
							placeholder="New Password"
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700  focus:outline-none"
							{...register("newPassword")}
						/>
						<p className="text-danger px-4">
							{errors.newPassword?.message}
						</p>
					</div>
					<div className="mb-4">
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							placeholder="Confirm Password"
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700  focus:outline-none"
							{...register("confirmPassword")}
						/>
						<p className="text-danger px-4">
							{errors.confirmPassword?.message}
						</p>
					</div>

					<button type="submit" className="auth-btn mb-4">
						Submit
					</button>
					<p className="mb-4 text-sm text-gray-600">
						Password must be 8-16 characters and contain both
						numbers and letters/special characters
					</p>
					<button
						type="button"
						onClick={openModal}
						className="text-blue-500 hover:underline"
					>
						Forgot old password?
					</button>
				</form>
			</div>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title={"Forgot Password"}
			>
				<Dialog.Description className="mt-2 text-sm text-gray-600">
					Your Tag ID has been linked to your mobile. You can reset
					your password via an SMS verification code. Send
					verification code to +8801599648337.
				</Dialog.Description>

				<div className="mt-4 flex justify-end">
					<button
						onClick={closeModal}
						className="mr-2 rounded bg-gray-200 px-4 py-2 text-gray-700"
					>
						Cancel
					</button>
					<button className="rounded bg-blue-500 px-4 py-2 text-white">
						Send
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Password;
