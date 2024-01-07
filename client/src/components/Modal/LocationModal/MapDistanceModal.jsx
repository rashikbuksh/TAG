import { Icon } from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import GetLocation from "../../../helpers/GetLocation";
import Modal from "../Modal";
import RoutingMachine from "./RoutingMachine";

const MapDistanceModal = ({ isOpen, setIsOpen, latlong, popup }) => {
	// user Location
	const currentLocation = GetLocation();

	setTimeout(function () {
		window.dispatchEvent(new Event("resize"));
	}, 1);
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} showCross={false}>
			<MapContainer
				center={[latlong.latitude, latlong.longitude]}
				zoom={15}
				style={{ height: "70vh", width: "70vh" }}
			>
				<TileLayer
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<RoutingMachine
					userLocation={[latlong.latitude, latlong.longitude]}
					shopperLocation={[
						currentLocation.latitude,
						currentLocation.longitude,
					]}
				/>
				{/* <Marker position={[latlong.latitude, latlong.longitude]}>
					<Popup>{popup}</Popup>
				</Marker>
				<Marker
					position={[
						currentLocation.latitude,
						currentLocation.longitude,
					]}
				>
					<Popup>I am Here</Popup>
				</Marker> */}
			</MapContainer>
		</Modal>
	);
};

export default MapDistanceModal;
