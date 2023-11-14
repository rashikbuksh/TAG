import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { FaX } from "react-icons/fa6";
import { Shopericon } from "../../SvgHub/TagLogo2";
import { MapMan } from "../../SvgHub/Icons";

const LocationModal = ({ isOpen, setIsOpen, title, map_location }) => {
	const [showbtn, setShowbtn] = useState(true);
	const loader = new Loader({
		apiKey: import.meta.env.VITE_APP_MAP_KEY,
		version: "weekly",
	});
	const mapRef = useRef(null);
	const markerRef = useRef(null);

	const showLocation = () => {
		if (map_location) {
			const location = map_location.split("__");
			loader.load().then(async () => {
				const { Map } = await google.maps.importLibrary("maps");
				const { Marker } = await google.maps.importLibrary("marker");

				if (!mapRef.current) {
					mapRef.current = new Map(document.getElementById("map"), {
						center: {
							lat: parseFloat(location[0]),
							lng: parseFloat(location[1]),
						},
						zoom: 8,
					});
					// Optionally, add any map markers, listeners, etc. here.
					setShowbtn(!showbtn);
					// Create a marker at the specified location
					markerRef.current = new Marker({
						position: {
							lat: parseFloat(location[0]),
							lng: parseFloat(location[1]),
						},
						map: mapRef.current,
						title: "Location",
					});
				} else {
					mapRef.current.setCenter({
						lat: parseFloat(location[0]),
						lng: parseFloat(location[1]),
					});

					// Update the marker's position
					markerRef.current.setPosition({
						lat: parseFloat(location[0]),
						lng: parseFloat(location[1]),
					});
				}
			});
		}
	};
	const closeModal = () => {
		setIsOpen(!isOpen);
		setShowbtn(true);
	};
	const backgroundImageUrl = showbtn
		? 'url("../../../public/assets/img/map.png")'
		: "none";
	const styles = {
		backgroundImage: backgroundImageUrl,
		backgroundSize: "cover",
		backgroundPosition: "center",
		// You can add more background properties here as needed
	};
	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			// title={title}
			showCross={true}
		>
			<div className="my-3 flex justify-between px-3">
				<div>
					<h2 className="text-xl font-semibold ">
						Show Shop Location
					</h2>
				</div>
				<button onClick={closeModal} className="rounded-full p-1">
					<FaX className="text-[#FF4C5E]"></FaX>
				</button>
			</div>
			<div className={`relative ${showbtn ? "" : ""}  `} style={styles}>
				{showbtn && (
					<button
						onClick={showLocation}
						className="absolute left-[110px] top-1/2 h-[40px] rounded    bg-[#2F5BA9] px-3 py-2 text-white  "
					>
						Show Location
					</button>
				)}

				<div
					id="map"
					style={{
						height: "400px",
						display: isOpen ? "block" : "none",
					}}
					className="flex items-center justify-center"
				></div>
			</div>
			<div className="mx-auto my-3 flex w-[70%] items-center justify-between">
				<MapMan></MapMan>
				<p>2 minute Away to Store</p>
				<Shopericon></Shopericon>
			</div>
		</Modal>
	);
};

export default LocationModal;
