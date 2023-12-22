import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "../Modal/Modal";
import "./styles.css";

const LocationModal = ({
	isOpen,
	setIsOpen,
	title,
	latitude,
	longitude,
	popup,
}) => {
	const closeModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			// title={title}
			showCross={true}
			closeModal={closeModal}
		>
			<MapContainer center={[latitude, longitude]} zoom={15}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[latitude, longitude]}>
					<Popup>{popup}</Popup>
				</Marker>
			</MapContainer>
		</Modal>
	);
};

export default LocationModal;
