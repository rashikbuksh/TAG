import { useAuth } from "@context/auth";
import GetLocation from "@helpers/GetLocation";
import { api } from "@lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../Modal";

const AddNewAddressModal = ({
	isOpen,
	setIsOpen,
	// addressArr
	// setAddress: setNewAddress,
}) => {
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const { location, loading, error } = GetLocation();

	const onSubmit = async (data) => {
		try {
			const response = await api.post(`/add/customerAddress`, {
				customer_id: user.id, // Assuming customer_id is user.id
				address_title: data.address_title,
				address: data.address,
				geo_location: location.lng + "_" + location.lat, // Use the obtained geoLocation
				phone_no: data.phone_no,
			});
			if (response.status === 201) {
				toast(response.data.message);
				window.location.reload();
			}
		} catch (error) {
			toast.error(error.message);
		}
		setIsOpen(false);
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="w-full px-2">
				<h1 className="mb-4 text-center text-xl font-bold">
					Add New Address
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
								required: "Address Title is required",
							})}
							placeholder="Home / Office / Others"
							className={`w-full rounded border p-2 ${
								errors.address_title ? "border-red-500" : ""
							}`}
						/>
						<p className="text-red-500">
							{errors.address_title && errors.address.message}
						</p>
					</div>
					<div>
						<label htmlFor="place">Address</label> <br />
						<input
							type="text"
							{...register("address", {
								required: "Address is required",
							})}
							placeholder="Block 5, House #2, Halishahar, Chattogram"
							className={`w-full rounded border p-2 ${
								errors.address ? "border-red-500" : ""
							}`}
						/>
						<p className="text-red-500">
							{errors.address && errors.address.message}
						</p>
					</div>

					<div>
						<label htmlFor="contact" className="">
							Contact Number
						</label>
						<br />
						<input
							type="text"
							{...register("phone_no", {
								required: "Contact number is required",
							})}
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
						value="Add"
						className="auth-btn mt-4"
					/>
				</form>
			</div>
		</Modal>
	);
};

export default AddNewAddressModal;
