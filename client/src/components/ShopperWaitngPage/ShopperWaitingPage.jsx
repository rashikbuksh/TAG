import phoneIcon from ".../../../../../public/icons/phone.gif";
import { TagLogo2 } from "@SvgHub/TagLogo2";
import { Link } from "react-router-dom";
const ShopperWaitingPage = () => {
	return (
		<div className="relative h-screen">
			<div className="flex flex-col items-center justify-center pt-24">
				<TagLogo2 />
				<div className="mt-4 flex flex-col items-center justify-center">
					<h1 className="mt-5 text-4xl font-extrabold">
						Verification
					</h1>
					<p className="mb-10 mt-2 text-center text-2xl italic">
						Please Wait for a verification call
					</p>
					<img
						className="mt-24 h-[135px] w-[130px]"
						src={phoneIcon}
						alt=""
					/>
				</div>
			</div>
			<Link to={"/home"}>
				<button
					type="button"
					className="absolute bottom-5 flex  w-full items-center justify-center gap-x-2   border-gray-700 bg-gray-900 px-5 py-3 text-sm text-gray-200 transition-colors duration-200 hover:bg-gray-800 sm:w-auto "
				>
					<svg
						className="h-5 w-5 rtl:rotate-180"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>
					<span>Go back</span>
				</button>
			</Link>
		</div>
	);
};

export default ShopperWaitingPage;
