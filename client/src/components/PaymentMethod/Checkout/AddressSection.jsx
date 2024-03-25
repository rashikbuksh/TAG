import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { FaRegAddressBook, FaTrash } from "react-icons/fa";
import { MdCall } from "react-icons/md";
const AddressSection = ({
	item,
	handleEditAddress,
	handelDeleteAddress,
	setSelectedAddress,
	selectedAddress,
	shopperAccess,
	setCustomers_address_summary,
}) => {
	const handleClick = () => {
		if (shopperAccess === "shopper") {
			return;
		} else {
			setSelectedAddress(item.id);
			setCustomers_address_summary(
				`${item.address_title},${item.address},${item.phone_no}`
			);
		}
		// Call handleSelectAddress to set the selected address
	};
	return (
		<div
			className={`my-2 rounded  border border-red-500 p-2 ${
				selectedAddress === item.id && "bg-cyan-50"
			}`}
			onClick={handleClick}
		>
			<div className="flex items-center justify-between gap-2 font-bold ">
				<span className="flex-none">
					{selectedAddress === item.id ? (
						<IoMdRadioButtonOn color="blue" size={25} />
					) : (
						<IoMdRadioButtonOff
							color="blue"
							size={25}
						></IoMdRadioButtonOff>
					)}
				</span>
				<span className=" flex-1">{item.address_title}</span>
				<span onClick={() => handleEditAddress(item.id)}>
					<EditIcon size={25} color="blue"></EditIcon>
				</span>
				<span onClick={() => handelDeleteAddress(item.id)}>
					<FaTrash size={20} color="red"></FaTrash>
				</span>
			</div>
			<div className=" mt-2 pl-5 leading-6">
				<div className="flex items-center gap-2">
					<FaRegAddressBook />
					<p>{item.address}</p>
				</div>
				<div className="flex items-center gap-2">
					<MdCall />
					<p>{item.phone_no}</p>
				</div>
			</div>
		</div>
	);
};

export default AddressSection;
