import { useEffect, useState } from "react";

function GetLocation() {
	const [location, setLocation] = useState({ lat: 0, lng: 0 });
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
					lat: position.coords.latitude,
					lng: position.coords.longitude,
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
