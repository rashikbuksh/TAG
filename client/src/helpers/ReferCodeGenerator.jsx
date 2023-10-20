import React, { useEffect, useState } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { api } from "../lib/api";

const ReferCodeGenerator = () => {
	const [copySuccess, setCopySuccess] = useState(null);
	const [referCode, setReferCode] = useState(null);

	const id = localStorage.getItem("user-id");

	const copyToClipboard = (reffer) => {
		navigator.clipboard
			.writeText(reffer)
			.then(() => {
				setCopySuccess("Copied to clipboard!");
				addReferCode();
			})
			.catch((err) => {
				setCopySuccess("Copy failed: " + err);
			});
	};

	const generateReferCode = () => {
		setReferCode(Math.random().toString(36).substring(2, 15));
		// console.log(referCode);
	};

	const addReferCode = () => {
		api.post(`/auth/addReferCode`, {
			refer_code: referCode,
			id: id,
		});
	};

	useEffect(() => {
		api.get(`/auth/getRefer/${id}`).then((res) => {
			// console.log(res.data[0].refer_code);
			setReferCode(res.data[0].refer_code);
		});
	}, []);

	return (
		<div className="container mx-auto mt-24">
			<div className="mx-auto max-w-3xl rounded bg-white p-8 shadow-lg">
				<button
					disabled={referCode}
					onClick={() => generateReferCode()}
					className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				>
					Generate Refer Code
				</button>
				<br />
				<br />
				<div className="flex items-center justify-between text-lg">
					<span> {referCode} </span>

					<FaClipboardCheck
						onClick={() => copyToClipboard(referCode)}
						className="ml-2 cursor-pointer text-3xl text-blue-500"
					/>
				</div>
				{referCode && (
					<div className="my-10">
						your Refer Link
						<p
							onClick={() =>
								copyToClipboard(
									`${
										import.meta.env.VITE_API_PUBLIC_URL
									}/register/${referCode}`
								)
							}
							className="link-info link"
						>{`${
							import.meta.env.VITE_API_PUBLIC_URL
						}/register/${referCode}`}</p>
					</div>
				)}

				{copySuccess && (
					<p className="mt-2 text-green-500">{copySuccess}</p>
				)}
			</div>
		</div>
	);
};

export default ReferCodeGenerator;
