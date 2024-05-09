import { MdDeleteForever } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProductRow = () => {
	return (
		<>
			<div className="flex justify-between gap-2 rounded bg-slate-50 p-2">
				<div className=" relative w-9/12 gap-2">
					<div className="flex gap-2 py-2 font-bold">
						<img
							src="https://picsum.photos/200/300"
							alt="Product Image"
							className="h-14 w-14 rounded"
						/>
						<div>
							<p>Vanaty Hand bag</p>
							<span>1000 gm</span>
						</div>
					</div>
					<p className="absolute right-2 top-12 w-4 text-right">5x</p>
					<progress
						className="progress progress-success my-1 "
						value="70"
						max="100"
					></progress>
				</div>
				<div className="w-3/12  ">
					<span className="flex justify-between ">
						<span></span>
						<MdDeleteForever
							color="red "
							size={22}
							className="cursor-pointer"
						/>
					</span>
					<div className="flex items-center justify-center gap-1 ">
						<TbCurrencyTaka />
						<span className="font-bold">2500</span>
					</div>
					<div className="mt-3 flex justify-center">
						<Link to={'/addshopperproduct'}>
							<button
								className="rounded bg-green-500 px-3 py-1  text-sm font-bold text-white"
								type="button"
							>
								Stock
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductRow;
