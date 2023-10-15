import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import * as yup from "yup";
import { useAuth } from "../../context/auth";
import Modal from "../../components/Modal/Modal";
import { api } from "../../lib/api";

const Login = () => {
	const navigate = useNavigate();
	const { user, login, signed, loginError } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
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
		admin: "/login",
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
								<form
									onSubmit={handleSubmit(onSubmit)}
									id="authForm"
								>
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
									{loginError && (
										<div>
											<p className="text-error">
												{loginError}
											</p>
										</div>
									)}
									<div className="my-5">
										<p className="auth-form__info-text">{`You don't have any account?`}</p>
										<p
											onClick={handelOPenLoginMOdal}
											className="cursor-pointer font-bold text-green-600"
										>
											Sign up Now
										</p>
									</div>

									<Modal
										isOpen={isOpen}
										setIsOpen={setIsOpen}
									>
										<div className="auth-form__single-field space-mb--40 m-2 rounded-md border p-5">
											<p className="auth-form__info-text text-base">
												Sign up as a Customer? <br />
												<Link
													className="font-bold text-green-600"
													to={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/register"
													}
												>
													Sign up Now
												</Link>
											</p>
											<div className="divider"></div>
											<p className="auth-form__info-text text-base">
												Sign up as a Shopper? <br />
												<Link
													className="font-bold text-green-600"
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
									</Modal>

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
							<span className="auth-page-separator space-mt--20 space-mb--20 text-center">
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
