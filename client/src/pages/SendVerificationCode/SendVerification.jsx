import { useState } from "react";

const SendVerification = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [code, setCode] = useState("");

	const handleSendClick = () => {
		console.log("Send SMS to:hello tawhid vai", phoneNumber);
	};
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
					<h2 className="text-lg font-semibold">Verification code</h2>
					<button className="text-gray-500"></button>
				</div>
				<div className="mt-8">
					<p className="text-center text-xl ">
						{" "}
						<span className="font-semibold text-green-500">
							Verification code{" "}
						</span>
						sent via SMS
					</p>
				</div>

				<div className="mt-8 flex flex-col items-center justify-center">
					<div className="w-full rounded bg-white p-6 ">
						<div className="mb-4">
							<label
								className="mb-2 block text-sm font-bold text-gray-700"
								htmlFor="phone-number"
							>
								Phone Number
							</label>
							<div className="flex">
								<input
									id="phone-number"
									type="text"
									className="flex-grow border-b-2 border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0"
									value={phoneNumber}
									onChange={(e) =>
										setPhoneNumber(e.target.value)
									}
								/>
								<button
									onClick={handleSendClick}
									className="ml-2 cursor-pointer px-4 py-2 font-bold text-gray-500 focus:outline-none"
								>
									Send
								</button>
							</div>
						</div>
						<div className="mb-4">
							<label
								className="mb-2 block text-sm font-bold text-gray-700"
								htmlFor="code"
							>
								Code
							</label>
							<input
								id="code"
								type="text"
								className="w-full border-b-2 border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0"
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>
						</div>
						<p className="mb-4 text-center text-sm text-gray-500">
							Your SMS should arrive in 30 seconds
						</p>
						<input
							type="button"
							value="Submit"
							className="auth-btn text"
						/>
						<div className={`mt-2 flex justify-center `}>
							<input
								type="text"
								className="btn "
								value="Cancle"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SendVerification;
