import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
const DeliveryAddress = () => {
	const [edit, setEdit] = useState(true);
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
			address: "4140 Parker Rd. Allentown,New Mexico",
			contact: "+880 01518****24",
		},
	];
	const [allAddress, setAllAddress] = useState(addressArr);

	//TODO::After adding functionality it should in component
	const Address = (item) => {
		return (
			<div className="my-2 rounded  border p-2 shadow-md ">
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
					<span>
						<AiTwotoneEdit
							onClick={() => setEdit(false)}
							size={25}
						></AiTwotoneEdit>
					</span>
				</div>
				<div className="ml-10 w-full leading-6 text-gray-500">
					<span className="flex items-center gap-2">
						<FaRegAddressBook />
						<input
							type="text"
							name="address"
							readOnly={edit}
							className="w-[250px]"
							
							placeholder={item.address}
						/>
					</span>
					<span className="flex items-center gap-2">
						<MdCall />
						<input
							type="text"
							name="contact"
							readOnly={edit}
							className="w-[300px]"
							placeholder={item.contact}
						/>
					</span>
				</div>
			</div>
		);
	};


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

	//Add new address
	const handleAddNewAddress = ()=>{
		alert('add new address')
	}

	return (
		<div className="my-2">
			{/* Address bar mapping */}
			{allAddress &&
				allAddress.map((item) => (
					<Address key={item.id} {...item}></Address>
				))}

			{/* Add New Address button  */}
			<div onClick={handleAddNewAddress} className="mt-2 flex h-20 cursor-pointer items-center justify-center gap-2 rounded border border-dotted p-2 text-xl font-bold shadow-md hover:text-primary" >
				<span>Add</span>
				<GoPlusCircle />
			</div>
		</div>
	);
};

export default DeliveryAddress;
