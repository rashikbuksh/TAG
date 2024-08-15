import React from "react";

const SwitchAndLogout = () => {
	return (
		<div className="mt-12 flex items-center justify-center bg-gray-100 ">
			<div className="w-full max-w-md rounded-lg bg-white ">
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
					<h2 className="text-lg font-semibold">Switch and logout</h2>
					<div></div>
				</div>
				<div className="p-4">
					<div>
						<button className="w-full rounded-lg p-2  text-center text-gray-700 hover:bg-gray-100">
							Switch and Account
						</button>
					</div>
					<div className="h-11 ">
						<form action="" className="mt-2 flex flex-col gap-2">
							<label htmlFor="tawhid">
								<input
									type="radio"
									name="tawhid"
									id="tawhid"
									value="tawhid"
								/>
								Tawhid
							</label>

							<label htmlFor="jubayer">
								<input
									type="radio"
									name="jubayer"
									id="jubayer"
									value="jubayer"
								/>
								Jubayer
							</label>
						</form>
					</div>
					<div>
						<button className="w-full rounded-lg p-2 text-center font-bold text-gray-700 hover:bg-gray-100">
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwitchAndLogout;
