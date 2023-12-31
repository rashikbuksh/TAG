import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import * as yup from "yup";
import Select from "react-select"; // Import the react-select component
import { api } from "../../lib/api";
import Axios from "axios";

const MakeModaratorModal = ({ isOpen, setIsOpen }) => {
	const [modaratorPassword, setModaratorPassword] = useState(null);
	const [modaratorEmail, setModaratorEmail] = useState(null);
	const registerSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		emailAddress: yup
			.string()
			.email("Please enter a valid email address")
			.required("Email address is required"),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		phone: yup
			.string()
			.required("Phone Number is required")
			.max(11, "Phone Number must be at most 11 characters"),
		refer_code: yup.string(),
		roles: yup.array().min(1, "Please select at least one role"), // Validation for the roles
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(registerSchema),
	});
	const { errors } = formState;

	const routeLinks = [
		{ value: "/admin/stat", label: "Stat" },
		{ value: "/allAdminProduct", label: "All Products" },
		{ value: "/tagShopkeeper", label: "Tag Shopkeepers" },
		{ value: "/tagUser", label: "Tag Users" },
		{ value: "/addcategory", label: "Add Category" },
		{ value: "/addproduct", label: "Add Product" },
		{ value: "/addheroslider", label: "Add SliderImage" },
		{ value: "/bestsellProduct", label: "Add Best Sell Product" },
		{ value: "/allnews", label: "All News" },
	];
	const onSubmit = (data) => {
		Axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
			name: data.name,
			email: data.emailAddress,
			phone: data.phone,
			password: data.password,
			access: "modarator",
		})
			.then((response) => {
				if (response.data.message === data.phone) {
					setModaratorEmail(data.email);
					setModaratorPassword(data.password);
                    setIsOpen(false)
					alert("Modarator Created Successful");
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
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className=" bg-color--gradient">
				<div className="auth-page-body">
					<div className="">
						<div className="row">
							<div className="col-12">
								<div className=" p-3">
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="auth-form__single-field space-mb--30">
											<label htmlFor="name">Name</label>
											<input
												type="text"
												name="name"
												id="name"
												placeholder="Enter Full name"
												{...register("name")}
											/>
											<p className="text-danger">
												{errors.name?.message}
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
											<label>Access</label>
											<Select
												isMulti
												options={routeLinks}
												{...register("roles")}
											/>
											<p className="text-danger">
												{errors.roles?.message}
											</p>
										</div>
										<button
											type="submit"
											className="auth-form__button"
										>
											Make Moderator
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{modaratorEmail && modaratorPassword && (
				<p>
					Your Created Email and password is {modaratorEmail},
					{modaratorPassword}
				</p>
			)}
		</Modal>
	);
};

export default MakeModaratorModal;
