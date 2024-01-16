import React, { useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";
import { TagLogo2 } from "../../SvgHub/TagLogo2";
import SuccessOtpModal from "../../components/SuccessOtpModal/SuccessOtpModal";
import { useNavigate } from "react-router-dom";

const VerificationOTP = () => {
	const correctOTP = "1234"; // Hardcoded correct OTP for demonstration
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
		const generatedOTP = generateOTP(); // Generate OTP
		const phoneNumber = "01878601610"; // Replace this with the recipient's phone number
		// console.log(generatedOTP);
		// Make an API call to send the OTP
		// api.post("/sentOtp", {
		//   number: phoneNumber,
		//   otp: generatedOTP.toString(), // Convert OTP to string before sending
		// })
		//   .then((response) => {
		//     console.log("OTP sent:", generatedOTP); // Log the sent OTP
		//     // Handle the API response as needed
		//   })
		//   .catch((error) => {
		//     console.log("Error sending OTP:", error);
		//     // Handle errors if any
		//   });
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
	const navigate = useNavigate();
	useEffect(() => {
		if (otp.join("") !== "" && otp.join("") !== correctOTP) {
			setOtpError("❌ Wrong OTP. Please check again.");
		} else {
			setOtpError(null);
		}
	}, [otp]);
	const handelModal = () => {
		setIsOpen(!isOpen);
		console.log(isOpen);

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
			<button className="btn btn-success my-10" onClick={handelModal}>
				Test
			</button>
		</article>
	);
};

export default VerificationOTP;
