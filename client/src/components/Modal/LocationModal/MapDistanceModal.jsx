import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect, useRef, useState } from "react";
import GetLocation from "../../../helpers/GetLocation";
import Modal from "../Modal";

import ShopperMapMarker from "../../../assets/img/map-marker-for-shopper.png";

const MapDistanceModal = ({ isOpen, setIsOpen }) => {
	// const distanceCalculator = "map_minimum_distance_in_meter";
	// const [minimumDistance, setMinimumDistance] = useState(0);
	// api.get(`/util/getUtil/${distanceCalculator}`).then((res) => {
	// 	setMinimumDistance(res.data[0].value);
	// });

	const mapElement = useRef();
	const [mapLongitude, setMapLongitude] = useState(13.813948);
	const [mapLatitude, setMapLatitude] = useState(16.60461);
	const [mapZoom, setMapZoom] = useState(13);
	const [map, setMap] = useState(null);

	// user Location
	// const { location, loading, error } = GetLocation();
	// if (loading) return <h1>Loading...</h1>;
	// if (error) return <h1>{error}</h1>;

	const mapKey = import.meta.env.VITE_MAP_API_KEY;

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
		});

		if (!newMap) {
			console.error("tt.map() returned null");
			return;
		}

		const marker = new tt.Marker()
			.setLngLat([mapLongitude, mapLatitude])
			.addTo(newMap);

		const popup = new tt.Popup({ offset: 35 }).setHTML(
			"<h1>My Location</h1>"
		);

		marker.setPopup(popup);

		setMap(newMap);
	}, [mapElement, mapKey, mapZoom, mapLatitude, mapLongitude]);

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			showCross={false}
			title={"Location"}
			fullHeight={true}
		>
			<div
				id="map"
				ref={mapElement}
				className="mapDiv"
				style={{
					visibility: "visible",
					width: "100%",
					height: "85%",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 0,
					marginTop: "50px",
				}}
			></div>
		</Modal>
	);
};

export default MapDistanceModal;
