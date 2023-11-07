import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import * as yup from "yup";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../context/auth";
import { api } from "../../lib/api";
import { TagLogo2, Customericon, Shopericon } from "../../SvgHub/TagLogo2";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../SvgHub/SocialIcon";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
	const navigate = useNavigate();
	const { user, login, signed, loginError } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const loginSchema = yup.object().shape({
		email: yup
			.string()
			.email("Please enter valid email address")
			.required("Email address is required"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(loginSchema),
	});

	const { errors } = formState;

	const NAVIGATE_TO = {
		admin: "/home",
	};

	useEffect(() => {
		if (signed) {
			localStorage.setItem("user-id", user?.id);
			navigate(NAVIGATE_TO[user?.access]);
		}
	}, [signed, user, navigate]);

	const onSubmit = (data) => {
		login(data);
	};

	const handelOPenLoginMOdal = () => {
		setIsOpen(!isOpen);
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className="relative h-screen">
			<div className=" mx-auto flex flex-col justify-around px-[25px] lg:w-[50%] ">
				<div className="mx-auto my-5 h-[80px]">
					<TagLogo2></TagLogo2>
				</div>

				<div className="mt-4">
					<form
						onSubmit={handleSubmit(onSubmit)}
						id="authForm"
						className="space-y-5"
					>
						<div className="">
							<label
								htmlFor="email"
								className="mb-1 px-4 text-base font-semibold"
							>
								Email Address
							</label>
							<input
								type="text"
								id="email"
								className="auth-input"
								name="email"
								placeholder="Enter Email"
								{...register("email")}
							/>
							<p className="text-danger px-4">
								{errors.email?.message}
							</p>
						</div>
						<div className="relative">
							<label
								htmlFor="password"
								className="mb-1 px-4 text-base font-semibold"
							>
								{" "}
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								className="auth-input "
								name="password"
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
							<p className="text-danger px-4">
								{errors.password?.message}
							</p>
						</div>

						{loginError && (
							<div>
								<p className="text-error">{loginError}</p>
							</div>
						)}

						<div className="flex items-center  gap-4 px-4  ">
							<a className="link-info link">Forgot Password?</a>
						</div>

						<button
							type="submit"
							className="auth-btn"
							form="authForm"
						>
							Login
						</button>
					</form>
					<div className="my-3 text-center">
						<p
							onClick={handelOPenLoginMOdal}
							className="cursor-pointer  text-base font-semibold text-black  "
						>
							{`Create a account?`}{" "}
							<span className="primary-text font-bold">
								Sign up
							</span>
						</p>
					</div>
					<span className="divider mt-5">- OR - </span>
					<div className="mt-2 flex items-center justify-between">
						<button className="auth-social-btn">
							<FacebookIcon />
						</button>
						<button className="auth-social-btn">
							<GoogleIcon></GoogleIcon>
						</button>
						<button className="auth-social-btn">
							<AppleIcon></AppleIcon>
						</button>
					</div>
				</div>

				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<div className="p-10">
						<div className="flex  gap-4">
							<Customericon></Customericon>
							<p className="text-lg">
								Sign up as a{" "}
								<span className="primary-text">Customer?</span>{" "}
								<br />
								<Link
									className="primary-text font-bold"
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/register"
									}
								>
									Sign up Now
								</Link>
							</p>
						</div>
						<div className="divider"></div>
						<div className="flex  gap-4">
							<Shopericon></Shopericon>
							<p className="text-lg">
								Sign up as a{" "}
								<span className="primary-text">Shopper?</span>{" "}
								<br />
								<Link
									className="primary-text font-bold"
									to={
										import.meta.env.VITE_API_PUBLIC_URL +
										"/registershopper"
									}
								>
									Sign up Now
								</Link>
							</p>
						</div>
					</div>
				</Modal>
			</div>
			<div className="absolute bottom-10 text-center w-full"> <p className="text-center" >By Signing up you accept the <span className="primary-text">Terms of Service</span> and <br /> <span className="primary-text">Privacy Policy</span></p></div>
		</div>
	);
};

export default Login;
