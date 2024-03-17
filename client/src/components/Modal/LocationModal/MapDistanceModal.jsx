import ShopperMapMarker from "@assets/img/map-marker-for-shopper.png";
import { useAuth } from "@context/auth";
import GetLocation from "@helpers/GetLocation";
import { api } from "@lib/api";
import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import React, { useState } from "react";
import Modal from "../Modal";

const MapDistanceModal = (props) => {
	const [minimumDistance, setMinimumDistance] = useState(0);
	api.get(`/util/getUtil/map_minimum_distance_in_meter`).then((res) => {
		setMinimumDistance(res.data[0].value);
	});

	const { user } = useAuth();

	// user Location
	const { location, loading, error } = GetLocation();
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>{error}</h1>;

	const maptilerProvider = maptiler(
		import.meta.env.VITE_MAP_API_KEY,
		"streets"
	);

	const DistanceCalculation = (lat, lng) => {
		const R = 6371e3; // metres
		const φ1 = (location.lat * Math.PI) / 180; // φ, λ in radians
		const φ2 = (lat * Math.PI) / 180;
		const Δφ = ((lat - location.lat) * Math.PI) / 180;
		const Δλ = ((lng - location.lng) * Math.PI) / 180;

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres
		return d;
	};

	return (
		<Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
			{user?.id == null ? (
				<h1>Please login to see the map</h1>
			) : (
				<Map
					provider={maptilerProvider}
					dprs={[1, 2]}
					height={600}
					defaultCenter={[location.lat, location.lng]}
					defaultZoom={15}
				>
					<Marker width={40} anchor={[location.lat, location.lng]} />
					{props.single == true ? (
						<Marker
							width={40}
							anchor={[
								parseFloat(props.latLong.lat),
								parseFloat(props.latLong.lng),
							]}
							color="red"
						/>
					) : (
						props.latLong.map(
							(item) =>
								DistanceCalculation(item.lat, item.lng) <
									minimumDistance && (
									<Marker
										width={40}
										anchor={[
											parseFloat(item.lat),
											parseFloat(item.lng),
										]}
										color="red"
									/>
								)
						)
					)}
				</Map>
			)}
		</Modal>
	);
};

export default MapDistanceModal;
