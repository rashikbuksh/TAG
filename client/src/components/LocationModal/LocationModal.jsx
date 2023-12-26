import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import GetLocation from "../../helpers/GetLocation";
import Modal from "../Modal/Modal";
import "./styles.css";

const LocationModal = ({ isOpen, setIsOpen, latlong, popup }) => {
	const currentLocation = GetLocation();

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} showCross={true}>
			<MapContainer
				center={[latlong.latitude, latlong.longitude]}
				zoom={14}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[latlong.latitude, latlong.longitude]}>
					<Popup>{popup}</Popup>
				</Marker>
				<Marker
					position={[
						currentLocation.latitude,
						currentLocation.longitude,
					]}
				>
					<Popup>I am Here</Popup>
				</Marker>
			</MapContainer>
		</Modal>
	);
};

export default LocationModal;
