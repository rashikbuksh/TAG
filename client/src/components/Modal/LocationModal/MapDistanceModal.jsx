import GetLocation from "@helpers/GetLocation";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";

import ShopperMapMarker from "@assets/img/map-marker-for-shopper.png";

import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import React from "react";

const MapDistanceModal = ({ isOpen, setIsOpen }) => {
	// const distanceCalculator = "map_minimum_distance_in_meter";
	// const [minimumDistance, setMinimumDistance] = useState(0);
	// api.get(`/util/getUtil/${distanceCalculator}`).then((res) => {
	// 	setMinimumDistance(res.data[0].value);
	// });

	// user Location
	const { location, loading, error } = GetLocation();
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>{error}</h1>;

	const maptilerProvider = maptiler(
		import.meta.env.VITE_MAP_API_KEY,
		"streets"
	);

	const waypoints = [
		[location.lat, location.lng],
		[24.7508095, 91.4219455],
	];

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Map
				provider={maptilerProvider}
				dprs={[1, 2]}
				height={600}
				defaultCenter={waypoints[0]}
				defaultZoom={15}
			>
				{waypoints.map((waypoint, index) => (
					<Marker key={index} width={50} anchor={waypoint} />
				))}
			</Map>
		</Modal>
	);
};

export default MapDistanceModal;
