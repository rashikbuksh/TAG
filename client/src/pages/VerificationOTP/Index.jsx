import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TagLogo2 } from "../../SvgHub/TagLogo2";
import { useOtpVerification } from "../../context/otpVerification";

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
	// Function to generate a random 4-digit OTP
	const generateOTP = () => {
		const min = 1000;
		const max = 9999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const sendCode = async () => {
		const generatedOtp = generateOTP();
		console.log("send code", generatedOtp);
		sendOtp(generatedOtp);
		// hash code
		handleVerificationCodeChange(generatedOtp.toString());
	};

	const handleChange = (value, index) => {
		let newArr = [...otp];
		newArr[index] = value;
		setOtp(newArr);

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

	const handleVerificationOfOTP = () => {
		const code = otp.join("");
		console.log("handleVerificationOfOTP code", code);
		if (code.length === numberOfDigits) {
			console.log("handleVerificationOfOTP code inside condition", code);
			let verifiedOrNot = verifyOtp(code);
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
							navigate("/login");
							toast("Registration Successful");
						}
					})
					.catch((error) => {
						console.log(error, "error");
						if (
							error.response.data.message ==
							"Error executing the query"
						) {
							toast("Email or Phone Number already exists");
						}
					});
			}
		} else {
			setOtpError("Please enter a 4-digit OTP");
		}
	};

		setTimeout(() => {
			setIsOpen(false);
			// navigate("/home");
		}, 2000);
	};
	return (
		<article className="mt-28 px-6 ">
			<SuccessOtpModal
				bgTransparent={true}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<div className="my-10 flex items-center justify-center">
				<TagLogo2 />
			</div>
			<p className="text-4xl font-bold">Verification Code</p>
			<p className="mb-4 mt-6 text-base text-black">
				One Time Password (OTP)
			</p>

			<div className="flex items-center gap-4">
				{otp.map((digit, index) => (
					<input
						key={index}
						value={digit}
						maxLength={1}
						onChange={(e) => handleChange(e.target.value, index)}
						onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
						ref={(reference) =>
							(otpBoxReference.current[index] = reference)
						}
						className={`block h-auto w-20 appearance-none rounded-md border bg-gray-300 p-3 text-xl font-bold text-black focus:border-2 focus:outline-none`}
					/>
				))}
			</div>

			<p
				className={`mt-4 text-lg text-white ${
					otpError ? "error-show" : ""
				}`}
			>
				{otpError}
			</p>
			<button className="btn btn-block mt-10" onClick={sendCode}>
				Get Code
			</button>
			<button
				className="btn btn-block mt-4"
				onClick={handleVerificationOfOTP}
			>
				Verify
			</button>
		</article>
	);
};

export default VerificationOTP;
