import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Breadcrumb } from "../../components";
import { api } from "../../lib/api";
import { useAuth } from "../../context/auth";

const EditProfile = () => {
	const id = localStorage.getItem("user-id");
	const [userinfo, setUserInfo] = useState([]);
	const [isFormDirty, setIsFormDirty] = useState(false);
	useEffect(() => {
		const id = localStorage.getItem("user-id");

		if (!id) {
			// Redirect the user to the login page if user ID is not available
			window.location.href = "/login";
		}
	}, []);

	const editProfileSchema = yup.object().shape({
		name: yup.string(),
		shipping_address: yup.string(),
		address: yup.string(),
	});

	const { register, handleSubmit, formState, setValue, getValues } = useForm({
		resolver: yupResolver(editProfileSchema),
	});

	const { errors } = formState;

	useEffect(() => {
		api.get(`/auth/getUserAllInfo/${id}`)
			.then((res) => {
				setUserInfo(res.data[0]);
				setValue("name", res.data[0].name);
				setValue("shipping_address", res.data[0].shipping_address);
				setValue("address", res.data[0].address);
			})
			.catch((err) => {
				console.log(err.message, "err.message");
			});
	}, [id, setValue]);

	const handleFormChange = () => {
		setIsFormDirty(true);
	};

	const onSubmit = async (data) => {
		console.log(data);

		if (isFormDirty) {
			api.post(`/profile/edit_profile/${id}`, {
				name: data.name,
				shipping_address: data.shipping_address,
				address: data.address,
			}).then((response) => {
				if (response.data.message === id + " updated successfully") {
					alert("Profile Updated Successfully");
					window.location.href = "/profile";
				}
			});
		}
	};

	// const getUserLocation = () => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(showPosition);
	// 	} else {
	// 		alert("Geolocation is not supported by this browser.");
	// 	}
	// };

	const showPosition = (position) => {
		setValue(
			"shipping_address",
			`${position.coords.latitude}__${position.coords.longitude}`
		);
		handleFormChange();
	};
	const { user } = useAuth();
	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Edit Profile" prevUrl="/home" />
			<div className="edit-profile-body space-mt--30">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="edit-profile-form">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="name">Full Name</label>
										<input
											type="text"
											name="name"
											id="name"
											placeholder="Enter Full Name"
											defaultValue={userinfo.name}
											{...register("name")}
											onChange={handleFormChange}
											disabled={user.access == "shopper"}
										/>
										<p>{errors.name?.message}</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="shipping_address">
											Shipping Address
										</label>
										<input
											name="shipping_address"
											id="shipping_address"
											type="text"
											placeholder="Enter Shipping Address"
											defaultValue={
												userinfo.shipping_address
											}
											{...register("shipping_address")}
											onChange={handleFormChange}
											disabled
										/>
										<p>
											{errors.shipping_address?.message}
										</p>
									</div>
									<div className="edit-profile-form__single-field space-mb--30">
										<label htmlFor="shipping_address">
											Address
										</label>
										<input
											name="shipping_address"
											id="address"
											type="text"
											placeholder="Enter Address"
											defaultValue={
												userinfo.address
											}
											{...register("address")}
											onChange={handleFormChange}
											
										/>
										<p>
											{errors.shipping_address?.message}
										</p>
									</div>
									<button
										type="submit"
										className="btn btn-primary btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg"
										disabled={!isFormDirty}
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
