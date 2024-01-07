import deg2rad from "deg2rad";
import { Icon, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
} from "react-leaflet";
import GetLocation from "../../../helpers/GetLocation";
import Modal from "../Modal";
import "./styles.css";

const LocationModal = ({ isOpen, setIsOpen, latlong, popup }) => {
	const currentLocation = GetLocation();

	// distance between two points
	const distance = (latlong1, latlong2) => {
		const lat1 = latlong1.latitude;
		const lon1 = latlong1.longitude;
		const lat2 = latlong2.latitude;
		const lon2 = latlong2.longitude;
		// calculate distance between latlongs in km
		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1); // deg2rad below
		const dLon = deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	};

	setTimeout(function () {
		window.dispatchEvent(new Event("resize"));
	}, 1);

	const shopperIcon = new Icon({
		iconUrl: "../../../public/assets/img/map-marker-for-shopper.png",
		iconSize: [20, 20], // size of the icon
		iconAnchor: [10, 20],
	});

	const customerIcon = new Icon({
		iconUrl: "../../../public/assets/img/circle-100.png",
		iconSize: [20, 20], // size of the icon
	});

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} showCross={true}>
			<MapContainer
				center={[latlong.latitude, latlong.longitude]}
				zoom={15}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					position={[latlong.latitude, latlong.longitude]}
					icon={shopperIcon}
				>
					<Popup>{popup}</Popup>
				</Marker>
				<Marker
					position={[
						currentLocation.latitude,
						currentLocation.longitude,
					]}
					icon={customerIcon}
				>
					<Popup>I am Here</Popup>
				</Marker>

				<Polyline
					positions={[
						[latlong.latitude, latlong.longitude],
						[currentLocation.latitude, currentLocation.longitude],
					]}
					pathOptions={{ color: "blue" }}
				>
					<Popup>
						{distance(currentLocation, latlong).toFixed(2) < 1
							? `${(
									distance(currentLocation, latlong) * 1000
							  ).toFixed(2)} m`
							: `${distance(currentLocation, latlong).toFixed(
									2
							  )} km`}
					</Popup>
				</Polyline>
				{/* <MapDistanceModal /> */}
			</MapContainer>
		</Modal>
	);
};

export default LocationModal;
