import { CiMobile4 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
const SavedPayment = () => {
	return (
		<div className="my-8">
			<span className="text-[18px]  font-bold text-[#171F1C]">
				Saved Payment
			</span>
			<div className="mt-4 flex h-[50px] w-full items-center  px-2">
			<CiMobile4 size={22} />
				<span className="ml-8 flex-auto text-[16px] font-bold">
					018448*****
				</span>
				<FaArrowRight size={22}></FaArrowRight>
			</div>
		</div>
	);
};

export default SavedPayment;
