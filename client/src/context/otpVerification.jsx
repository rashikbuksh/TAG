import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const OtpVerificationContext = createContext();
// Create the provider component
const OtpVerificationProvider = ({ children }) => {
	// const [otpCookie, updateOtpCookie, removeOtpCookie] = useCookie("otp");
	const [otp, setOtp] = useState("");

	// Function to handle verification code input
	const handleVerificationCodeChange = (code) => {
		// Hash the code using SHA-256
		// const hashedCode = SHA256(code).toString();
		setOtp(code);
		// Assuming updateOtpCookie is a function to update the OTP cookie
		// updateOtpCookie(hashedCode);
	};
	const verifyOtp = async (code) => {
		if (otp && otp === code) {
			// If the OTP is correct, remove the cookie
			// console.log("otpCookie matching", otp === code);
			// removeOtpCookie();
			return true;
		} else {
			// If the OTP is incorrect, show an error message
			toast.error("Incorrect OTP. Please try again.");
			// removeOtpCookie();
			setOtp("");
		}

		return false;
	};

	const sendOtp = async (Otp, phone) => {
		const generatedOtp = Otp;
		const phoneNumber = phone;
		// console.log("sendOtp send code", generatedOtp);
		await axios
			.post(
				`${import.meta.env.VITE_APP_API_URL}/sentOtp`,
				{
					number: phoneNumber,
					message: `Your OTP verification is ${generatedOtp.toString()} - TAG Think and Get`,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log("OTP sent:", response);
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
