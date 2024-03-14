import { useEffect, useState } from "react";

function GetLocation() {
	const [location, setLocation] = useState({ lng: 0, lat: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser");
			setLoading(false);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					lng: position.coords.longitude,
					lat: position.coords.latitude,
				});
				setLoading(false);
			},
			(error) => {
				setError(error.message);
				setLoading(false);
			}
		);
	}, []);

	return { location, loading, error };
}

export default GetLocation;
