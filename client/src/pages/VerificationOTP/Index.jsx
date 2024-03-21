import { TagLogo2 } from "@SvgHub/TagLogo2";
import SuccessOtpModal from "@components/SuccessOtpModal/SuccessOtpModal";
import { useOtpVerification } from "@context/otpVerification";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerificationOTP = () => {
	const navigate = useNavigate();
	const data = useLocation().state.data;

	const id = useLocation().state.id;

	const { name, emailAddress, phone, password } = data;

	const { sendOtp, handleVerificationCodeChange, verifyOtp } =
		useOtpVerification();

	const numberOfDigits = 4;
	const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
	const [otpError, setOtpError] = useState(null);
	const otpBoxReference = useRef([]);
	const [isOpen, setIsOpen] = useState(false);

	// Retrieve isCodeSent from localStorage or default to false
	const [isCodeSent, setIsCodeSent] = useState(
		JSON.parse(localStorage.getItem("isCodeSent")) || false
	);

	const [isOtpEmpty, setIsOtpEmpty] = useState(true);

	const generateOTP = () => {
		const min = 1000;
		const max = 9999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const sendOTPCode = async () => {
		const generatedOtp = generateOTP();
		sendOtp(generatedOtp, phone);
		handleVerificationCodeChange(generatedOtp.toString());
		setOtpError("");
		setOtp(new Array(numberOfDigits).fill(""));
		setIsOtpEmpty(true);
		// Save isCodeSent to localStorage
		localStorage.setItem("isCodeSent", JSON.stringify(true));
	};

	useEffect(() => {
		// If isCodeSent is false, send OTP
		if (!isCodeSent) {
			sendOTPCode();
		}
	}, [isCodeSent]);

	const handleChange = (value, index) => {
		let newArr = [...otp];
		newArr[index] = value;
		setOtp(newArr);
		const newIsOtpEmpty = newArr.every((digit) => digit === "");
		setIsOtpEmpty(newIsOtpEmpty);
		if (value && index < numberOfDigits - 1) {
			otpBoxReference.current[index + 1].focus();
		}
	};

	const handleBackspaceAndEnter = (e, index) => {
		if (e.key === "Backspace" && !e.target.value && index > 0) {
			otpBoxReference.current[index - 1].focus();
		}
		if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
			otpBoxReference.current[index + 1].focus();
		}
	};

	const handelModalOpen = () => {
		setIsOpen(true);
		setTimeout(() => {
			setIsOpen(false);
			navigate("/login");
		}, 2000);
	};

	const handleVerificationOfOTP = async () => {
		console.log(data);
		const code = otp.join("");
		// console.log("handleVerificationOfOTP code", code);
		if (code.length === numberOfDigits) {
			let verifiedOrNot = await verifyOtp(code);
			console.log(
				"🚀 ~ handleVerificationOfOTP ~ verifiedOrNot:",
				verifiedOrNot
			);
			if (verifiedOrNot == true) {
				// insert user data to database
				console.log("insert user data to database");
				axios
					.post(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
						name: name,
						email: emailAddress,
						phone: phone,
						password: password,
						access: "customer",
					})
					.then((response) => {
						if (response.data.message === phone) {
							if (id) {
								localStorage.setItem("ref_c", id);
							}
							handelModalOpen();
							toast("Registration Successful");
							setOtp("");
						}
					})
					.catch((error) => {
						console.log(error, "error");
						if (
							error.response.data.message ==
							"Error executing the query"
						) {
							toast.error("Email or Phone Number already exists");
							navigate("/login");
							setOtp(new Array(numberOfDigits).fill(""));
						}
					});
			} else {
				setIsOtpEmpty(true);
				setOtpError("Incorrect OTP");
				// Hide Verify button
			}
		} else {
			setIsOtpEmpty(true);
			setOtpError("Please enter a 4-digit OTP");
		}
	};

	return (
		<article className="mx-auto mt-28 max-w-md px-6">
			<SuccessOtpModal isOpen={isOpen} setIsOpen={setIsOpen} />

			<div className="flex items-center justify-center">
				<TagLogo2 />
			</div>

			<p className="text-center text-3xl font-bold">Verification Code</p>
			<p className="mb-4 mt-4 text-center text-base text-gray-600">
				Please enter the One Time Password (OTP) sent to your mobile.
			</p>

			<div className="flex items-center justify-center gap-2">
				{Array.isArray(otp) &&
					otp.map((digit, index) => (
						<input
							key={index}
							value={digit}
							maxLength={1}
							onChange={(e) =>
								handleChange(e.target.value, index)
							}
							onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
							ref={(reference) =>
								(otpBoxReference.current[index] = reference)
							}
							className="block h-auto w-14 appearance-none rounded-md border bg-gray-200 p-2 text-center text-xl font-semibold focus:border-blue-500 focus:outline-none"
						/>
					))}
			</div>

			<p className={`mt-2 text-center text-lg text-red-500`}>
				{otpError}
			</p>

			{isOtpEmpty ? (
				<p className="mt-4 text-center text-gray-500">
					Please enter the OTP to verify.
				</p>
			) : (
				<button
					className="btn btn-block mt-6 bg-blue-500 text-white hover:bg-blue-600"
					onClick={handleVerificationOfOTP}
				>
					Verify
				</button>
			)}
			<button className="link mx-auto my-10 block" onClick={sendOTPCode}>
				Try Again
			</button>
		</article>
	);
};

export default VerificationOTP;
