import { CiMoneyBill } from "react-icons/ci";
const Oparator = () => {
	return (
		<div className="mx-2 flex h-[80px] items-center  ">
			<CiMoneyBill size={30}></CiMoneyBill>
			<span className="ml-8 flex-auto text-[16px] font-bold">Bkash</span>
		</div>
	);
};

export default Oparator;
