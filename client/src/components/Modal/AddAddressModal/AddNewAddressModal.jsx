import { useState } from "react";
import Modal from "../Modal";

// eslint-disable-next-line react/prop-types
const AddNewAddressModal = ({
	isOpen,
	setIsOpen,
	setAddress: setNewAddress,
}) => {
	const [address, setAddress] = useState({
		place: "",
		default: false,
		address: "",
		contact: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setNewAddress(address);
	};

	


	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className=" w-full px-2 ">
				<h1 className="mb-4 text-center text-xl  font-bold">
					Add New Address
				</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-between gap-2 "
				>
					<div>
						<label htmlFor="name">Place Name</label>
						<input
							type="text"
							id="name"
							
							value={address.place}
							onChange={(e) =>
								setAddress({
									...address,
									place: e.target.value,
								})
							}
							placeholder="Home / Office / Others"
							className="w-full rounded border p-2"
							required
						/>
					</div>
					<div>
						<label htmlFor="place">Address</label> <br />
						<input
							type="text"
							value={address.address}
							onChange={(e) =>
								setAddress({
									...address,
									address: e.target.value,
								})
							}
							required
							id="place"
							placeholder="Block 5, House #2,Halishahar ,Chattogram "
							className="w-full rounded border p-2"
						/>
					</div>

					<div>
						<label htmlFor="contact" className="">
							Contact Number
						</label>
						<br />
						<input
							type="number"
							value={address.contact}
							onChange={(e) =>
								setAddress({
									...address,
									contact: e.target.value,
								})
							}
							id="contact"
							placeholder="01711****38"
							className="w-full rounded border p-2"
						/>
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
