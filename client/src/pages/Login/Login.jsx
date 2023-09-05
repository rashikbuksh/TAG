import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useAuth } from "../../context/auth";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const { user, login, signed } = useAuth();
	console.log("user", user);
	console.log("signed", signed);
	console.log("Login", Login);
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
		admin: "/user",
	};

	useEffect(() => {
		if (signed) {
			navigate(NAVIGATE_TO[user?.access]);
		}
	}, [signed, user, navigate]);

	const onSubmit = async (data) => {
		await login(data);
		// Axios.post(
		// 	`${import.meta.env.VITE_APP_API_URL}/auth/verify_login`,{
		// 		data
		// 	}
		// ).then((response) => {
		// 	if (response.data[0]?.id === undefined) {
		// 		alert("Invalid Credentials");
		// 		window.location.href = "/login";
		// 	} else {
		// 		localStorage.setItem("user-id", response.data[0]?.id);
		// 		if (response.data[0]?.access === "shopper") {
		// 			window.location.href = "/shopkeeperDashboard";
		// 		} else {
		// 			window.location.href = "/home";
		// 		}
		// 	}
		// });
	};

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			{/* auth page header */}
			<div className="auth-page-header space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">
								Welcome Back
							</h3>
							<p className="auth-page-header__text">
								Log in for best shopping
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* auth page body */}
			<div className="auth-page-body">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* Auth form */}
							<div className="auth-form">
								<form onSubmit={handleSubmit(onSubmit)} id="authForm">
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="email">
											Email Address
										</label>
										<input
											type="text"
											id="email"
											className="w-full rounded-sm border-none border-transparent pl-2 outline-none focus:border-transparent focus:ring-0"
											name="email"
											{...register("email")}
										/>
										<p className="text-danger">
											{errors.email?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="password">
											Password
										</label>
										<input
											type="password"
											id="password"
											className="w-full rounded-sm border-none border-transparent pl-2 outline-none focus:border-transparent focus:ring-0"
											name="password"
											{...register("password")}
										/>
										<p className="text-danger">
											{errors.password?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--40">
										<p className="auth-form__info-text">
											Sign up as a Customer?{" "}
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/register"
												}
											>
												Sign up Now
											</Link>
										</p>
										<p className="auth-form__info-text">
											Sign up as a Shopper?{" "}
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/registershopper"
												}
											>
												Sign up Now
											</Link>
										</p>
									</div>
									<button
										type="submit"
										className="auth-form__button"
										form="authForm"
									>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* auth page footer */}
			<div className="auth-page-footer">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<span className="auth-page-separator text-center space-mt--20 space-mb--20">
								- OR -
							</span>
							<div className="auth-page-social-login">
								<button>
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/facebook.svg"
										}
									/>
									Sign In with Facebook
								</button>
								<button>
									<ReactSVG
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											"/assets/img/icons/google.svg"
										}
									/>
									Sign In with Google
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
