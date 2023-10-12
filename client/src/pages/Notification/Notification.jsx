import Axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Breadcrumb, ErrorMessage, Preloader } from "../../components";
import useFetch from "../../hooks/use-fetch";
import { api } from "../../lib/api";

const Notification = () => {
	const [notification, setNotification] = useState([]);
	const [user, setUser] = useState(null);
	const [userAccess, setUserAccess] = useState(null);

	const userid = localStorage.getItem("user-id");

	useEffect(() => {
		api.get(`/auth/getUserInfo/${userid}`).then((res) => {
			setUser(res.data);
			setUserAccess(res.data.access);
			console.log(res.data);
		});
		api.get(`/notification/getnotification/${userid}/${userid}`).then(
			(res) => {
				setNotification(res.data);
				console.log(res.data);
			}
		);
	}, []);

	return (
		<div className="body-wrapper space-pt--70 space-pb--120">
			<Breadcrumb pageTitle="Notification" prevUrl="/home" />
			<div className="notification-wrapper">
				{notification?.map((single) => (
					<div
						className={clsx(
							"notification-item",
							single.unread && "notification-item--unread"
						)}
						key={single.id}
					>
						<Link
							to={import.meta.env.VITE_API_PUBLIC_URL + `/order`}
						>
							<div
								dangerouslySetInnerHTML={{
									__html: single.notification_content,
								}}
							/>
						</Link>
						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							{single.notification_time}
						</div>
					</div>
				))}
				{notification.length === 0 && (
					<div className="notification-item">
						<div className="notification-item__time">
							{" "}
							<span>
								<FaBell></FaBell>
							</span>{" "}
							No Notification
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Notification;
