import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@lib/api";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Footer, Header } from "@components";
import Cookies from "js-cookie";
const ForgetPasswordChange = () => {
	const phoneNumber = useLocation().state.phoneNumber;
	// console.log("🚀 ~ ForgetPasswordChange ~ phoneNumber:", phoneNumber);
	const navigate = useNavigate();
	useEffect(() => {
		if (phoneNumber) {
			return;
		} else {
			navigate("/home");
		}
	}, []);
	const forgetSchema = yup.object().shape({
		newPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(forgetSchema),
	});

	const { errors } = formState;

	const onSubmit = async (data) => {
		const { newPassword, confirmPassword } = data;
		if (confirmPassword === newPassword) {
			try {
				const response = await api.post("/auth/forgetPassword", {
					emailOrPhone: phoneNumber,
					newPassword,
				});

				toast(response.data.message);

				if (response.status === 200) {
					toast.success("Password updated successfully");
                    navigate("/login")
                    localStorage.removeItem("user-id");
                    Cookies.remove("user");
                    Cookies.remove("auth");
				}
			} catch (error) {
				toast.error(
					error.response?.data?.message || "Failed to update password"
				);
			}
		}
	};
	return (
		<div className="pt-12">
            <Header/>
            <Footer/>
			<div className="mx-auto w-full max-w-md rounded-lg bg-white ">
				<div className="flex items-center justify-between border-b p-4">
					<Link to={"/login"}>
						<button className="text-gray-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
					</Link>
					<h2 className="text-lg font-semibold">Change Password</h2>
					<button className="text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.905 18 13V6a6 6 0 10-12 0v7c0 .905-.21 1.79-.595 2.595L4 17h5m6 0v2a3 3 0 11-6 0v-2m6 0H9"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 ">
				<h2 className="mb-4 text-lg font-semibold">
					Create a new password for this account. This will replace
					your current password.
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor="newPassword"
						>
							New Password
						</label>
						<input
							type="password"
							id="newPassword"
							placeholder="New Password"
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700  focus:outline-none"
							{...register("newPassword")}
						/>
						<p className="text-danger px-4">
							{errors.newPassword?.message}
						</p>
					</div>
					<div className="mb-4">
						<label
							className="mb-2 block font-bold text-gray-700"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							placeholder="Confirm Password"
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700  focus:outline-none"
							{...register("confirmPassword")}
						/>
						<p className="text-danger px-4">
							{errors.confirmPassword?.message}
						</p>
					</div>

					<button type="submit" className="auth-btn mb-4">
						Submit
					</button>
					<p className="mb-4 text-sm text-gray-600">
						Password must be 8-16 characters and contain both
						numbers and letters/special characters
					</p>
				</form>
			</div>
		</div>
	);
};

export default ForgetPasswordChange;
