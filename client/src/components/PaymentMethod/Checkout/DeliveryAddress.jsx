import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa6";
const DeliveryAddress = () => {
	const [edit, setEdit] = useState(false);
	const [address, setAddress] = useState(
		"4140 Parker Rd. Allentown,New Mexico 31134"
	);
	const [contactNumber, setContactNumber] = useState("89-4639-8");

	return (
		<div>
			<span className="text-[18px] font-bold">
				Select Delivery Address
			</span>
			<div className="mt-4 h-[132px] w-[241px] ">
				<div className="flex p-2">
					<input
						type="checkbox"
						checked={!edit ? true : false}
						className="checkbox"
					/>
					<span className="flex-auto px-2 text-[16px] font-semibold text-[#000000]">
						Home
					</span>
					<AiTwotoneEdit
						onClick={() => setEdit(!edit)}
						size={25}
					></AiTwotoneEdit>
				</div>
				<div className="mx-auto w-[185px] ">
					<input
						type="text"
						className={`text-[14px] font-extralight leading-5 text-[#959c9ac2] ${
							edit && "border border-black w-[300px]"
						}`}
						value={address}
						readOnly={!edit}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<div className="flex gap-2">
						<FaClipboardCheck size={20}></FaClipboardCheck>
						<input
							type="text"
							className={`text-[14px] font-extralight leading-5 text-[#959c9ac2] ${
								edit && "border border-black w-[300px]"
							}`}
							value={contactNumber}
							readOnly={!edit}
							onChange={(e) => setContactNumber(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeliveryAddress;
