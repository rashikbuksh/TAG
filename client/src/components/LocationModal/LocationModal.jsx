import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef } from "react";
import Modal from "../Modal/Modal";

const LocationModal = ({ isOpen, setIsOpen, title, map_location }) => {
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

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
			<button onClick={showLocation}>Show Location</button>
			<div
				id="map"
				style={{ height: "400px", display: isOpen ? "block" : "none" }}
			></div>
		</Modal>
	);
};

export default LocationModal;
