import { Map } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "../Modal/Modal";

const MapDistanceModal = (
	startLoc,
	endLoc,
	isOpen,
	setIsOpen,
	startPopup,
	endPopup
) => {
	const [isShown, setIsShown] = useState(false);
	const [startMarker, setStartMarker] = useState(null);
	const [endMarker, setEndMarker] = useState(null);

	const map = new L.Map();

	useEffect(() => {
		console.log(startLoc, "startLoc");
		if (map) {
			// Add Mapbox access token if you are using the Mapbox Directions API
			L.Routing.control({
				waypoints: [
					L.latLng(startLoc.latitude, startLoc.longitude), // Replace with the coordinates of the starting marker
					L.latLng(endLoc.latitude, endLoc.longitude), // Replace with the coordinates of the ending marker
				],
				routeWhileDragging: true,
			}).addTo(map);
		}
	}, [map]);

	const handleMapClick = (event) => {
		setIsShown(isOpen);
		console.log(isOpen);

		if (!startMarker) {
			setStartMarker(startLoc.latitude, startLoc.longitude);
		} else if (!endMarker) {
			setEndMarker(endLoc.latitude, endLoc.longitude);
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} showCross={true}>
			<Map
				center={[startLoc]}
				zoom={13}
				style={{ height: "50vh" }}
				onClick={handleMapClick}
				ref={(ref) => setMap(ref)}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="© OpenStreetMap contributors"
				/>

				<Marker position={[startLoc.latitude, startLoc.longitude]}>
					<Popup>{startPopup}</Popup>
				</Marker>
				<Marker position={[endLoc.latitude, endLoc.longitude]}>
					<Popup>{endPopup}</Popup>
				</Marker>
			</Map>
		</Modal>
	);
};

export default MapDistanceModal;
