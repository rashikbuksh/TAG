import { AppleIcon, FacebookIcon, GoogleIcon } from "@SvgHub/SocialIcon";
import { Customericon, Shopericon, TagLogo2 } from "@SvgHub/TagLogo2";
import Modal from "@components/Modal/Modal";
import { useAuth } from "@context/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
	const navigate = useNavigate();
	const { user, login, signed, loginError } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const loginSchema = yup.object().shape({
		emailOrPhone: yup
			.string()
			.test("emailOrPhone", "Invalid email or phone number", (value) => {
				if (!value) return false; // Return false if the field is empty

				// Check if the value matches the email format
				const isValidEmail = yup.string().email().isValidSync(value);

				// Check if the value matches the phone number format (adjust the phone number validation regex as needed)
				const isValidPhone = /^\+?[0-9]{8,}$/.test(value); // Example: Allows numbers with optional '+' prefix and at least 8 digits

				return isValidEmail || isValidPhone;
			})
			.required("Email address or phone number is required"),
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
		<div className="relative ">
			<Helmet>
				<title>Login | TAG Think and Get</title>
				<meta
					name="description"
					content="Provide a concise and compelling description of your login page here."
				/>
				{/* Meta tags for social sharing */}
				<meta property="og:title" content="Login | TAG Think and Get" />
				<meta
					property="og:description"
					content="Welcome! For top-notch service, kindly log in..."
				/>
				<meta
					property="og:url"
					content="https://tagthinkandget.com/login"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Tag Think and Get" />
				{/* Twitter Card meta tags */}
				<meta
					name="twitter:card"
					content="Discover the simplicity of online grocery shopping on our platform! Easily order from your nearby store and choose between pickup or home delivery. Enjoy the convenience of ordering from two different shops at once with our Dual Shop Delight feature. Keep an eye out for special deals from our amazing shopkeepers, making your shopping experience even more rewarding. Experience easy and joyful shopping with us!"
				/>
				<meta
					name="twitter:title"
					content="Login | TAG Think and Get"
				/>
				<meta
					name="twitter:description"
					content="Welcome! For top-notch service, kindly log in..."
				/>
				<meta
					name="twitter:image"
					content="https://tagthinkandget.com/assets/img/Tag-logo-blue-get_100_100.png"
				/>
				{/* Canonical URL */}
				<link rel="canonical" href="https://tagthinkandget.com/login" />
				{/* Additional meta tags for SEO */}
				<meta name="robots" content="index, follow" />
				<meta name="author" content="TAG Think and Get" />
				<meta name="referrer" content="origin" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="theme-color" content="#ffffff" />
			</Helmet>
			<div className=" mx-auto flex flex-col justify-around px-[25px] lg:w-[50%]  ">
				<div className="mx-auto my-5 h-[80px] ">
					<Link to="/home">
						<TagLogo2></TagLogo2>
					</Link>
				</div>

				<div className="mt-4 flex-grow">
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
								Email / Phone
							</label>
							<input
								type="text"
								id="email"
								className="auth-input"
								name="emailOrPhone"
								placeholder="Enter Email / Phone Number"
								{...register("emailOrPhone")}
							/>
							<p className="text-danger px-4">
								{errors.emailOrPhone?.message}
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
							<div className="pl-6">
								<a className="text-[#2F5BA9] link font-semibold leading-8">
									Forgot Password?
								</a>
							</div>
						</div>
						{/* Text are hidden {Error component} */}
						{loginError && (
							<div>
								<p className="hidden text-center text-xl text-error">
									{loginError}
								</p>
							</div>
						)}

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
					<span className="divider mt-2">- OR - </span>
					<div className="mt-2 flex items-center justify-between ">
						<div className=" mb-3 flex w-full cursor-pointer items-center justify-center rounded-full bg-[#2F5BA9] px-7 py-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white  gap-2">
							<span>
								<FcGoogle size={24} />
							</span>
							<p>Continue with Google</p>
						</div>
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

				<div className=" my-10  w-full text-center">
					{" "}
					<p className="text-center">
						By Signing up you accept the{" "}
						<span className="primary-text">Terms of Service</span>{" "}
						and <br />{" "}
						<Link to={"/policy"}>
							<span className="primary-text">Privacy Policy</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
