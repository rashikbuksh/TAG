import Modal from "../Modal";

const EditAddressModal = ({
	isOpen,
	setIsOpen,
	editItem,
	handleSubmit,
	setEditItem,
	setEdit,
}) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className=" w-full px-2 ">
				<h1 className="mb-4 text-center text-xl  font-bold">
					Edit Address
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
							value={editItem?.place}
							onChange={(e) =>
								setEditItem({
									...editItem,
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
							value={editItem?.address}
							onChange={(e) =>
								setEditItem({
									...editItem,
									address: e.target.value,
								})
							}
							required
							id="place"
							placeholder="Wari,Dhaka"
							className="w-full rounded border p-2"
						/>
					</div>

					<div>
						<label htmlFor="contact" className="">
							Contact Number
						</label>
						<br />
						<input
							type="text"
							id="contact"
							value={editItem?.contact}
							onChange={(e) =>
								setEditItem({
									...editItem,
									contact: e.target.value,
								})
							}
							placeholder="01711****38"
							className="w-full rounded border p-2"
						/>
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
