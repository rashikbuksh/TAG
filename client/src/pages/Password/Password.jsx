import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";

const Password = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<div className="mt-12 bg-gray-100">
			<div className="w-full max-w-md rounded-lg bg-white">
				<div className="flex items-center justify-between border-b p-4">
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
			<div className="w-full max-w-md rounded-lg bg-white p-6 ">
				<h2 className="mb-4 text-lg font-semibold">
					Create a new password for this account. This will replace
					your current password.
				</h2>
				<form>
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
						/>
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
						/>
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
						/>
					</div>

					<button type="submit" className="auth-btn mb-4">Submit</button>
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
			<Transition show={isOpen} as={Fragment}>
				<Dialog
					open={isOpen}
					onClose={closeModal}
					className="fixed inset-0 z-10 overflow-y-auto"
				>
					<div className="flex min-h-screen items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-50" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="transition ease-out duration-300 transform"
							enterFrom="scale-95 opacity-0"
							enterTo="scale-100 opacity-100"
							leave="transition ease-in duration-200 transform"
							leaveFrom="scale-100 opacity-100"
							leaveTo="scale-95 opacity-0"
						>
							<div className="z-20 mx-auto max-w-sm rounded bg-white p-6">
								<Dialog.Title className="text-center text-lg font-medium text-gray-900">
									Forgot Password
								</Dialog.Title>
								<Dialog.Description className="mt-2 text-sm text-gray-600">
									Your Tag ID has been linked to your mobile.
									You can reset your password via an SMS
									verification code. Send verification code to
									+8801599648337.
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
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default Password;
