import { Footer, Header } from "@components";
import { useRef, useState } from "react";
import { useOtpVerification } from "@context/otpVerification";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "@lib/api";

const ForgetPassword = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otpInput, setOtpInput] = useState(new Array(4).fill(""));
	const numberOfDigits = 4;
	// console.log("🚀 ~ ForgetPassword ~ otpInput:", otpInput);
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // New state for loading
	const otpRefs = useRef([]);
	const [otpError, setOtpError] = useState(null);
	const { sendOtp, handleVerificationCodeChange, verifyOtp } =
		useOtpVerification();
	const [isOtpEmpty, setIsOtpEmpty] = useState(true);
	const navigate = useNavigate();
	const generateOTP = () => {
		const min = 1000;
		const max = 9999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const sendOTPCode = async () => {
		if (phoneNumber.trim() === "") {
			toast.error("Please enter your phone number.");
			return;
		}

		// setIsLoading(true); // Start loading

		try {
			const response = await api.get(`/auth/checkUser/${phoneNumber}`);

			// console.log("🚀 ~ sendOTPCode ~ response:", response);
			if (response.status === 200) {
				const generatedOtp = generateOTP();
				setIsCodeSent(true);
				handleVerificationCodeChange(generatedOtp.toString());
				await sendOtp(generatedOtp, phoneNumber);
				setOtpError(null);
				// Set isCodeSent to true when OTP is sent
				toast.success("Verification code sent!");
			} else {
				toast.error(
					"User not found. Please check your phone number and try again."
				);
			}
		} catch (error) {
			toast.error(
				"User not found. Please check your phone number and try again."
			);
		} finally {
			// setIsLoading(false); // Stop loading
		}
	};

	const handleVerificationOfOTP = async () => {
		const code = otpInput.join("");
		// console.log(code, "code");

		if (code.length === 4) {
			let verifiedOrNot = await verifyOtp(code);
			// console.log(phoneNumber);

			if (verifiedOrNot) {
				toast.success("OTP verified! Proceed to reset your password.");
				navigate("/forgetPassword", { state: { phoneNumber } });
				// Proceed with password reset logic
			} else {
				setOtpError("Incorrect OTP");
			}
		} else {
			setOtpError("Please enter a 4-digit OTP");
		}
	};

	// const handleOtpChange = (value, index) => {
	// 	const newOtp = [...otpInput];
	// 	newOtp[index] = value;
	// 	setOtpInput(newOtp);
	// 	setOtpError(null);
	// };
	const handleOtpChange = (value, index) => {
		const newOtp = [...otpInput];
		newOtp[index] = value;

		setOtpInput(newOtp);
		setOtpError(null);

		// Focus the next input field if a digit is entered
		const newIsOtpEmpty = newOtp.every((digit) => digit === "");
		setIsOtpEmpty(newIsOtpEmpty);
		if (value && index < numberOfDigits - 1) {
			otpRefs.current[index + 1].focus();
		}
	};

	const handleBackspace = (e, index) => {
		// Move focus to previous field on backspace if the current field is empty
		if (e.key === "Backspace" && !e.target.value && index > 0) {
			otpRefs.current[index - 1].focus();
		}
		if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
			otpRefs.current[index + 1].focus();
		}
	};
	return (
		<div className="px-3">
			<Header />
			<Footer />
			<div className="body-wrapper mt-24 flex justify-center bg-gray-100">
				<div className="w-full max-w-md rounded-lg bg-white shadow-lg">
					<div className="flex items-center justify-between border-b p-4">
						<h2 className="text-lg font-semibold text-gray-700">
							Reset Password
						</h2>
					</div>
					<div className="p-6">
						{isLoading ? (
							<div className="flex items-center justify-center">
								<div className="loader h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
								<p className="ml-2 text-gray-700">
									Sending OTP...
								</p>
							</div>
						) : (
							<>
								<div className="mb-6">
									<label
										className="mb-2 block text-sm font-bold text-gray-700"
										htmlFor="phone-number"
									>
										Phone Number
									</label>
									<input
										id="phone-number"
										type="text"
										className="w-full border-b-2 border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0"
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
									/>
								</div>
								{isCodeSent && (
									<div className="mb-6">
										<label
											className="mb-2 block text-sm font-bold text-gray-700"
											htmlFor="otp"
										>
											Verification Code
										</label>
										<div className="flex space-x-2">
											{otpInput.map((digit, index) => (
												<input
													key={index}
													ref={(reference) =>
														(otpRefs.current[
															index
														] = reference)
													}
													type="text"
													maxLength="1"
													className="w-10 border-b-2 border-gray-300 px-3 py-2 text-center text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0"
													value={digit}
													onChange={(e) =>
														handleOtpChange(
															e.target.value,
															index
														)
													}
													onKeyDown={(e) =>
														handleBackspace(
															e,
															index
														)
													}
												/>
											))}
										</div>
										{otpError && (
											<p className="mt-2 text-sm text-red-500">
												{otpError}
											</p>
										)}
									</div>
								)}
								{!isCodeSent ? (
									<button
										onClick={sendOTPCode}
										className="w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
									>
										Send Verification Code
									</button>
								) : (
									<button
										onClick={handleVerificationOfOTP}
										className="w-full rounded bg-green-500 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
									>
										Verify and Reset Password
									</button>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgetPassword;
