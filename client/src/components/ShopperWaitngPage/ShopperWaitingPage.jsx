import { TagLogo2 } from "../../SvgHub/TagLogo2";

const ShopperWaitingPage = () => {
	return (
		<div>
			<div className="flex flex-col items-center justify-center pt-28">

                <TagLogo2/>
				<h1 className="text-5xl font-extrabold mt-5">Verification</h1>
				<p className="text-2xl text-center my-10">Please Wait for a verification call</p>
                <img className="h-[135px] w-[130px] mt-24" src="../../../src/assets/img/icons/phone.gif" alt="" />
			</div>
		</div>
	);
};

export default ShopperWaitingPage;
