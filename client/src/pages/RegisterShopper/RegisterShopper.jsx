import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import * as yup from "yup";
import { api } from "../../lib/api";

const Register = () => {
	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	const [address, setAddress] = React.useState("");

	const showPosition = (position) => {
		setAddress(position.coords.latitude + "__" + position.coords.longitude);
		getValues("shipping_address");
		setValue(
			"shipping_address",
			position.coords.latitude + "__" + position.coords.longitude
		);
	};
	const registerSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		phone: yup.string().required("Phone Number is required").max(11),
		emailAddress: yup
			.string()
			.email("Please enter valid email address")
			.required("Email address is required"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		shipping_address: yup.string(),
	});

	const { register, handleSubmit, formState, setValue, getValues } = useForm({
		resolver: yupResolver(registerSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		// console.log(data);
		api.post(`/auth/registershopper`, {
			name: data.name,
			phone: data.phone,
			email: data.emailAddress,
			password: data.password,
			access: "shopper",
			shipping_address: data.shipping_address,
		})
			.then((response) => {
				// console.log(response.data.message); // Log the entire response for debugging
				if (
					response.data.message ===
					data.name + " added successfully"
				) {
					alert("Registration Successful");
					window.location.href = "/login";
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

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			{/* auth page header */}
			<div className="auth-page-header space-mb--50">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h3 className="auth-page-header__title">Welcome</h3>
							<p className="auth-page-header__text">
								Don't have account? <br /> Please sign up for
								creating a new account.
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
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="name">Shop Name</label>
										<input
											type="text"
											name="name"
											id="name"
											placeholder="Enter Shop name"
											{...register("name")}
										/>
										<p className="text-danger">
											{errors.name?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="phone">
											Phone Number
										</label>
										<input
											type="text"
											name="phone"
											id="phone"
											placeholder="Enter Phone Number"
											{...register("phone")}
										/>
										<p className="text-danger">
											{errors.phone?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="emailAddress">
											Email Address
										</label>
										<input
											type="text"
											name="emailAddress"
											id="emailAddress"
											placeholder="Enter Email Address"
											{...register("emailAddress")}
										/>
										<p className="text-danger">
											{errors.emailAddress?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="password">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="Enter Password"
											{...register("password")}
										/>
										<p className="text-danger">
											{errors.password?.message}
										</p>
									</div>
									<div className="auth-form__single-field space-mb--30">
										<label htmlFor="name">
											Shop Location
										</label>
										<input
											type="text"
											name="shipping_address"
											id="shipping_address"
											placeholder="Enter your Shop Location"
											{...register("shipping_address")}
										/>
										<p className="text-danger">
											{errors.shipping_address?.message}
										</p>
										<button
											type="button"
											onClick={getUserLocation}
										>
											Get Location
										</button>
									</div>
									<div className="auth-form__single-field space-mb--40">
										<p className="auth-form__info-text">
											Already have an account?{" "}
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/login"
												}
											>
												Sign in Now
											</Link>
										</p>
									</div>
									<button
										type="submit"
										className="auth-form__button"
									>
										Sign Up
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

export default Register;
