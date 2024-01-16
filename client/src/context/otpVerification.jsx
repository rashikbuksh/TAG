import axios from "axios";
import bcrypt from "bcryptjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useCookie } from "../hooks";
import { api } from "../lib/api";

// Create the context
const OtpVerificationContext = createContext();
const saltRounds = 10;

// Create the provider component
const OtpVerificationProvider = ({ children }) => {
	const [otpCookie, updateOtpCookie, removeOtpCookie] = useCookie("otp");

	// Function to handle verification code input
	const handleVerificationCodeChange = async (code) => {
		const hashedCode = code;
		updateOtpCookie(hashedCode);
	};

	const verifyOtp = (code) => {
		if (otpCookie && otpCookie === code) {
			// If the OTP is correct, remove the cookie
			console.log("otpCookie matching", otpCookie === code);
			removeOtpCookie();
			return true;
		} else {
			// If the OTP is incorrect, show an error message
			alert("Incorrect OTP. Please try again.");
		}
		return false;
	};

	const sendOtp = async (Otp) => {
		const generatedOtp = Otp;
		const phoneNumber = "01878601610";
		console.log("sendOtp send code", generatedOtp);
		await axios
			.post(
				`${import.meta.env.VITE_APP_API_URL}/sentOtp`,
				{
					number: phoneNumber,
					otp: generatedOtp.toString(),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log("OTP sent:", response, generatedOtp);
			})
			.catch((error) => {
				console.log("Error sending OTP:", error);
			});
	};

	// Define the context value
	const contextValue = {
		handleVerificationCodeChange,
		sendOtp,
		verifyOtp,
	};

	// Return the provider component with the context value
	return (
		<OtpVerificationContext.Provider value={contextValue}>
			{children}
		</OtpVerificationContext.Provider>
	);
};

// Custom hook to consume the context
export const useOtpVerification = () => {
	return useContext(OtpVerificationContext);
};
export default OtpVerificationProvider;
