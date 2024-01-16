import bcrypt from "bcryptjs";
import React, { createContext, useState } from "react";
import { set } from "react-hook-form";
import { useCookie } from "../hooks";
import { api } from "../lib/api";

// Create the context
export const OtpVerificationContext = createContext();
// Create the provider component
export const OtpVerificationProvider = ({ children }) => {
	const [verificationCode, setVerificationCode] = useState("");
	const [verificationStatus, setVerificationStatus] = useState(false);

	const [otpCookie, updateOtpCookie, removeOtpCookie] = useCookie("otp");

	// Function to handle verification code input
	const handleVerificationCodeChange = (code) => {
		// hash code
		const hashedCode = bcrypt.hashSync(code, import.meta.env.VITE_APP_SALT);
		updateOtpCookie(hashedCode);
	};

	const verifyOtp = () => {
		if (
			otpCookie &&
			otpCookie ===
				bcrypt.hashSync(verificationCode, import.meta.env.VITE_APP_SALT)
		) {
			// If the OTP is correct, remove the cookie
			removeOtpCookie();
			setVerificationStatus(true);
		} else {
			// If the OTP is incorrect, show an error message
			setVerificationCode("");
			setVerificationStatus(false);
			alert("Incorrect OTP. Please try again.");
		}
	};

	const sendOtp = async (Otp) => {
		const generatedOtp = Otp;
		const phoneNumber = "01878601610";
		api.post("/sentOtp", {
			number: phoneNumber,
			otp: generatedOtp.toString(),
		})
			.then((response) => {
				console.log("OTP sent:", generatedOtp);
			})
			.catch((error) => {
				console.log("Error sending OTP:", error);
			});
	};

	// Define the context value
	const contextValue = {
		handleVerificationCodeChange,
		handleVerificationCodeSubmit,
		sendOtp,
		verifyOtp,
		verificationStatus,
	};

	// Return the provider component with the context value
	return (
		<OtpVerificationContext.Provider value={contextValue}>
			{children}
		</OtpVerificationContext.Provider>
	);
};
