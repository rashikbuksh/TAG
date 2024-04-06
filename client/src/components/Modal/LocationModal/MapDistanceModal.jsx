import { useAuth } from "@context/auth";
import GetLocation from "@helpers/GetLocation";
import { api } from "@lib/api";
import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import React, { useState } from "react";
import Modal from "../Modal";
import { FaLocationDot } from "react-icons/fa6";

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
	let allDistancesBelowMinimum = true;

	if (Array.isArray(props.latLong)) {
		for (let i = 0; i < props.latLong.length; i++) {
			const distance = DistanceCalculation(
				props.latLong[i].lat,
				props.latLong[i].lng
			);
			if (distance >= minimumDistance) {
				allDistancesBelowMinimum = false;
				break;
			}
		}
	}

	if (
		Array.isArray(props.latLong) &&
		props.latLong.length > 0 &&
		allDistancesBelowMinimum
	) {
		return <h1>No shop to see the map</h1>;
	}

	const calculateZoom = (lat, lng) => {
		const distance = DistanceCalculation(lat, lng);
		// console.log(distance);
		if (distance < 5) {
			return 16;
		} else if (distance < 10) {
			return 14;
		} else if (distance < 50) {
			return 10;
		} else {
			return 8;
		}
	};

	return (
		<Modal
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			title={"Location"}
		>
			{user?.id == null ? (
				<h1>Please login to see the map</h1>
			) : (
				<div className="h-[380px]">
					
					<Map
						provider={maptilerProvider}
						height={500}
						defaultCenter={
							props.single == true
								? [
										(location.lat +
											parseFloat(props.latLong.lat)) /
											2,
										(location.lng +
											parseFloat(props.latLong.lng)) /
											2,
								  ]
								: [location.lat, location.lng]
						}
						defaultZoom={
							props.single == true
								? calculateZoom(
										props.latLong.lat,
										props.latLong.lng
								  )
								: 12
						}
					>
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
							Array.isArray(props.latLong) &&
							props.latLong.map((item) => {
								const distance = DistanceCalculation(
									item.lat,
									item.lng
								);
								if (distance < minimumDistance) {
									return (
										<Marker
											key={Math.random()}
											width={40}
											anchor={[
												parseFloat(item.lat),
												parseFloat(item.lng),
											]}
											color="red"
										/>
									);
								} else {
									return "";
								}
							})
						)}
						{typeof location.lat === "number" &&
							typeof location.lng === "number" && (
								<Marker
									width={35}
									anchor={[location.lat, location.lng]}
									color="blue"
								></Marker>
							)}
					</Map>
					<div className="flex items-center justify-center gap-2">
						<span className="flex items-center">
							<FaLocationDot size={27} color="red" /> Your
							location
						</span>
						<span className="flex items-center">
							<FaLocationDot size={27} color="blue" />  Shop
							Location
						</span>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default MapDistanceModal;
