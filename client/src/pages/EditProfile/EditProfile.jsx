import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Breadcrumb } from "../../components";

const EditProfile = () => {
	const id = localStorage.getItem("user-id");

	if (id === undefined || id === null) {
		window.location.href = "/login";
	}

	const editProfileSchema = yup.object().shape({
		name: yup.string().required("Full Name is required"),
		user_name: yup.string().required("User Name is required"),
		phone: yup.string().required("Phone Number is required"),
		emailAddress: yup.string().email("Please enter valid email address"),
		shipping_address: yup.string().required("Shipping Address is required"),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(editProfileSchema),
	});

	const { errors } = formState;

	const onSubmit = async (data) => {
		Axios.post(
			`${import.meta.env.VITE_APP_API_URL}/profile/edit_profile/${id}`,
			{
				name: data.name,
				user_name: data.user_name,
				phone: data.phone,
				shipping_address: data.shipping_address,
			}
		).then((response) => {
			console.log(response.data);
			if (response.data.message == id + " updated successfully") {
				alert("Profile Updated Successfully");
				window.location.href = "/home";
			}
		});
	};

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Edit Profile" prevUrl="/home" />
			<div className="edit-profile-body space-mt--30">
				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* edit profile form */}
							<div className="edit-profile-form">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="name">Full Name</label>
										<input
											type="text"
											name="name"
											id="name"
											placeholder="Enter Full Name"
											{...register("name")}
										/>
										<p>{errors.name?.message}</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="user_name">
											User Name
										</label>
										<input
											type="text"
											name="user_name"
											id="user_name"
											placeholder="Enter User Name"
											{...register("user_name")}
										/>
										<p>{errors.user_name?.message}</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="phone">Phone</label>
										<input
											type="text"
											name="phone"
											id="phone"
											placeholder="Enter Phone Number"
											{...register("phone")}
										/>
										<p>{errors.phone?.message}</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="emailAddress">
											Email Address
										</label>
										<input
											type="text"
											name="emailAddress"
											id="emailAddress"
											placeholder="Enter Email Address"
											{...register("emailAddress")}
											disabled
										/>
										<p>{errors.emailAddress?.message}</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="shipping_address">
											Shipping Address
										</label>
										<textarea
											name="shipping_address"
											id="shipping_address"
											cols={30}
											rows={5}
											placeholder="Enter Shipping Address"
											defaultValue={""}
											{...register("shipping_address")}
										/>
										<p>
											{errors.shipping_address?.message}
										</p>
									</div>
									<button
										type="submit"
										className="edit-profile-form__button"
									>
										Update
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
