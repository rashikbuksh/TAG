import React, { useRef } from "react";

function GetLocation() {
	const latitude = useRef(0);
	const longitude = useRef(0);

	navigator.geolocation.getCurrentPosition(
		(position) => {
			latitude.current = position.coords.latitude;
			longitude.current = position.coords.longitude;

			// Do something with the latitude and longitude values
		},
		(error) => {
			console.error(error);
		}
	);

	return { latitude: latitude.current, longitude: longitude.current };
}

export default GetLocation;
