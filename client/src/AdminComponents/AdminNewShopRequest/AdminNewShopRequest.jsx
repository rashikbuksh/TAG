import React, { useEffect, useState } from "react";
import SearchFunction from "../SearchFunction/Index";
import { api } from "../../lib/api";
import ShopkeeperTable from "../TagShopkeeper/ShopkeeperTable";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MapDistanceModal from "../../components/Modal/LocationModal/MapDistanceModal";

const AdminNewShopRequest = () => {
	const [tagRequestedShopKeepers, setTagRequestedShopKeepers] = useState([]);
	const [
		filteredTagRequestedShopKeepers,
		setFilteredTagRequestedShopKeepers,
	] = useState([]);
	const [mapModal, setMapModal] = useState(false);
	const [latLong, setLatLong] = useState({ lat: 0, lng: 0 });
	useEffect(() => {
		api.get(`/auth/getNewShopInfo`)
			.then((response) => {
				setTagRequestedShopKeepers(response.data);
			})
			.catch((error) => {
				toast.error(error);
			});
	}, []);

	const handelAcceptShopper = (id) => {
		// Use SweetAlert for confirmation
		Swal.fire({
			title: "Are you sure?",
			text: "You are about to accept this shopper!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, accept it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				// User confirmed, proceed with the API call
				api.post(`/auth/confirmShopper`, {
					access: "shopper",
					id: id,
				})
					.then((response) => {
						console.log(response.status);
						// Display success message
						if (response.status === 200) {
							Swal.fire(
								"Accepted!",
								"The shopper has been accepted.",
								"success"
							);
							setTagRequestedShopKeepers((prevShopkeepers) => {
								return prevShopkeepers.filter(
									(shopkeeper) => shopkeeper.id !== id
								);
							});
						}
					})
					.catch((error) => {
						console.log(error);
						// Display error message
						Swal.fire(
							"Error!",
							"There was an error accepting the shopper.",
							"error"
						);
					});
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// User canceled, show a message
				Swal.fire(
					"Cancelled",
					"The action has been cancelled.",
					"info"
				);
			}
		});
	};
	const handelDeleteNewShopper = (id) => {
		// Use SweetAlert for confirmation
		Swal.fire({
			title: "Are you sure?",
			text: "You are about to delete this new shopper!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				// User confirmed, proceed with the API call
				api.delete(`/auth/newShopper/${id}`)
					.then((res) => {
						if (res.data.status === 200) {
							Swal.fire(
								"Deleted!",
								"New Shopper has been deleted successfully.",
								"success"
							);
							// You may also want to update your UI to remove the deleted product from the list
							// Assuming you have a function to remove the product from the list, you can call it here.
							window.location.reload();
						} else {
							toast.error(
								"Failed to delete the New Shopper. Please try again."
							);
						}
					})
					.catch((error) => {
						console.error("Error deleting New Shopper:", error);
						toast.error(
							"An error occurred while deleting the New Shopper. Please try again."
						);
					});
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// User canceled, show a message
				Swal.fire(
					"Cancelled",
					"The action has been cancelled.",
					"info"
				);
			}
		});
	};
	const MapModalOpener = (location) => {
		let positionFromDb = location.split("__");
		setLatLong({
			lat: positionFromDb[0],
			lng: positionFromDb[1],
		});
		setMapModal(true);
	};
	return (
		<>
			<p className="px-10 py-3 text-3xl font-bold">All Shopkeeper</p>
			<SearchFunction
				arr={tagRequestedShopKeepers}
				setFilteredArr={setFilteredTagRequestedShopKeepers}
			></SearchFunction>
			<div className="  mx-12 h-[70vh] overflow-x-auto rounded-md ">
				<div className="z-0 overflow-x-auto">
					<table className=" table-responsive table rounded-md">
						{/* head */}
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								{/* <th>Short Decription</th> */}
								{/* <th>Full Description</th> */}
								<th>Phone</th>
								<th>Email</th>
								<td>User Type</td>
								<td>Location</td>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{tagRequestedShopKeepers &&
								filteredTagRequestedShopKeepers.map(
									(tagRequestedShopKeeper) => (
										<tr key={tagRequestedShopKeeper.id}>
											<td>{tagRequestedShopKeeper.id}</td>
											<td>
												{tagRequestedShopKeeper.name}
												<br />
												<span className="badge badge-ghost badge-sm">
													{
														tagRequestedShopKeeper.user_name
													}
												</span>
											</td>
											<td>
												{tagRequestedShopKeeper.phone
													? tagRequestedShopKeeper.phone
													: "N/A"}
											</td>

											<td>
												{tagRequestedShopKeeper.email
													? tagRequestedShopKeeper.email
													: "N/A"}
											</td>
											<td>
												{tagRequestedShopKeeper.access
													? tagRequestedShopKeeper.access
													: "N/A"}
											</td>
											<td>
												<button
													className=" font-xl h-[40px] w-[100px] rounded bg-[#469CD6] text-white"
													onClick={() =>
														MapModalOpener(
															tagRequestedShopKeeper.shipping_address
														)
													}
												>
													Location
												</button>
												<MapDistanceModal
													isOpen={mapModal}
													setIsOpen={setMapModal}
													popup={tagRequestedShopKeeper.name}
													latlong={latLong}
												/>
											</td>
											<td>
												<button
													onClick={() =>
														handelAcceptShopper(
															tagRequestedShopKeeper.id
														)
													}
													className="btn btn-success btn-sm mr-3"
												>
													Accept Shopper
												</button>
												<button
													onClick={() =>
														handelDeleteNewShopper(
															tagRequestedShopKeeper.id
														)
													}
													className="btn btn-error btn-sm mr-3"
												>
													Delete
												</button>
											</td>
										</tr>
									)
								)}
						</tbody>
						{/* foot */}
					</table>
				</div>
			</div>
		</>
	);
};

export default AdminNewShopRequest;
