import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ErrorMessage, Preloader } from "../../components";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";

const Profile = () => {
	const { data, isLoading, errorMessage } = useFetch("profile.json");

	const id = localStorage.getItem("user-id");

	const [userdata, setUserdata] = useState({});

	//get user data
	useEffect(() => {
		api.get(`/profile/get_profile/${id}`).then((response) => {
			// console.log(response.data);
			setUserdata(response.data[0]);
		});
		// console.log(userdata);
	}, []);

	if (isLoading) return <Preloader />;
	if (errorMessage) return <ErrorMessage errorMessage={errorMessage} />;

	return (
		<div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
			{/* profile header */}
			<div className="profile-header-area space-pt--30 space-mb--40">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="profile-header">
								<div className="profile-header__image">
									<img
										src={
											import.meta.env
												.VITE_API_PUBLIC_URL +
											data.image
										}
										className="img-fluid"
										alt=""
									/>
								</div>
								<div className="profile-header__content space-mt--10">
									<h3 className="name space-mb--15">
										{userdata.name}
									</h3>
									<div className="profile-info space-mb--10">
										<div className="profile-info-block">
											<div className="profile-info-block__value">
												{data.id}
											</div>
											<div className="profile-info-block__title">
												ID Number
											</div>
										</div>
										<div className="profile-info-block">
											<div className="profile-info-block__value">
												{`${data.points.number} (${data.points.currencySymbol}${data.points.moneyValue})`}
											</div>
											<div className="profile-info-block__title">
												Points
											</div>
										</div>
									</div>
									<div className="profile-level">
										<div className="profile-level__title">
											{`Level ${data.level.number}`}{" "}
										</div>
										<div className="profile-level__progress progress">
											<div
												className="progress-bar"
												role="progressbar"
												style={{
													width: `${data.level.percent}%`,
												}}
												aria-valuenow={
													data.level.percent
												}
												aria-valuemin={0}
												aria-valuemax={100}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* profile body */}
			<div className="profile-body-area">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="profile-body">
								<div className="profile-info-table space-mb--40">
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Full Name
										</div>
										<div className="profile-info-block__value">
											{userdata.name}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											User Name
										</div>
										<div className="profile-info-block__value">
											{userdata.user_name}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Phone
										</div>
										<div className="profile-info-block__value">
											{userdata.phone}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											E-mail Address
										</div>
										<div className="profile-info-block__value">
											{userdata.email}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Shipping Address
										</div>
										<div className="profile-info-block__value">
											{userdata.shipping_address}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Total Order
										</div>
										<div className="profile-info-block__value">
											{userdata.total_order}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Edit Profile
										</div>
										<div className="profile-info-block__value">
											<Link
												to={
													import.meta.env
														.VITE_API_PUBLIC_URL +
													"/edit-profile"
												}
											>
												<ReactSVG
													src={
														import.meta.env
															.VITE_API_PUBLIC_URL +
														"/assets/img/icons/edit.svg"
													}
												/>
											</Link>
										</div>
									</div>
								</div>
								<div className="profile-info-table">
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Help Center
										</div>
										<div className="profile-info-block__value">
											62256
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											To be Shipped
										</div>
										<div className="profile-info-block__value">
											{userdata.to_be_shipped}
										</div>
									</div>
									<div className="profile-info-block">
										<div className="profile-info-block__title">
											Reviews Given
										</div>
										<div className="profile-info-block__value">
											{userdata.review_count}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
