import { createControlComponent } from "@react-leaflet/core";
import L, { Icon } from "leaflet";
import "leaflet-routing-machine";
import { useState } from "react";
import { api } from "../../../lib/api";

const createRoutineMachineLayer = (props) => {
	const userLocationLatLng = L.latLng(props.userLocation);
	let shopperLocationsLatLng =
		props.shopperLocation instanceof Array
			? props.shopperLocation.map((location) => L.latLng(location))
			: [L.latLng(props.shopperLocation)];

	shopperLocationsLatLng = shopperLocationsLatLng.filter(
		(location) =>
			userLocationLatLng.distanceTo(location) <= props.minimumDistance
	);
	// Shopper Marker
	const shopperIcon = new Icon({
		iconUrl: "../../../public/assets/img/map-marker-for-shopper.png",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [15, 30],
	});
	// Customer Marker
	const customerIcon = new Icon({
		iconUrl: "../../../public/assets/img/circle-100.png",
		iconSize: [20, 20], // size of the icon
	});
	const instance = L.Routing.control({
		serviceUrl: "https://router.project-osrm.org/route/v1",
		waypoints: [userLocationLatLng, ...shopperLocationsLatLng],
		lineOptions: {
			styles: [{ color: "#373afa", weight: 4 }],
		},
		show: false,
		routeWhileDragging: false,
		draggableWaypoints: false,
		fitSelectedRoutes: false,
		showAlternatives: false,
		alternatives: false,
		steps: false,
		createMarker: function (i, wp, nWps) {
			if (i === 0) {
				// This is the start marker
				return L.marker(wp.latLng, { icon: customerIcon }).bindPopup(
					"I am Here"
				);
			} else {
				// This is the stop marker
				return L.marker(wp.latLng, { icon: shopperIcon }).bindPopup(
					props.popup
				);
			}
		},
	});

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
