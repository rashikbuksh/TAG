import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

const PaymentOparator = () => {
	return (
		<div className="mt-4">
			<span className="text-[18px] font-bold text-[#171F1C]  ">
				Payment Method
			</span>
			<div className="mt-4 flex flex-col gap-2">
				{/* <div className="flex h-[50px] w-full items-center  px-2">
					<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Bkash
					</span>
					<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
				</div>
				<div className="flex h-[50px] w-full items-center  px-2 ">
					<span className="h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Nagad
					</span>
					<span className="mr-2 h-6 w-6 flex-none rounded-lg bg-amber-500 p-1"></span>
				</div> */}
				<div className="flex h-[50px] w-full items-center  px-2">
					<TbTruckDelivery size={25}></TbTruckDelivery>
					<span className="ml-8 flex-auto text-[16px] font-bold">
						Cash On Delivery
					</span>
					<FaArrowRight size={22} />
				</div>
			</div>
		</div>
	);
};

export default PaymentOparator;
