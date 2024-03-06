import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";

const MapDistanceModal = ({ isOpen, setIsOpen }) => {
	// const distanceCalculator = "map_minimum_distance_in_meter";
	// const [minimumDistance, setMinimumDistance] = useState(0);
	// api.get(`/util/getUtil/${distanceCalculator}`).then((res) => {
	// 	setMinimumDistance(res.data[0].value);
	// });

	const mapElement = useRef();
	const [mapLongitude, setMapLongitude] = useState(-11);
	const [mapLatitude, setMapLatitude] = useState(36);
	const [mapZoom, setMapZoom] = useState(13);
	const [map, setMap] = useState(null);

	// user Location
	// const { location, loading, error } = GetLocation();
	// if (loading) return <h1>Loading...</h1>;
	// if (error) return <h1>{error}</h1>;

	const mapKey = import.meta.env.VITE_MAP_API_KEY;

	console.log(
		mapKey,
		"mapKey",
		mapZoom,
		"mapZoom",
		mapLatitude,
		"mapLatitude",
		mapLongitude,
		"mapLongitude"
	);

	useEffect(() => {
		if (!mapElement.current) {
			console.error("mapElement.current is not defined");
			return;
		}

		if (!mapKey) {
			console.error("mapKey is not defined");
			return;
		}

		if (
			typeof mapLongitude !== "number" ||
			typeof mapLatitude !== "number"
		) {
			console.error("center is not a valid array of two numbers");
			return;
		}

		if (typeof mapZoom !== "number") {
			console.error("zoom is not a valid number");
			return;
		}

		const newMap = tt.map({
			key: mapKey,
			container: mapElement.current,
			center: [mapLongitude, mapLatitude],
			zoom: mapZoom,
			stylesVisibility: {
				trafficIncidents: true,
				trafficFlow: true,
			},
			visibility: true,
		});

		if (!newMap) {
			console.error("tt.map() returned null");
			return;
		}

		setMap(newMap);
	}, [mapElement, mapKey, mapLongitude, mapLatitude, mapZoom]);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			showCross={false}
			title={"Location"}
		>
			<div
				id="map"
				ref={mapElement}
				className="mapDiv"
				style={{
					visibility: "visible",
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 0,
				}}
			></div>
		</Modal>
	);
};

export default MapDistanceModal;
