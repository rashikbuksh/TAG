import React, { useEffect, useState } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { api } from "../lib/api";

const ReferCodeGenerator = () => {
	const [copySuccess, setCopySuccess] = useState(null);
	const [referCode, setReferCode] = useState(null);

	const id = localStorage.getItem("user-id");

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(referCode)
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
		console.log(referCode);
	};

	const addReferCode = () => {
		api.post(`/auth/addReferCode`, {
			refer_code: referCode,
			id: id,
		});
	};

	useEffect(() => {
		api.get(`/auth/getRefer/${id}}`).then((res) => {
			console.log(res.data[0].refer_code);
			setReferCode(res.data[0].refer_code);
		});
	}, []);
	return (
		<div className="body-wrapper space-pt--70 space-pb--120 my-24">
			<button
				onClick={() => generateReferCode()}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Generate Refer Code
			</button>
			<br />
			<br />
			<br />
			<p>
				{referCode} <FaClipboardCheck onClick={copyToClipboard} />
			</p>
		</div>
	);
};

export default ReferCodeGenerator;
