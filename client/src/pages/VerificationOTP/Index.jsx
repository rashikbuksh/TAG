import React from "react";
import { api } from "../../lib/api";

const VerificationOTP = () => {
	const base_url = "https://api.fazpass.com";
	const sendCode = async () => {
		api.post("/sentOtp", {
			number: "01878601610",
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = (event) => {
		console.log("clicked");
		event.preventDefault(); // Prevents the default form submission behavior

		const formData = new FormData(event.target);
		const verificationOTPValue = formData.get("Verification");
		console.log("Submitted OTP:", verificationOTPValue);
	};

	return (
		<div>
			This is Verification otp page
			<form
				className="space-y-5"
				onSubmit={handleSubmit}
				id="verificationForm"
			>
				<div className="">
					<label
						htmlFor="email"
						className="mb-1 px-4 text-base font-semibold"
					>
						OTP
					</label>
					<input
						type="text"
						className="auth-input"
						name="Verification"
						placeholder="Enter Verification OTP"
					/>
					<p className="text-danger px-4"></p>
				</div>

				<button type="submit" className="auth-btn">
					Submit
				</button>
			</form>
			<div>
				<button className="btn my-10" onClick={sendCode}>
					Get Code{" "}
				</button>
			</div>
		</div>
	);
};

export default VerificationOTP;
