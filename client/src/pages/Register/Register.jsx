import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { get, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import * as yup from "yup";
import { api } from "../../lib/api";
import { TagLogo2 } from "../../SvgHub/TagLogo2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [showPassword, setShowPassword] = useState(false);
	// console.log(id);
	const registerSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		emailAddress: yup
			.string()
			.email("Please enter valid email address")
			.required("Email address is required"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		phone: yup.string().required("Phone Number is required").max(11),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(registerSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		// console.log(data);

		Axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
			name: data.name,
			email: data.emailAddress,
			phone: data.phone,
			password: data.password,
			access: "customer",
		})
			.then((response) => {
				// console.log(response);
				if (response.data.message === data.phone) {
					navigate("/login");
					if (id) {
						localStorage.setItem("ref_c", id);
					}

					alert("Registration Successful");
				}
			})
			.catch((error) => {
				if (
					error.response.data.message == "Error executing the query"
				) {
					alert("Email or Phone Number already exists");
				}
			});
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	return (
		// <div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
		// 	{/* auth page header */}
		// 	<div className="auth-page-header space-mb--50">
		// 		<div className="container">
		// 			<div className="row">
		// 				<div className="col-12">
		// 					<h3 className="auth-page-header__title">Welcome</h3>
		// 					<p className="auth-page-header__text">
		// 						Don't have account? <br /> Please sign up for
		// 						creating a new account.
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	{/* auth page body */}
		// 	<div className="auth-page-body">
		// 		<div className="container">
		// 			<div className="row">
		// 				<div className="col-12">
		// 					{/* Auth form */}
		// 					<div className="auth-form">
		// 						<form onSubmit={handleSubmit(onSubmit)}>
		// 							<div className=" ">
		// 								<label htmlFor="name">Name</label>
		// 								<input
		// 									type="text"
		// 									name="name"
		// 									id="name"
		// 									placeholder="Enter Full name"
		// 									{...register("name")}
		// 								/>
		// 								<p className="text-danger">
		// 									{errors.name?.message}
		// 								</p>
		// 							</div>
		// 							<div className=" ">
		// 								<label htmlFor="emailAddress">
		// 									Email Address
		// 								</label>
		// 								<input
		// 									type="text"
		// 									name="emailAddress"
		// 									id="emailAddress"
		// 									placeholder="Enter Email Address"
		// 									{...register("emailAddress")}
		// 								/>
		// 								<p className="text-danger">
		// 									{errors.emailAddress?.message}
		// 								</p>
		// 							</div>
		// 							<div className=" ">
		// 								<label htmlFor="phone">
		// 									Phone Number
		// 								</label>
		// 								<input
		// 									type="text"
		// 									name="phone"
		// 									id="phone"
		// 									placeholder="Enter Phone Number"
		// 									{...register("phone")}
		// 								/>
		// 								<p className="text-danger">
		// 									{errors.phone?.message}
		// 								</p>
		// 							</div>
		// 							<div className=" ">
		// 								<label htmlFor="password">
		// 									Password
		// 								</label>
		// 								<input
		// 									type="password"
		// 									name="password"
		// 									id="password"
		// 									placeholder="Enter Password"
		// 									{...register("password")}
		// 								/>
		// 								<p className="text-danger">
		// 									{errors.password?.message}
		// 								</p>
		// 							</div>
		// 							<div className="auth-form__single-field space-mb--40">
		// 								<p className="auth-form__info-text">
		// 									Already have an account?{" "}
		// 									<Link
		// 										to={
		// 											import.meta.env
		// 												.VITE_API_PUBLIC_URL +
		// 											"/login"
		// 										}
		// 									>
		// 										Sign in Now
		// 									</Link>
		// 								</p>
		// 							</div>
		// 							<button
		// 								type="submit"
		// 								className="auth-form__button"
		// 							>
		// 								Sign Up
		// 							</button>
		// 						</form>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	{/* auth page footer */}
		// 	<div className="auth-page-footer">
		// 		<div className="container">
		// 			<div className="row">
		// 				<div className="col-12">
		// 					<span className="auth-page-separator space-mt--20 space-mb--20 text-center">
		// 						- OR -
		// 					</span>
		// 					<div className="auth-page-social-login">
		// 						<button>
		// 							<ReactSVG
		// 								src={
		// 									import.meta.env
		// 										.VITE_API_PUBLIC_URL +
		// 									"/assets/img/icons/facebook.svg"
		// 								}
		// 							/>
		// 							Sign In with Facebook
		// 						</button>
		// 						<button>
		// 							<ReactSVG
		// 								src={
		// 									import.meta.env
		// 										.VITE_API_PUBLIC_URL +
		// 									"/assets/img/icons/google.svg"
		// 								}
		// 							/>
		// 							Sign In with Google
		// 						</button>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="mx-auto flex flex-col justify-around px-[25px] lg:w-[50%] ">
			<div className="mx-auto my-5 h-[80px]">
				<TagLogo2></TagLogo2>
			</div>
			<div className="mb-4 w-full text-center ">
				<p className="text-2xl font-bold">Create A New Account</p>
			</div>
			<div className="">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className=" ">
						<label
							htmlFor="name"
							className="mb-1 px-4 text-xl font-semibold"
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
						<p className="text-danger">{errors.name?.message}</p>
					</div>
					<div className=" ">
						<label
							htmlFor="emailAddress"
							className="mb-1 px-4 text-xl font-semibold"
						>
							Email Address
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
							className="mb-1 px-4 text-xl font-semibold"
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
						<p className="text-danger">{errors.phone?.message}</p>
					</div>
					<div className="relative ">
						<label
							htmlFor="password"
							className="mb-1 px-4 text-xl font-semibold"
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
								<FaEyeSlash className="text-2xl text-black " ></FaEyeSlash>
							) : (
								<FaEye className="text-2xl text-black "></FaEye>
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
				<div className="my-5 text-center">
					<p
						className="cursor-pointer "
						style={{ color: "var(--greyscale-500, #9E9E9E)" }}
					>
						Already have an account?{" "}
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + "/login"}
						>
							<span className="primary-text">Sign in Now</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
