import { useState } from "react";

import { GoPlusCircle } from "react-icons/go";
import AddNewAddressModal from "@components/Modal/AddAddressModal/AddNewAddressModal";
import EditAddressModal from "@components/Modal/EditAddressModal/EditAddressModal";
import AddressSection from "./AddressSection";
import Swal from "sweetalert2";
import { api } from "@lib/api";
import { toast } from "react-toastify";
const DeliveryAddress = ({
	addressArr,
	setSelectedAddress,
	selectedAddress,
	shopperAccess,
	customers_address_summary,
	setCustomers_address_summary,
}) => {
	const [edit, setEdit] = useState(false);
	const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useState(false);
	const [editItem, setEditItem] = useState({});

	//Edit address //set edit address in a state   (lifted state)
	const handleEditAddress = (id) => {
		const item = addressArr.find((item) => item.id == id);
		setEdit(!edit);
		setEditItem(item);
	};
	const handelDeleteAddress = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				api.delete(`/remove/customers_address_details/${id}`)
					.then((res) => {
						Swal.fire({
							title: "Deleted!",
							text: "News Deleted Successfully.",
							icon: "success",
						});
						window.location.reload();
					})
					.catch((error) => {
						toast(error);
					});
			}
		});
	};

	//Add new address
	const handleAddNewAddress = () => {
		if (addressArr.length < 3) {
			setIsAddNewAddressOpen(!isAddNewAddressOpen);
		} else {
			return;
		}
	};

	return (
		<>
			<AddNewAddressModal
				isOpen={isAddNewAddressOpen}
				setIsOpen={setIsAddNewAddressOpen}
				addressArr={addressArr}
			></AddNewAddressModal>
			<EditAddressModal
				isOpen={edit}
				setIsOpen={setEdit}
				editItem={editItem}
			></EditAddressModal>
			<div className="flex h-fit flex-col gap-2">
				{/* Address bar mapping */}
				{addressArr &&
					addressArr.map((item) => (
						<AddressSection
							key={item.id}
							handleEditAddress={handleEditAddress}
							item={item}
							handelDeleteAddress={handelDeleteAddress}
							selectedAddress={selectedAddress}
							setSelectedAddress={setSelectedAddress}
							shopperAccess={shopperAccess}
							customers_address_summary={
								customers_address_summary
							}
							setCustomers_address_summary={
								setCustomers_address_summary
							}
						></AddressSection>
					))}

				{/* Add New Address button  */}
				<button
					onClick={handleAddNewAddress}
					disabled={shopperAccess === "shopper"}
					className="mt-2 flex h-20 cursor-pointer items-center justify-center gap-2 rounded border border-dotted p-2 text-xl font-bold shadow-md hover:text-primary"
				>
					<span>Add</span>
					<GoPlusCircle />
				</button>
			</div>
		</>
	);
};

export default DeliveryAddress;
