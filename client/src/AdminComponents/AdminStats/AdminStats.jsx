import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";

const AdminStats = () => {
	return (
		<section className="p-4 my-6 md:p-8 bg-gray-800    text-gray-100">
	<div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-6">
		<div className="flex overflow-hidden rounded-lg    bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
				<FaStore className="text-3xl"></FaStore>
			</div>
			<div className="flex items-center justify-between flex-col flex-1 p-3">
				<p className="text-2xl font-semibold">200+</p>
				<p>Shopkeeper</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg     bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
					<path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-col flex-1 p-3">
				<p className="text-2xl font-semibold">7500+</p>
				<p>Customers</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg    bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
            <FaShoppingCart className="text-3xl"></FaShoppingCart>
			</div>
			<div className="flex items-center justify-between flex-col flex-1 p-3">
				<p className="text-2xl font-semibold">140</p>
				<p>Complate Order</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg    bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M256.25,16A240,240,0,0,0,88,84.977V16H56V144H184V112H106.287A208,208,0,0,1,256.25,48C370.8,48,464,141.2,464,255.75S370.8,463.5,256.25,463.5,48.5,370.3,48.5,255.75h-32A239.75,239.75,0,0,0,425.779,425.279,239.75,239.75,0,0,0,256.25,16Z"></path>
					<polygon points="240 111.951 239.465 288 368 288 368 256 271.563 256 272 112.049 240 111.951"></polygon>
				</svg>
			</div>
			<div className="flex items-center justify-between  flex-col flex-1 p-3">
				<p className="text-2xl font-semibold">24/7 h</p>
				<p>Support</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg    bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M415.313,358.7c36.453-36.452,55.906-85.231,54.779-137.353-1.112-51.375-21.964-99.908-58.715-136.66L388.75,107.314A166.816,166.816,0,0,1,438.1,222.039c.937,43.313-15.191,83.81-45.463,114.083l-48.617,49.051.044-89.165-32-.016L311.992,440H456.063V408H366.449Z"></path>
					<path d="M47.937,112h89.614L88.687,161.3c-36.453,36.451-55.906,85.231-54.779,137.352a198.676,198.676,0,0,0,58.715,136.66l22.627-22.627A166.818,166.818,0,0,1,65.9,297.962c-.937-43.314,15.191-83.811,45.463-114.083l48.617-49.051-.044,89.165,32,.015L192.008,80H47.937Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-1 flex-col p-3">
				<p className="text-2xl font-semibold">99,9 %</p>
				<p>Uptime</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg    bg-gray-900    text-gray-100">
			<div className="flex items-center justify-center px-4    bg-violet-400    text-gray-800">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M416,180H320V340h96a20.023,20.023,0,0,0,20-20V200A20.023,20.023,0,0,0,416,180ZM404,308H352V212h52Z"></path>
					<path d="M436.574,120H352V64H32V408a64.072,64.072,0,0,0,64,64H288a64.072,64.072,0,0,0,64-64v-8h84.574A59.493,59.493,0,0,0,496,340.574V179.426A59.493,59.493,0,0,0,436.574,120ZM464,340.574A27.457,27.457,0,0,1,436.574,368H320v40a32.036,32.036,0,0,1-32,32H96a32.036,32.036,0,0,1-32-32V96H320v56H436.574A27.457,27.457,0,0,1,464,179.426Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-1 flex-col p-3">
				<p className="text-2xl font-semibold">720 L</p>
				<p>Coffee</p>
			</div>
		</div>
	</div>
</section>
	);
};

export default AdminStats;
