import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@lib/api";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Modal from "../Modal";

const EditLocation = (props) => {
	const editLocation = yup.object({
		shipping_address: yup.string().required("Location is required"),
	});
	const form = useForm({
		defaultValues: {
			shipping_address: "",
		},
		resolver: yupResolver(editLocation),
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		api.post(`/auth/edit-location`, {
			shipping_address: data.shipping_address,
			id: props?.id,
		}).then((response) => {
			console.log(response.data.status);
			if (response.data.status === 200) {
				toast("Location Updated Successful");
			}
		});
		props.setIsOpen(false);
	};

	return (
		<Modal
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			title={"Edit Location"}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<input
							{...register("shipping_address")}
							type="text"
							name="shipping_address"
							id="shipping_address"
							placeholder="Enter Location"
							className="input-box"
							defaultValue={props.shipping_address}
						/>
						<p className="text-danger">
							{errors.shipping_address?.message}
						</p>
					</div>
					<button className="auth-form__button">Save Changes</button>
				</div>
			</form>
		</Modal>
	);
};

export default EditLocation;
