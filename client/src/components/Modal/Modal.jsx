import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaX } from "react-icons/fa6";

const Modal = ({ isOpen, setIsOpen, title, children, setcommentId }) => {
	function closeModal() {
		setIsOpen(false);
		setcommentId?.(0);
	}

	return (
		<>
			{/* <div className="fixed inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Open dialog
            </button>
          </div> */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10 h-[70vh] w-full"
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
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-2 py-3 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										<div className={`flex items-center ${title?"justify-between":"justify-end"} `}>
											{title && (
												<p className="p-2 font-bold">
													{title}
												</p>
											)}

											<button
												onClick={closeModal}
												className="rounded-full  p-1 mr-2"
											>
												<FaX className="text-[#FF4C5E]"></FaX>
											</button>
										</div>
									</Dialog.Title>
									{children}
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
