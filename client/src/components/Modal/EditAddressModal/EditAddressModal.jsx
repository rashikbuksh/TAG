import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { api } from "@lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@context/auth";
import GetLocation from "@helpers/GetLocation";

const EditAddressModal = ({ isOpen, setIsOpen, editItem }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { user } = useAuth();
	const { location, loading, error } = GetLocation();
	const onSubmit = (data) => {
		console.log(data);
		api.post(`/updateUserAddress`, {
			address_title: data.address_title,
			address: data.address,
			geo_location: location.lng + "_" + location.lat,
			phone_no: data.phone_no,
			id: editItem.id,
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					window.location.reload();
					setIsOpen(false);
				}
				// toast(response.data.message, response.status);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="w-full px-2">
				<h1 className="mb-4 text-center text-xl font-bold">
					Edit Address
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-between gap-2"
				>
					<div>
						<label htmlFor="name">Address Title</label>
						<input
							type="text"
							id="name"
							{...register("address_title", {
								required: "Customer ID is required",
							})}
							defaultValue={editItem?.address_title}
							placeholder="Home / Office / Others"
							className={`w-full rounded border p-2 ${
								errors.address_title ? "border-red-500" : ""
							}`}
						/>
						<p className="text-red-500">
							{errors.address_title &&
								errors.address_title.message}
						</p>
					</div>
					<div>
						<label htmlFor="address">Address</label> <br />
						<input
							type="text"
							{...register("address", {
								required: "Address is required",
							})}
							defaultValue={editItem?.address}
							required
							id="address"
							placeholder="Wari, Dhaka"
							className={`w-full rounded border p-2 ${
								errors.address ? "border-red-500" : ""
							}`}
						/>
						<p className="text-red-500">
							{errors.address && errors.address.message}
						</p>
					</div>

					<div>
						<label htmlFor="phone_no" className="">
							Contact Number
						</label>
						<br />
						<input
							type="text"
							id="phone_no"
							{...register("phone_no", {
								required: "Phone number is required",
							})}
							defaultValue={editItem?.phone_no}
							placeholder="01711****38"
							className={`w-full rounded border p-2 ${
								errors.phone_no ? "border-red-500" : ""
							}`}
						/>
						<p className="text-red-500">
							{errors.phone_no && errors.phone_no.message}
						</p>
					</div>
					<input
						type="submit"
						value="Edit"
						className="auth-btn mt-4"
					/>
				</form>
			</div>
		</Modal>
	);
};

export default EditAddressModal;
