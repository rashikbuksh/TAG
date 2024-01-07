import { createControlComponent } from "@react-leaflet/core";
import L, { Icon } from "leaflet";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
	// Shopper Marker
	const shopperIcon = new Icon({
		iconUrl: "../../../public/assets/img/map-marker-for-shopper.png",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [5, 30],
	});
	// Customer Marker
	const customerIcon = new Icon({
		iconUrl: "../../../public/assets/img/circle-100.png",
		iconSize: [20, 20], // size of the icon
	});
	const instance = L.Routing.control({
		serviceUrl: "https://router.project-osrm.org/route/v1",
		waypoints: [
			L.latLng(props.userLocation),
			L.latLng(props.shopperLocation),
		],
		lineOptions: {
			styles: [{ color: "#373afa", weight: 4 }],
		},
		show: false,
		addWaypoints: false,
		routeWhileDragging: false,
		draggableWaypoints: false,
		fitSelectedRoutes: false,
		showAlternatives: false,
		createMarker: function (i, wp, nWps) {
			if (i === 0) {
				// This is the start marker
				return L.marker(wp.latLng, { icon: shopperIcon });
			} else if (i === nWps - 1) {
				// This is the end marker
				return L.marker(wp.latLng, { icon: customerIcon });
			} else {
				return L.marker(wp.latLng, { icon: shopperIcon });
			}
		},
	});

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
