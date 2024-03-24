import { useState } from "react";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";

import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import AddNewAddressModal from "@components/Modal/AddAddressModal/AddNewAddressModal";
import EditAddressModal from "@components/Modal/EditAddressModal/EditAddressModal";
const DeliveryAddress = () => {
	const [edit, setEdit] = useState(false);
	const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useState(false);
	const [editItem, setEditItem] = useState({});

	//Make a dummy address array ........ Which fill up from backend
	const addressArr = [
		{
			id: 1,
			place: "Home",
			default: true,
			address: "4140 Parker Rd. Allentown,New Mexico",
			contact: "+880 01518****24",
		},
		{
			id: 2,
			place: "Office",
			default: false,
			address: "Dhaka wari. Allentown,New Mexico",
			contact: "+880 01678****24",
		},
	];
	const [allAddress, setAllAddress] = useState(addressArr);

	//Change default address
	const handleDefault = (id) => {
		//set all default value false
		const allDefaultFalseArr = allAddress.map((item) => {
			return { ...item, default: false };
		});
		//dynamically change default value
		const newAddressArr = allDefaultFalseArr.map((item) => {
			if (item.id == id) {
				const obj = {
					...item,
					default: true,
				};
				return obj;
			}
			return item;
		});
		setAllAddress(newAddressArr);
	};

	//Edit address //set edit address in a state   (lifted state)
	const handleEditAddress = (id) => {
		const item = allAddress.find((item) => item.id == id);
		setEdit(!edit);
		setEditItem(item);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setEdit(false);
		const updatedArray = allAddress.map((item) => {
			if (item.id == editItem.id) {
				return editItem;
			}
			return item;
		});
		setAllAddress(updatedArray);
	};

	//Set new address in address in address array function
	const setAddress = (address) => {
		const newAddress = {
			...address,
			id: crypto.randomUUID(),
		};

		setAllAddress([...allAddress, newAddress]);
		setIsAddNewAddressOpen(false);
	};

	//Add new address
	const handleAddNewAddress = () => {
		setIsAddNewAddressOpen(!isAddNewAddressOpen);
	};

	//TODO::After adding functionality it should be in component
	const Address = (item) => {
		return (
			<div
				className={`my-2 rounded  border border-red-500 p-2 ${
					item.default && "bg-cyan-50"
				}`}
			>
				<div className="flex items-center justify-between font-bold ">
					<span className="flex-none">
						{item.default ? (
							<IoMdRadioButtonOn color="blue" size={25} />
						) : (
							<IoMdRadioButtonOff
								onClick={() => handleDefault(item.id)}
								color="blue"
								size={25}
							></IoMdRadioButtonOff>
						)}
					</span>
					<span className="ml-4 flex-1">{item.place}</span>
					<span onClick={() => handleEditAddress(item.id)}>
						<EditIcon size={25}></EditIcon>
					</span>
				</div>
				<div className="ml-10 w-full leading-6 ">
					<span className="flex items-center gap-2">
						<FaRegAddressBook />
						<p>{item.address}</p>
					</span>
					<span className="flex items-center gap-2">
						<MdCall />
						<p>{item.contact}</p>
					</span>
				</div>
			</div>
		);
	};

	return (
		<>
			<AddNewAddressModal
				isOpen={isAddNewAddressOpen}
				setIsOpen={setIsAddNewAddressOpen}
				setAddress={setAddress}
			></AddNewAddressModal>
			<EditAddressModal
				isOpen={edit}
				setIsOpen={setEdit}
				editItem={editItem}
				setEditItem={setEditItem}
				setEdit={setEdit}
				handleSubmit={handleSubmit}
			></EditAddressModal>
			<div className="my-2">
				{/* Address bar mapping */}
				{allAddress &&
					allAddress.map((item) => (
						<Address key={item.id} {...item}></Address>
					))}

				{/* Add New Address button  */}
				<div
					onClick={handleAddNewAddress}
					className="mt-2 flex h-20 cursor-pointer items-center justify-center gap-2 rounded border border-dotted p-2 text-xl font-bold shadow-md hover:text-primary"
				>
					<span>Add</span>
					<GoPlusCircle />
				</div>
			</div>
		</>
	);
};

export default DeliveryAddress;
