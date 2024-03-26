import { TagLogo2 } from "@SvgHub/TagLogo2";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			toast("Geolocation is not supported by this browser.");
		}
	};

	const showPosition = (position) => {
		getValues("shipping_address");
		setValue(
			"shipping_address",
			position.coords.latitude + "__" + position.coords.longitude
		);
	};
	const registerSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		phone: yup
			.string()
			.matches(/^[0-9]+$/, "Phone number must contain only digits")
			.max(11, "Phone number must be at most 11 characters")
			.required("Phone number is required"),
		emailAddress: yup.string().email("Please enter a valid email address"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		shipping_address: yup.string().required("Shipping Address is required"),
	});

	const { register, handleSubmit, formState, setValue, getValues } = useForm({
		resolver: yupResolver(registerSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		api.post(`/auth/registershopper`, {
			name: data.name,
			phone: data.phone,
			email: data.emailAddress,
			password: data.password,
			access: "new_shopper",
			shipping_address: data.shipping_address,
		})
			.then((response) => {
				if (
					response.data.message ===
					data.name + " added successfully"
				) {
					toast("Registration Successful");
					window.location.href = "/waitForVerify";
				}
			})
			.catch((error) => {
				if (
					error.response.data.message == "Error executing the query"
				) {
					toast("Email or Phone Number already exists");
				}
			});
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	useEffect(() => {
		getUserLocation();
	}, []);
	return (
		<div className=" relative">
			{/* auth page header */}
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
						<div className="">
							<label
								htmlFor="name"
								className="mb-1 px-4 text-base font-semibold "
							>
								Shop Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="auth-input"
								placeholder="Enter Shop name"
								{...register("name")}
							/>
							<p className="text-danger px-4">
								{errors.name?.message}
							</p>
						</div>
						<div className="auth-form__single-field space-mb--30">
							<label
								htmlFor="phone"
								className="mb-1 px-4 text-base font-semibold "
							>
								Phone Number
							</label>
							<input
								type="text"
								name="phone"
								id="phone"
								className="auth-input"
								placeholder="Enter Phone Number"
								{...register("phone")}
							/>
							<p className="text-danger px-4">
								{errors.phone?.message}
							</p>
						</div>
						<div className="auth-form__single-field space-mb--30">
							<label
								htmlFor="emailAddress"
								className="mb-1 flex justify-between px-4 text-base font-semibold"
							>
								<span>Email </span>{" "}
								<span className="text-xs">Optional</span>
							</label>
							<input
								type="text"
								name="emailAddress"
								id="emailAddress"
								className="auth-input"
								placeholder="Enter Email Address"
								{...register("emailAddress")}
							/>
							<p className="text-danger px-4">
								{errors.emailAddress?.message}
							</p>
						</div>
						<div className="relative">
							<label
								htmlFor="password"
								className="mb-1 px-4 text-base font-semibold "
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
								className="absolute right-4 top-11 cursor-pointer text-blue-500"
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
						<div className="relative">
							<label
								htmlFor="name"
								className="mb-1 px-4 text-base font-semibold "
							>
								Shop Location
							</label>
							<input
								type="text"
								name="shipping_address"
								id="shipping_address"
								className="auth-input"
								placeholder="Enter your Shop Location"
								{...register("shipping_address")}
							/>
							<p className="text-danger px-4">
								{errors.shipping_address?.message}
							</p>
							<button
								className="absolute right-4 top-11 cursor-pointer text-blue-500"
								type="button"
								onClick={getUserLocation}
							>
								<FaLocationDot className="text-xl"></FaLocationDot>
							</button>
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
						<Link to={'/policy'}>
							<span className="primary-text">Privacy Policy</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
