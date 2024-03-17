import { TagLogo2 } from "@SvgHub/TagLogo2";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const Register = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [showPassword, setShowPassword] = useState(false);
	const registerSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		emailAddress: yup.string().email("Please enter valid email address"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		phone: yup
			.string()
			.matches(/^[0-9]+$/, "Phone number must contain only digits")
			.max(11, "Phone number must be at most 11 characters")
			.min(11, "Phone number must be at most 11 characters")
			.required("Phone number is required"),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(registerSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		api.get(`/auth/checkUser/${data.phone}`)
			.then((response) => {
				if (response.status === 200) {
					toast.error("Email or Phone Number already exists");
					navigate("/login");
				} else {
					toast.error("Try Again");
				}
			})
			.catch((error) => {
				if (error) {
					if (error.response.status === 404) {
						navigate("/OTPVerification", { state: { data, id } });
						localStorage.setItem("isCodeSent", "false");
					}
				}
			});
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	return (
		<div className="relative ">
			<div className="mx-auto flex h-screen flex-col justify-around px-[25px] lg:w-[50%]">
				<div className="mx-auto my-5 h-[80px]">
					<TagLogo2></TagLogo2>
				</div>
				<div className="mb-4 w-full text-center ">
					<p className="text-2xl font-bold">Create A New Account</p>
				</div>
				<div className="">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<div className=" ">
							<label
								htmlFor="name"
								className="mb-1 px-4 text-base font-semibold "
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								className="auth-input"
								id="name"
								placeholder="Enter Full name"
								{...register("name")}
							/>
							<p className="text-danger">
								{errors.name?.message}
							</p>
						</div>
						<div className=" ">
							<label
								htmlFor="emailAddress"
								className="mb-1 flex justify-between px-4 text-base font-semibold"
							>
								<span>Email</span>{" "}
								<span className="text-xs">Optional</span>
							</label>
							<input
								type="text"
								name="emailAddress"
								className="auth-input"
								id="emailAddress"
								placeholder="Enter Email Address"
								{...register("emailAddress")}
							/>
							<p className="text-danger">
								{errors.emailAddress?.message}
							</p>
						</div>
						<div className=" ">
							<label
								htmlFor="phone"
								className="mb-1 px-4 text-base font-semibold"
							>
								Phone Number
							</label>
							<input
								type="text"
								name="phone"
								className="auth-input"
								id="phone"
								placeholder="Enter Phone Number"
								{...register("phone")}
							/>
							<p className="text-danger">
								{errors.phone?.message}
							</p>
						</div>
						<div className="relative ">
							<label
								htmlFor="password"
								className="mb-1 px-4 text-base font-semibold"
							>
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								className="auth-input"
								placeholder="Enter Password"
								{...register("password")}
							/>
							<p
								onClick={togglePasswordVisibility}
								className="absolute right-4 top-12 cursor-pointer text-blue-500"
							>
								{showPassword ? (
									<FaEye className="text-2xl text-black " />
								) : (
									<FaEyeSlash className="text-2xl text-black " />
								)}
							</p>
							<p className="text-danger">
								{errors.password?.message}
							</p>
						</div>
						<button type="submit" className="auth-btn mt-4">
							Sign Up
						</button>
					</form>
					<div className="my-3 text-center">
						<p
							className="cursor-pointer "
							style={{ color: "var(--greyscale-500, #9E9E9E)" }}
						>
							Already have an account?{" "}
							<Link
								to={
									import.meta.env.VITE_API_PUBLIC_URL +
									"/login"
								}
							>
								<span className="primary-text">
									Sign in Now
								</span>
							</Link>
						</p>
					</div>
				</div>
				<div className="w-full text-center">
					{" "}
					<p className="text-center">
						By Signing up you accept the{" "}
						<span className="primary-text">Terms of Service</span>{" "}
						and <br />{" "}
						<span className="primary-text">Privacy Policy</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
