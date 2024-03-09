import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaX } from "react-icons/fa6";

const Modal = ({
	isOpen,
	setIsOpen,
	title,
	children,
	setcommentId,
	showCross,
	fullWidth,
	color,
	fullHeight,
}) => {
	function closeModal() {
		setIsOpen(false);
		setcommentId?.(0);
	}

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10 h-screen w-full overflow-y-auto"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-screen items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={`${
										fullWidth
											? "h-80vh mx-auto w-[70%]"
											: "mx-2 w-full max-w-md"
									} transform overflow-hidden rounded-2xl px-2 py-3 text-left align-middle shadow-xl transition-all 
                  ${fullHeight ? "h-96" : "h-auto"}
                  ${color ? `bg-${color}` : "bg-white "}`}
								>
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										<div
											className={`flex items-center ${
												title
													? "justify-between"
													: "justify-end"
											} `}
										>
											{title && (
												<p className="p-2 font-bold ">
													{title}
												</p>
											)}
											{showCross ? (
												""
											) : (
												<button
													onClick={closeModal}
													className="mr-2  rounded-full p-1"
												>
													<FaX className="text-[#FF4C5E]" />
												</button>
											)}
										</div>
									</Dialog.Title>
									<div className="max-h-[60vh] overflow-y-auto">
										{/* Apply max-height and overflow-y-auto to enable scrolling */}
										{children}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
