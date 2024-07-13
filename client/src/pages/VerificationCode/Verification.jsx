import React, { useState } from "react";

const Verification = () => {
	const [code, setCode] = useState("");

	return (
		<>
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
						<h2 className="text-lg font-semibold">Verification</h2>
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

					<div className="mx-8">
						<div className="mt-2 flex justify-center gap-2 font-semibold">
							<p className="text-green-500">Verification Code </p>{" "}
							<span>Sent via SMS</span>
						</div>
						<p className="p-2 text-center text-xl font-bold">
							+8801599648337
						</p>

						<div>
							<div className="flex justify-between gap-4  border-b-2 border-green-500 py-2">
								<span>Code</span>
								<input
									type="text"
									placeholder="Enter code"
                                    className="w-full text-center"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>
							<p className="mt-2 text-center ">
								Your SMS should arrive in 30 seconds
							</p>
						</div>

						<button
							type="button"
							className={`auth-btn mt-8 ${code == "" ? "opacity-60":""}`}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Verification;
