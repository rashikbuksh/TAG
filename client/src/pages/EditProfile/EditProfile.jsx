import { Breadcrumb } from "@components";
import { useAuth } from "@context/auth";
import GetLocation from "@helpers/GetLocation";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const EditProfile = () => {
	const id = localStorage.getItem("user-id");
	const [userData, setUserData] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [name, setName] = useState("");
	const [shippingAddress, setShippingAddress] = useState("");
	const [address, setAddress] = useState("");
	const { location } = GetLocation();

	useEffect(() => {
		if (id) {
			api.get(`/auth/getUserInfo/${id}`)
				.then((res) => {
					const userData = res.data[0];
					setUserData(userData);
					setName(userData.name);
					setShippingAddress(userData.shipping_address);
					setAddress(userData.address);
				})
				.catch((err) => {
					console.error(err.message);
				});
		}
	}, [id]);

	const handleActiveEdit = () => {
		setIsEdit(true);
	};

	const handleNewDataSubmit = async () => {
		// console.log("clicked");
		if (isEdit) {
			try {
				const response = await api.post(`/profile/edit_profile/${id}`, {
					name: name,
					shipping_address: shippingAddress,
					address: address,
				});
				if (response.data.message === id + " updated successfully") {
					toast.success("Profile Updated Successfully");
					setIsEdit(false);
					window.location.href = "/profile";
				}
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	const { user } = useAuth();

	const handleAddLocation = (currentLocation) => {
		const newShippingAddress = `${currentLocation.lat}__${currentLocation.lng}`;
		setShippingAddress(newShippingAddress);
	};

	return (
		<div className="body-wrapper bg-color--gradient">
			<Breadcrumb pageTitle="Edit Profile" prevUrl="/home" />
			<div className="edit-profile-body space-mt--30">
				<div className="edit-profile-form mx-auto lg:w-[50%]">
					<div className="edit-profile-form__single-field space-mb--30">
						<label htmlFor="name">Full Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter Full Name"
							disabled={!isEdit || user.access === "shopper"}
							className="form-control"
						/>
					</div>
					<div className="edit-profile-form__single-field space-mb--30">
						<label htmlFor="shipping_address">
							Shipping Address
						</label>
						<div className="input-group">
							<input
								name="shipping_address"
								id="shipping_address"
								type="text"
								value={shippingAddress}
								onChange={(e) =>
									setShippingAddress(e.target.value)
								}
								placeholder="Enter Shipping Address"
								disabled={!isEdit || user.access === "shopper"}
								className="form-control"
							/>
							<div className="input-group-append">
								<button
									type="button"
									className="btn btn-secondary"
									disabled={
										!isEdit || user.access === "shopper"
									}
									onClick={() => handleAddLocation(location)}
								>
									Add Location
								</button>
							</div>
						</div>
					</div>
					<div className="edit-profile-form__single-field space-mb--30">
						<label htmlFor="address">Address</label>
						<input
							name="address"
							id="address"
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Enter Address"
							readOnly={!isEdit}
							className="form-control"
						/>
					</div>
					{isEdit ? (
						<button
							onClick={handleNewDataSubmit}
							type="button"
							className="auth-btn"
						>
							Update
						</button>
					) : (
						<button
							type="button"
							className="auth-btn"
							onClick={handleActiveEdit}
						>
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
