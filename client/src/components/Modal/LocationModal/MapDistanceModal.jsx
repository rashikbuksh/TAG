import "leaflet-routing-machine";
// import "lrm-google";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GetLocation from "../../../helpers/GetLocation";
import { api } from "../../../lib/api";
import Modal from "../Modal";
import RoutingMachine from "./RoutingMachine";
import "./styles.css";

const MapDistanceModal = ({ isOpen, setIsOpen, latlong, popup }) => {
	const distanceCalculator = "map_minimum_distance_in_meter";
	const [minimumDistance, setMinimumDistance] = useState(0);
	api.get(`/util/getUtil/${distanceCalculator}`).then((res) => {
		setMinimumDistance(res.data[0].value);
	});

	// user Location
	const { location, loading, error } = GetLocation();
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>{error}</h1>;

	setTimeout(function () {
		window.dispatchEvent(new Event("resize"));
	}, 1);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			showCross={false}
			title={"Location"}
		>
			<MapContainer
				center={location}
				zoom={25}
				style={{ height: "400px", width: "100%" }}
			>
				<TileLayer
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<RoutingMachine
					userLocation={location}
					// handle for multiple shopper location
					shopperLocation={latlong}
					popup={popup}
					minimumDistance={minimumDistance}
					classname="leaflet-routing-container"
				/>
			</MapContainer>
		</Modal>
	);
};

export default MapDistanceModal;
