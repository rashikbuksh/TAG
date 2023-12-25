import { Map } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "../Modal/Modal";

const MapDistanceModal = () => {
	var map = L.map("map").setView([51.505, -0.09], 13);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	var marker = L.marker([51.5, -0.09]).addTo(map);
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	function onMapClick(e) {
		alert("You clicked the map at " + e.latlng);
	}

	map.on("click", onMapClick);
	return (
		<div className="map" id="map" style={"#map { height: 180px; }"}></div>
	);
};

export default MapDistanceModal;
